# -*- coding: utf-8 -*-
from django.contrib.auth.models import AbstractUser
from django.db import models
# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='category_images/', null=True, blank=True)

    def __str__(self):
        return self.name
    

class Caftan(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="products/")
    stock = models.PositiveIntegerField(default=0)
    is_available = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    views = models.PositiveIntegerField(default=0) 
    likes = models.PositiveIntegerField(default=0)
    ratings = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name
    @property
    def available(self):
        return self.is_available and self.stock > 0

    def save(self, *args, **kwargs):
        # Automatically update is_available based on stock
        if self.stock == 0:
            self.is_available = False
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Caftan"
        verbose_name_plural = "Caftans"
        ordering = ["-created_at"]


class CaftanImage(models.Model):
    caftan = models.ForeignKey("Caftan", on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="products/multi/")
    alt_text = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"Image for {self.caftan.name}"
    




