from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView

# Create your views here.


class IconsView(LoginRequiredMixin, TemplateView):
    pass
icons_remix_view = IconsView.as_view(template_name="icons/remix.html")
icons_material_view = IconsView.as_view(template_name="icons/mdi.html")
icons_unicons_view = IconsView.as_view(template_name="icons/unicons.html")
