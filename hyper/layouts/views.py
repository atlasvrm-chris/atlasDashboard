from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic.base import TemplateView


class LayoutsView(LoginRequiredMixin, TemplateView):
    pass


layouts_vertical_view = LayoutsView.as_view(template_name="layouts/vertical.html")
layouts_horizontal_view = LayoutsView.as_view(template_name="layouts/horizontal.html")
layouts_detached_view = LayoutsView.as_view(template_name="layouts/detached.html")
layouts_full_view = LayoutsView.as_view(template_name="layouts/full.html")
layouts_fullscreen_view = LayoutsView.as_view(template_name="layouts/fullscreen.html")
layouts_hover_view = LayoutsView.as_view(template_name="layouts/hover.html")
layouts_compact_view = LayoutsView.as_view(template_name="layouts/compact.html")
layouts_icon_view = LayoutsView.as_view(template_name="layouts/icon-view.html")
