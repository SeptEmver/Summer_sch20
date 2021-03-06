from django.db import models

class User(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name

class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    email = models.EmailField(max_length=30, unique=True)
    password = models.CharField(max_length=20)
    regis_date = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(auto_created=0)

    def __str__(self):
        return self.user.name

class Map(models.Model):
    id = models.IntegerField(default=0, primary_key=True, )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    map_name = models.CharField(max_length=40)  # unique=True
    count_level = models.IntegerField(default=1)

    def __str__(self):
        return self.map_name

class Post(models.Model):
    map = models.OneToOneField(Map, on_delete=models.CASCADE)
    description = models.CharField(max_length=700)
    rating = models.FloatField(default=0.)
    number_of_rate = models.IntegerField(default=0)
    post_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.map.map_name

class m_Player(models.Model):
    map = models.ForeignKey(User, on_delete=models.CASCADE)
    player_name = models.CharField(max_length=20)
    description = models.CharField(max_length=700)


class m_Level(models.Model):
    map = models.ForeignKey(Map, on_delete=models.CASCADE)
    level = models.IntegerField(default=1)
    width = models.IntegerField(default=4)
    height = models.IntegerField(default=4)
    matrix = models.SlugField(max_length=2000, default="")


class m_Symbol(models.Model):
    level = models.ForeignKey(m_Level, on_delete=models.CASCADE)
    type = models.IntegerField(default=0)
    trigger = models.BooleanField(default=False)
    symbol = models.CharField(max_length=3, default=".")
    color = models.CharField(max_length=10, default=".")
    description = models.CharField(max_length=200, default="")


class Data(models.Model):
    id = models.IntegerField(default=0, primary_key=True)
    maps_count = models.IntegerField(default=0)
