// JavaScript for Faculty Dashboard Interactions

document.addEventListener('DOMContentLoaded', () => {
    // Functions for each feature

    function showMessage(message) {
        alert(`You selected: ${message}`);
    }

    function toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
    }

    function highlightCard(element) {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => card.classList.remove('highlight'));
        element.classList.add('highlight');
    }

    function generateReport() {
        alert('Report generated successfully!');
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerText = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    function showDate() {
        alert(`Today's date is: ${new Date().toLocaleDateString()}`);
    }

    function switchTheme() {
        document.body.classList.toggle('dark-mode');
    }

    function validateForm() {
        const input = document.querySelector('#inputField');
        if (!input.value) {
            alert('Please fill out the required field.');
            return false;
        }
        return true;
    }

    function autoSave() {
        showNotification('Auto-saving your data...');
    }

    function expandCard(cardElement) {
        cardElement.classList.toggle('expanded');
    }

    function logOut() {
        alert('You have successfully logged out.');
        window.location.href = '/login';
    }

    function confirmDeletion() {
        if (confirm('Are you sure you want to delete this item?')) {
            alert('Item deleted successfully.');
        }
    }

    function feedbackPopup() {
        const feedback = prompt('Please provide your feedback:');
        if (feedback) {
            alert('Thank you for your feedback!');
        }
    }

    function openHelp() {
        window.open('/help', '_blank');
    }

    // Assign functions to interactive elements
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            showMessage(card.innerText);
            highlightCard(card);
        });
    });

    document.querySelector('#generateReport').addEventListener('click', generateReport);
    document.querySelector('#showDate').addEventListener('click', showDate);
    document.querySelector('#toggleSidebar').addEventListener('click', toggleSidebar);
    document.querySelector('#logOut').addEventListener('click', logOut);
});
