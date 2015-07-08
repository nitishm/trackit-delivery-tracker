# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('deliveries', '0002_auto_20150610_0335'),
    ]

    operations = [
        migrations.AddField(
            model_name='delivery',
            name='locked',
            field=models.BooleanField(default=False),
        ),
    ]
