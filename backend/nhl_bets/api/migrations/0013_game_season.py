# Generated by Django 4.0.6 on 2023-01-08 03:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_remove_bet_result'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='season',
            field=models.CharField(default=20222023, max_length=50),
            preserve_default=False,
        ),
    ]
