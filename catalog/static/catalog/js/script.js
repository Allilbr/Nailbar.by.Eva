document.addEventListener('DOMContentLoaded', () => {

    const burgerBtn = document.getElementById('burgerBtn');
    const navMenu = document.getElementById('navMenu');

    if (burgerBtn && navMenu) {
        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const moreWorksDiv = document.getElementById('moreWorks');

    if (loadMoreBtn && moreWorksDiv) {
        loadMoreBtn.addEventListener('click', () => {
            moreWorksDiv.classList.toggle('show');

            if (moreWorksDiv.classList.contains('show')) {
                loadMoreBtn.textContent = 'СКРЫТЬ';
            } else {
                loadMoreBtn.textContent = 'ПОКАЗАТЬ БОЛЬШЕ';
            }
        });
    }

    const priceChecks = document.querySelectorAll('.price-check');
    const lengthSelects = document.querySelectorAll('.length-select');
    const totalPriceElement = document.getElementById('totalPrice');

    function calculateTotal() {
        let total = 0;

 
        priceChecks.forEach(check => {
            if (check.checked) {
                total += parseInt(check.dataset.price);
            }
        });

       
        lengthSelects.forEach(select => {
            total += parseInt(select.value);
        });

       
        if (totalPriceElement) {
            totalPriceElement.textContent = total.toLocaleString('ru-RU') + ' ₸';
        }
    }

    priceChecks.forEach(check => {
        check.addEventListener('change', calculateTotal);
    });

    lengthSelects.forEach(select => {
        select.addEventListener('change', calculateTotal);
    });

}); 

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('faqModal');
    const closeBtn = document.getElementById('closeFaqBtn');
    const modalQ = document.getElementById('modalQuestion');
    const modalA = document.getElementById('modalAnswer');


    document.querySelectorAll('.faq-btn').forEach(button => {
        button.addEventListener('click', () => {
            const question = button.getAttribute('data-question');
            const answer = button.getAttribute('data-answer');

            modalQ.textContent = question;
            modalA.textContent = answer;

            modal.style.display = 'flex';
        });
    });


    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });


    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

const tgBtn = document.getElementById('tgBtn');
const tgModal = document.getElementById('tgModal');
const closeTgBtn = document.getElementById('closeTgBtn');

if (tgBtn && tgModal) {
    tgBtn.addEventListener('click', () => {
        tgModal.style.display = 'flex';
    });

    closeTgBtn.addEventListener('click', () => {
        tgModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === tgModal) {
            tgModal.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const bookingDate = document.getElementById('bookingDate');
    const timeStep = document.getElementById('timeStep');
    const timeSlotsGrid = document.getElementById('timeSlotsGrid');
    const clientStep = document.getElementById('clientStep');
    const bookingForm = document.getElementById('bookingForm');

    
    const availableTimes = ["10:00", "12:30", "15:00", "17:30", "20:00"];
    let selectedTime = null;

 
    if (bookingDate) {
        const today = new Date().toISOString().split('T')[0];
        bookingDate.setAttribute('min', today);

        
        bookingDate.addEventListener('change', (e) => {
            const dateStr = e.target.value;
            timeSlotsGrid.innerHTML = '';
            selectedTime = null;
            clientStep.style.display = 'none';

            
            const takenTimes = occupiedSlots[dateStr] || [];

            availableTimes.forEach(time => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'time-slot-btn';
                btn.textContent = time;

                if (takenTimes.includes(time)) {
                    btn.classList.add('disabled');
                    btn.title = 'Время занято';
                } else {
                    btn.addEventListener('click', () => {
                        document.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
                        btn.classList.add('selected');
                        selectedTime = time;
                        clientStep.style.display = 'block'; 
                    });
                }
                timeSlotsGrid.appendChild(btn);
            });

            timeStep.style.display = 'block';
        });
    }

    // Отправка формы записи
    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const date = bookingDate.value;
            const name = document.getElementById('clientName').value;
            const phone = document.getElementById('clientPhone').value;

            if (!selectedTime) {
                alert('Пожалуйста, выберите время!');
                return;
            }

            
            const response = await fetch('/api/booking/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken') 
                },
                body: JSON.stringify({ date, time: selectedTime, name, phone })
            });

            const result = await response.json();

            if (result.status === 'success') {
                alert('🎉 ' + result.message + '\nМастер свяжется с вами для подтверждения!');
                location.reload(); 
            } else {
                alert('⚠️ ' + result.message);
            }
        });
    }


    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});