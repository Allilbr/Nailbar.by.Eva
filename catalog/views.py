from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Work, Service, Booking
import json

def home_page(request):
    works = Work.objects.all()
    services = Service.objects.all()
    
    bookings = Booking.objects.all()
    

    occupied_slots = {}
    for b in bookings:
        d_str = b.date.strftime('%Y-%m-%d')
        if d_str not in occupied_slots:
            occupied_slots[d_str] = []
        occupied_slots[d_str].append(b.time_slot)

    return render(request, 'catalog/index.html', {
        'works': works,
        'services': services,
        'occupied_slots_json': json.dumps(occupied_slots) 
    })

def create_booking(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        date = data.get('date')
        time_slot = data.get('time')
        name = data.get('name')
        phone = data.get('phone')

        if Booking.objects.filter(date=date, time_slot=time_slot).exists():
            return JsonResponse({'status': 'error', 'message': 'Извините, это время только что заняли!'})

        Booking.objects.create(name=name, phone=phone, date=date, time_slot=time_slot)
        return JsonResponse({'status': 'success', 'message': 'Вы успешно записаны!'})

    return JsonResponse({'status': 'error', 'message': 'Неверный запрос'})

    from django.shortcuts import render, redirect
from .models import Work, Service, Booking, Review
import json

def home_page(request):
    works = Work.objects.all()
    services = Service.objects.all()
    reviews = Review.objects.all().order_by('-created_at') # Новые отзывы вверху
    
    bookings = Booking.objects.all()
    occupied_slots = {}
    for b in bookings:
        d_str = b.date.strftime('%Y-%m-%d')
        if d_str not in occupied_slots:
            occupied_slots[d_str] = []
        occupied_slots[d_str].append(b.time_slot)

    return render(request, 'catalog/index.html', {
        'works': works,
        'services': services,
        'reviews': reviews,
        'occupied_slots_json': json.dumps(occupied_slots)
    })

def add_review(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        text = request.POST.get('text')
        rating = request.POST.get('rating', 5)
        photo = request.FILES.get('photo') 

        if name and text:
            Review.objects.create(
                name=name,
                text=text,
                rating=rating,
                photo=photo
            )
    return redirect('home') 