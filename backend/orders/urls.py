from django.urls import path
from .views import  OrderStatusViewSet,OrderViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'order-status', OrderStatusViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = router.urls