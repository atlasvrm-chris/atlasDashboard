import json
from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.views.generic import TemplateView

from hyper.utils.general import make_chuncks_of_number_of_elements, list_of_dict_to_list_to_obj, GenericObject

from hyper.ecommerce.data.store import (
    productsDict,
    productDetailsDict,
    outletsDict,
    ordersDict,
    orderDict,
    customersDict,
    shoppingCartDict,
    shoppingCartProductsDict,
    checkoutHomeAddressDict,
    checkoutOfficeAddressDict,
    checkoutOrderSummaryDict,
    checkoutOredrsDict,
    checkoutShippingMethodsDict,
    sellersDict

)
# from hyper.ecommerce.data.charts_data import (
    
# )
User = get_user_model()

class ProductsView(LoginRequiredMixin, TemplateView):
    template_name = "apps/ecommerce/products.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["products"] = list_of_dict_to_list_to_obj(productsDict)
        return context

products_view = ProductsView.as_view()

class ProductsDetailsView(LoginRequiredMixin, TemplateView):
    template_name = "apps/ecommerce/products-details.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["product"] = GenericObject(productDetailsDict)
        context["outlets"] = list_of_dict_to_list_to_obj(outletsDict)
        return context

products_details_view = ProductsDetailsView.as_view()

class OrdersView(LoginRequiredMixin, TemplateView):
    template_name = "apps/ecommerce/orders.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["orders"] = list_of_dict_to_list_to_obj(ordersDict)
        return context

orders_view = OrdersView.as_view()

class OrdersDetailsView(LoginRequiredMixin, TemplateView):
    template_name = "apps/ecommerce/order-details.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["order"] = GenericObject(orderDict)
        return context

order_details_view = OrdersDetailsView.as_view()

class CustomersView(LoginRequiredMixin, TemplateView):
    template_name = "apps/ecommerce/customers.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["customers"] = list_of_dict_to_list_to_obj(customersDict)
        return context

customers_view = CustomersView.as_view()

class ShoppingCartView(LoginRequiredMixin, TemplateView):
    template_name = "apps/ecommerce/shopping-cart.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["shopping_cart"] = GenericObject(shoppingCartDict)
        context["products"] = list_of_dict_to_list_to_obj(shoppingCartProductsDict)
        return context

shopping_cart_view = ShoppingCartView.as_view()

class CheckoutView(LoginRequiredMixin, TemplateView):
    template_name = "apps/ecommerce/checkout.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["checkout_home_address"] = GenericObject(checkoutHomeAddressDict)
        context["checkout_office_address"] = GenericObject(checkoutOfficeAddressDict)
        context["checkout_order_summary"] = GenericObject(checkoutOrderSummaryDict)
        context["checkout_oredrs"] = list_of_dict_to_list_to_obj(checkoutOredrsDict)
        context ["checkout_shipping_methods"] = GenericObject(checkoutShippingMethodsDict)
        return context

checkout_view = CheckoutView.as_view()

class SellersView(LoginRequiredMixin, TemplateView):
    template_name = "apps/ecommerce/sellers.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["sellers"] = list_of_dict_to_list_to_obj(sellersDict)
        return context

sellers_view = SellersView.as_view()
