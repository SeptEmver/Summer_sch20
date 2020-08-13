# Generated by Django 3.1 on 2020-08-13 17:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Map',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count_level', models.IntegerField(auto_created=1)),
                ('map_name', models.CharField(max_length=40, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Account',
            fields=[
                ('user',
                 models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False,
                                      to='swiftventure.user')),
                ('email', models.EmailField(max_length=30, unique=True)),
                ('password', models.CharField(max_length=20)),
                ('regis_date', models.DateTimeField(auto_now_add=True)),
                ('rating', models.IntegerField(auto_created=0)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=700)),
                ('post_date', models.DateTimeField(auto_now_add=True)),
                ('map', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='swiftventure.map')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='swiftventure.user')),
            ],
        ),
        migrations.AddField(
            model_name='map',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='swiftventure.user'),
        ),
        migrations.CreateModel(
            name='m_Symbol',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.IntegerField(default=0)),
                ('trigger', models.BooleanField(default=False)),
                ('symbol', models.CharField(default='.', max_length=3)),
                ('color', models.CharField(default='.', max_length=10)),
                ('description', models.CharField(default='', max_length=300)),
                ('map', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='swiftventure.map')),
            ],
        ),
        migrations.CreateModel(
            name='m_Player',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player_name', models.CharField(max_length=20)),
                ('description', models.CharField(max_length=700)),
                ('map', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='swiftventure.user')),
            ],
        ),
        migrations.CreateModel(
            name='m_Level',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.IntegerField(default=1)),
                ('width', models.IntegerField(default=4)),
                ('height', models.IntegerField(default=4)),
                ('matrix', models.SlugField(default='', max_length=2000)),
                ('map', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='swiftventure.map')),
            ],
        ),
    ]
