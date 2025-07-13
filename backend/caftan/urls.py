from rest_framework.routers import DefaultRouter
from .views import CaftanViewSet, CaftanImageViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r"caftans", CaftanViewSet, basename="caftan")
router.register(r"caftan-images", CaftanImageViewSet, basename="caftanimage")
router.register(r"categories", CategoryViewSet, basename="category")

urlpatterns = router.urls