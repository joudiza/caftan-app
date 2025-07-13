# products/serializers.py

from rest_framework import serializers
from .models import Caftan, CaftanImage, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class CaftanImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaftanImage
        fields = '__all__'

class CaftanSerializer(serializers.ModelSerializer):
    images = CaftanImageSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)
    def update(self, instance, validated_data):
        image = validated_data.pop('image', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if image:
            instance.image = image
        instance.save()
        return instance
    class Meta:
        model = Caftan
        fields = '__all__' 


