# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('deliveries', '0004_remove_delivery_locked'),
    ]

    operations = [
        migrations.AlterField(
            model_name='delivery',
            name='author',
            field=models.ForeignKey(related_name='authors', to=settings.AUTH_USER_MODEL),
        ),
    ]
