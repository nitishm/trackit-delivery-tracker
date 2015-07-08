# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('deliveries', '0003_delivery_locked'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='delivery',
            name='locked',
        ),
    ]
