from django.conf.urls import patterns, include, url
from rest_framework_nested import routers
from authentication.views import AccountViewSet, LoginView, LogoutView
from trakt.views import IndexView

from deliveries.views import AccountDeliveriesViewSet, DeliveryViewSet

from django.contrib import admin
admin.autodiscover()

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)

router.register(r'deliveries', DeliveryViewSet)

accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)
accounts_router.register(r'deliveries', AccountDeliveriesViewSet)

urlpatterns = patterns(
     '',
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url('^.*$', IndexView.as_view(), name='index'),
)