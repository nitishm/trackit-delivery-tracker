from rest_framework import serializers

from authentication.serializers import AccountSerializer
from deliveries.models import Delivery

#TEST LIST FOR STREAM STATUS 
locked = ["KIRK","SPOCK","HOMER"]

class DeliverySerializer(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True, required=False)
    locked = serializers.SerializerMethodField()

    class Meta:
        model = Delivery

        fields = ('id', 'author', 'stream_name', 'activity_name',
                'view_name', 'jira_url', 'codereview_url','description','notes', 
                'status','created_at', 'updated_at', 'locked')
        read_only_fields = ('id', 'created_at', 'updated_at')
        
    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(AccountSerializer, self).get_validation_exclusions()

        return exclusions + ['author']

    def get_locked(self, obj):
        return obj.stream_name in locked
