// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Character Counter
function updateCharacterCount() {
    const textarea = document.getElementById('complaint');
    const charCount = document.getElementById('charCount');
    charCount.textContent = `Characters: ${textarea.value.length}/500`;

    if (textarea.value.length > 500) {
        charCount.style.color = 'red';
    } else {
        charCount.style.color = 'green';
    }
}

// Complaint Submission
function submitComplaint() {
    const complaintText = document.getElementById('complaint').value.trim();

    if (!complaintText) {
        alert('Please enter your complaint details before submitting.');
        return;
    }

    if (complaintText.length > 500) {
        alert('Your complaint exceeds the 500-character limit.');
        return;
    }

    alert('Your complaint has been successfully submitted.');
    document.getElementById('complaint').value = '';
    updateCharacterCount();
}

// Reset Complaint
function resetComplaint() {
    document.getElementById('complaint').value = '';
    updateCharacterCount();
}

// Digital Clock
function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    clock.textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();
