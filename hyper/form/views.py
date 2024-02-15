# from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView

# Create your views here.



class FormView( TemplateView):
    pass

form_elements_view = FormView.as_view(template_name="forms/elements.html")
form_advanced_view = FormView.as_view(template_name="forms/advanced.html")
form_validation_view = FormView.as_view(template_name="forms/validation.html")
form_wizard_view = FormView.as_view(template_name="forms/wizard.html")
form_fileuploads_view = FormView.as_view(template_name="forms/fileuploads.html")
form_editors_view = FormView.as_view(template_name="forms/editors.html")

