import json
from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView

from hyper.crm.data.store import (
    
    statisticsCRMDict,
    revenueStatCRMDist,
    topPerformingDict,
    recentLeadsDict,
    projectSummary,
    projectDescription,
    projectOverview,
    dailyTask,
    teamMembers,
    ordersList,
    clientsList,
    clients,
    monthlyProgress
)

from hyper.crm.data.charts_data import (
    campaignSentchartDict,
    dealschartDict,
    bookRevenuechartDict,
    dashCampaignsChartDict,
    revenueCRMDict,
    monthlyTarget,
    projectStatistics,
    projectOverviewChart,
    revenueStatistics 

)

User = get_user_model()

class CRMProjectsView(LoginRequiredMixin, TemplateView):
    template_name = "apps/crm/projects.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["project_summary"] = projectSummary
        context["project_description"] = projectDescription
        context["project_overview"] = projectOverview
        context["daily_task"] = dailyTask
        context["team_members"] = teamMembers

        # chart data 
        context["monthly_target"] = json.dumps(monthlyTarget)
        context["project_statistics"] = json.dumps(projectStatistics)
        context["project_overview_chart"] = json.dumps(projectOverviewChart)

        return context

crm_projects_view = CRMProjectsView.as_view()

class CRMOrdersListView(LoginRequiredMixin, TemplateView):
    template_name = "apps/crm/orders-list.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["order_list"] = ordersList
        return context

crm_orders_list_view = CRMOrdersListView.as_view()

class CRMClientsView(LoginRequiredMixin, TemplateView):
    template_name = "apps/crm/clients.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["client_list"] = clientsList
        return context

crm_clients_view = CRMClientsView.as_view()

class CRMManagementView(LoginRequiredMixin, TemplateView):
    template_name = "apps/crm/management.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["clients"] = clients
        context["monthly_progress"] = monthlyProgress
        context["revenue_statistics"] = json.dumps(revenueStatistics)
        return context

crm_management_view = CRMManagementView.as_view()

