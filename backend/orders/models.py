from django.db import models
from caftan.models import Caftan
from django.utils.translation import gettext_lazy as _


class OrderStatus(models.Model):
    name = models.CharField(_("Status name"), max_length=50)  # Ex: Confirmed, Processing, Delivered

    def __str__(self):
        return self.name
    

class Order(models.Model):
    customer_name = models.CharField(_("Customer name"), max_length=255)
    customer_email = models.EmailField(_("Customer email"))
    customer_phone = models.CharField(_("Customer phone"), max_length=20, blank=True, null=True)
    shipping_address = models.TextField(_("Shipping address"))
    created_at = models.DateTimeField(_("Created at"), auto_now_add=True)
    status = models.ForeignKey(OrderStatus, on_delete=models.SET_NULL, null=True, verbose_name=_("Order status"))
    total_price = models.DecimalField(_("Total price"), max_digits=10, decimal_places=2)
    tracking_code = models.CharField(_("Tracking code"), max_length=100, unique=True, blank=True)

    def __str__(self):
        return f"Order #{self.id} - {self.customer_email}"
    

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE, verbose_name=_("Order"))
    caftan = models.ForeignKey(Caftan, on_delete=models.SET_NULL, null=True, verbose_name=_("Caftan"))
    quantity = models.PositiveIntegerField(_("Quantity"), default=1)
    price = models.DecimalField(_("Price"), max_digits=10, decimal_places=2)  # price at moment of order
    def __str__(self):
        return f"{self.quantity} x {self.caftan.name if self.caftan else _('Deleted Caftan')}"
