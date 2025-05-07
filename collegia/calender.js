document.addEventListener('DOMContentLoaded', function () {
    const calendarDays = document.getElementById('calendarDays');

    // Generate Calendar Dates
    function generateCalendar() {
        calendarDays.innerHTML = '';
        const totalDays = 28;
        const events = {
            2: 'holiday',
            6: 'exam',
            10: 'event',
            15: 'other-event',
            20: 'exam',
            25: 'holiday'
        };
        for (let i = 1; i <= totalDays; i++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = i;
            if (events[i]) {
                dayElement.classList.add(events[i]);
            }
            dayElement.addEventListener('click', () => showDetails(i));
            calendarDays.appendChild(dayElement);
        }
    }

    // Show Event Details
    function showDetails(day) {
        const details = {
            2: 'Public Holiday - Independence Day',
            6: 'Mathematics Exam',
            10: 'Cultural Fest',
            15: 'Science Seminar',
            20: 'Final Exam',
            25: 'Christmas Holiday'
        };
        alert(details[day] || 'No special event on this day.');
    }

    // Add Hover Effect
    calendarDays.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'DIV') {
            e.target.style.transform = 'scale(1.1)';
        }
    });

    calendarDays.addEventListener('mouseout', (e) => {
        if (e.target.tagName === 'DIV') {
            e.target.style.transform = 'scale(1)';
        }
    });

    // Search for Specific Date Event
    function searchEvent(date) {
        showDetails(date);
    }

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key >= 1 && e.key <= 28) {
            showDetails(parseInt(e.key));
        }
    });

    // Initialize Calendar
    generateCalendar();
});
