# Generated by Django 4.0.6 on 2022-12-18 18:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_remove_bet_team_bet_pick_alter_bet_result'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='date',
            field=models.DateTimeField(),
        ),
    ]
