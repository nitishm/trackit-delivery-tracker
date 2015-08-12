from jirafields import JiraFields

import django_filters
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework import filters
from rest_framework.views import APIView

from deliveries.models import Delivery
from deliveries.permissions import IsAuthorOfDelivery
from deliveries.serializers import DeliverySerializer

class DeliveryFilter(django_filters.FilterSet):
    username = django_filters.CharFilter(name="author__username")
    class Meta:
        model = Delivery
        fields = ['status', 'stream_name', 'view_name', 'username']

class DeliveryViewSet(viewsets.ModelViewSet):
    #lookup_field = 'stream_name'
    queryset = Delivery.objects.order_by('-created_at')
    serializer_class = DeliverySerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = DeliveryFilter

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsAuthorOfDelivery(),)

    def perform_create(self, serializer):
        instance = serializer.save(author=self.request.user)

        return super(DeliveryViewSet, self).perform_create(serializer)

    def get_queryset(self):
        '''
        Add search filtering options here
        Try using Q objects here !!
        '''
        queryset = super(DeliveryViewSet,self).get_queryset()
        search = self.request.query_params.get('search', None)
        if search is not None:
            queryset = queryset.filter(stream_name__icontains=search)
        return queryset

class AccountDeliveriesViewSet(viewsets.ViewSet):
    queryset = Delivery.objects.select_related('author').all()
    serializer_class = DeliverySerializer

    def list(self, request, account_username=None):
        queryset = self.queryset.filter(author__username=account_username)
        '''
        Add filtering options here
        '''
        stream = self.request.query_params.get('search', None)
        if stream is not None:
            queryset = queryset.filter(stream_name__icontains=stream)
        serializer = self.serializer_class(queryset, many=True, context={'request': request})

        return Response(serializer.data)

#Use this as a template to get non-model objects
class jiraView(APIView):
    def get(self, request, *args, **kw): 
        jiraId = kw['jiraId']   
        jiraFieldsObj = JiraFields('/Users/nitish/trackit-delivery-tracker/customfields.xml',
                                   '/Users/nitish/trackit-delivery-tracker/defect.xml')
        defect = jiraFieldsObj.defectCleaned
        response = Response(defect) 
        return response
