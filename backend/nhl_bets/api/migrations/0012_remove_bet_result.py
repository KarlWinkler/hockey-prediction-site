# Generated by Django 4.0.6 on 2022-12-21 01:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_game_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bet',
            name='result',
        ),
    ]