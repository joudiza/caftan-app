from rest_framework import serializers
from .models import Order, OrderItem
from caftan.models import Caftan
#from caftan.serializers import CaftanSerializer
from .models import OrderStatus

class OrderItemSerializer(serializers.ModelSerializer):
    caftan = serializers.PrimaryKeyRelatedField(queryset=Caftan.objects.all())  # ✅ كتابة بالـ ID
    caftan_name = serializers.CharField(source='caftan.name', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['caftan', 'quantity', 'price', 'caftan_name']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    status = serializers.PrimaryKeyRelatedField(queryset=OrderStatus.objects.all())
    status_display = serializers.CharField(source='status.name', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'customer_name',
            'customer_email',
            'customer_phone',
            'shipping_address',
            'total_price',
            'tracking_code',
            'created_at',
            'status',           # ✅ لإرسال ID
            'status_display',   # ✅ لعرض الاسم
            'items'
        ]
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        status = validated_data.get('status')  # ✅ تأكد من وجود status

        order = Order.objects.create(**validated_data)  # هنا status ضمن validated_data
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order

class OrderStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderStatus
        fields = ['id', 'name']

    def create(self, validated_data):
        return OrderStatus.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance 