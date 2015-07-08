from django.db import models
from authentication.models import Account

# Create your models here.
class Delivery(models.Model):
    author = models.ForeignKey(Account, related_name='deliveries')

    stream_name = models.CharField(max_length=40, blank=False)
    view_name = models.CharField(max_length=40, blank=False)
    activity_name = models.CharField(max_length=40, blank=False)
    jira_url = models.URLField()
    codereview_url = models.URLField()
    description = models.TextField(null=False,blank=True)
    notes = models.TextField(null=False,blank=True)
    status = models.BooleanField(default=False, blank=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return '{0}'.format(self.activity_name)