from rest_framework import viewsets, status,permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from .models import Caftan, CaftanImage,Category
from .serializers import CaftanSerializer, CaftanImageSerializer, CategorySerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.parsers import MultiPartParser, FormParser

# Pagination class
class TenPerPagePagination(PageNumberPagination):
    page_size = 10

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]  # Admin only

class CaftanViewSet(viewsets.ModelViewSet):
    queryset = Caftan.objects.all().order_by("-created_at")
    serializer_class = CaftanSerializer
    lookup_field = "slug"
    def get_permissions(self):
        public_actions = ['list', 'retrieve', 'latest','like', 'popular', 'most_liked', 'most_viewed', 
                        'featured', 'search', 'categories', 'by_category', 'by_ids', 'by_slug']
        if self.action in public_actions:
            return [permissions.AllowAny()]
        elif self.action == 'view':
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()] 
    parser_classes = [MultiPartParser, FormParser] 
    def error_response(self, message, status_code):
        return Response({"error": message}, status=status_code)

    # ❤️ PATCH like
    
    @action(detail=True, methods=["patch"])
    def like(self, request, slug=None):
            caftan = self.get_object()
            key = f"liked_{caftan.id}"

            # التحقق واش سبق دار لايك
            if request.session.get(key, False):
                # ❌ سبق دار لايك → نحيدو
                caftan.likes = max(caftan.likes - 1, 0)
                request.session[key] = False
            else:
                # ✅ لايك جديد
                caftan.likes += 1
                request.session[key] = True

            caftan.save()
            return Response({"likes": caftan.likes})


    # 👁️ PATCH view
    @action(detail=True, methods=["patch"], permission_classes=[IsAuthenticated])
    def view(self, request, slug=None):
        caftan = self.get_object()
        caftan.views += 1
        caftan.save()
        return Response({"views": caftan.views}, status=status.HTTP_200_OK)

    # Most liked
    @action(detail=False, methods=["get"])
    def most_liked(self, request):
        caftans = Caftan.objects.all().order_by("-likes")[:10]
        serializer = self.get_serializer(caftans, many=True)
        return Response(serializer.data)

    # Most viewed
    @action(detail=False, methods=["get"])
    def most_viewed(self, request):
        caftans = Caftan.objects.all().order_by("-views")[:10]
        serializer = self.get_serializer(caftans, many=True)
        return Response(serializer.data)

    # Featured caftans
    @action(detail=False, methods=["get"])
    def featured(self, request):
        caftans = Caftan.objects.filter(is_featured=True).order_by("-created_at")
        serializer = self.get_serializer(caftans, many=True)
        return Response(serializer.data)

    # Most recent (with pagination)
    @action(detail=False, methods=["get"])
    def latest(self, request):
        queryset = Caftan.objects.all().order_by("-created_at")
        paginator = TenPerPagePagination()
        result_page = paginator.paginate_queryset(queryset, request)
        serializer = self.get_serializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    # Most popular (only likes & views, no ratings if not available)
    @action(detail=False, methods=["get"])
    def popular(self, request):
        caftans = Caftan.objects.all().order_by('-likes', '-views', '-ratings')[:10]
        serializer = self.get_serializer(caftans, many=True)
        return Response(serializer.data)

    # Search caftans by name
    @action(detail=False, methods=["get"])
    def search(self, request):
        query = request.query_params.get("q", "")
        if not query:
            return self.error_response("Query parameter 'q' is required.", status.HTTP_400_BAD_REQUEST)

        caftans = Caftan.objects.filter(name__icontains=query)
        serializer = self.get_serializer(caftans, many=True)
        return Response(serializer.data)

    # Get all categories
    @action(detail=False, methods=["get"])
    def categories(self, request):
        categories = Caftan.objects.values_list("category__name", flat=True).distinct()
        return Response({"categories": list(categories)})

    # Get caftans by category name
    @action(detail=False, methods=["get"])
    def by_category(self, request):
        category_name = request.query_params.get("category", "")
        if not category_name:
            return self.error_response("Query parameter 'category' is required.", status.HTTP_400_BAD_REQUEST)

        caftans = Caftan.objects.filter(category__name__iexact=category_name)
        if not caftans.exists():
            return self.error_response("No caftans found for the provided category.", status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(caftans, many=True)
        return Response(serializer.data)

    # Get caftans by IDs
    @action(detail=False, methods=["get"])
    def by_ids(self, request):
        caftan_ids = request.query_params.getlist("ids", [])
        if not caftan_ids:
            return self.error_response("Query parameter 'ids' is required.", status.HTTP_400_BAD_REQUEST)

        caftans = Caftan.objects.filter(id__in=caftan_ids)
        if not caftans.exists():
            return self.error_response("No caftans found for the provided IDs.", status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(caftans, many=True)
        return Response(serializer.data)

    # Get caftan by slug
    @action(detail=False, methods=["get"])
    def by_slug(self, request):
        slug = request.query_params.get("slug", "")
        if not slug:
            return self.error_response("Query parameter 'slug' is required.", status.HTTP_400_BAD_REQUEST)

        try:
            caftan = Caftan.objects.get(slug=slug)
        except Caftan.DoesNotExist:
            return self.error_response("Caftan not found.", status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(caftan)
        return Response(serializer.data)



class CaftanImageViewSet(viewsets.ModelViewSet):
    queryset = CaftanImage.objects.all().order_by("-id")
    serializer_class = CaftanImageSerializer
    permission_classes = [permissions.IsAuthenticated]  # Admin only
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["caftan"]  # Filter by caftan id

