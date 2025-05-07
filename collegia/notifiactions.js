document.addEventListener('DOMContentLoaded', () => {
    const notifications = [
        "New assignment posted",
        "Reminder: Upcoming exam next week",
        "Discussion forum updated",
        "Attendance report available",
        "Grade for last assignment available",
        "New study material added",
        "New message from your instructor",
        "Feedback on recent submission"
    ];

    const notificationContainer = document.getElementById('notifications');

    function renderNotifications() {
        notificationContainer.innerHTML = '';
        notifications.forEach((note, index) => {
            const card = document.createElement('div');
            card.className = 'notification-card';
            card.innerText = note;
            card.onclick = () => markAsRead(index);
            notificationContainer.appendChild(card);
        });
    }

    function markAsRead(index) {
        alert(`Marked as read: ${notifications[index]}`);
    }

    function addNotification(text) {
        notifications.push(text);
        renderNotifications();
    }

    function searchNotifications(keyword) {
        const results = notifications.filter(note => note.toLowerCase().includes(keyword.toLowerCase()));
        alert(`Search Results:\n${results.join('\n') || 'No results found.'}`);
    }

    function removeNotification(index) {
        notifications.splice(index, 1);
        renderNotifications();
    }

    function clearAll() {
        notifications.length = 0;
        renderNotifications();
    }

    // Sample Function Triggers
    addNotification("New Holiday Announced");
    searchNotifications("exam");

    renderNotifications();
});
