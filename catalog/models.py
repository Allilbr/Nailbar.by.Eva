from django.db import models

class Work(models.Model):
    title = models.CharField(max_length=100, verbose_name="Название")
    image = models.ImageField(upload_to='works/', verbose_name="Картинка")

    def __str__(self):
        return self.title


class Service(models.Model):
    name = models.CharField(max_length=150, verbose_name="Название услуги")
    price = models.IntegerField(verbose_name="Цена (₸)")

    def __str__(self):
        return f"{self.name} — {self.price} ₸"

class Booking(models.Model):
    name = models.CharField(max_length=100, verbose_name="Имя клиента")
    phone = models.CharField(max_length=20, verbose_name="Телефон")
    date = models.DateField(verbose_name="Дата записи")
    time_slot = models.CharField(max_length=10, verbose_name="Время (например 12:00)")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")

    def __str__(self):
        return f"{self.date} {self.time_slot} — {self.name} ({self.phone})"

class Review(models.Model):
    name = models.CharField(max_length=100, verbose_name="Имя клиента")
    text = models.TextField(verbose_name="Отзыв")
    rating = models.IntegerField(default=5, verbose_name="Оценка (1-5)")
    photo = models.ImageField(upload_to="reviews/", blank=True, null=True, verbose_name="Фото ногтей")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата публикации")

    def __str__(self):
        return f"{self.name} ({self.rating}★) — {self.created_at.strftime('%d.%m.%Y')}"