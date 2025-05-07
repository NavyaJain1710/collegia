document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("booking-form");

    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();
        bookTransportation();
    });

    function bookTransportation() {
        const service = document.getElementById("service").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        if (!service || !date || !time) {
            alert("Please fill all fields.");
            return;
        }

        const bookingData = { service, date, time };
        localStorage.setItem("transportBooking", JSON.stringify(bookingData));

        alert("Transportation booked successfully!");
        bookingForm.reset();
    }

    function loadPreviousBooking() {
        const storedBooking = localStorage.getItem("transportBooking");
        if (storedBooking) {
            const { service, date, time } = JSON.parse(storedBooking);
            document.getElementById("service").value = service;
            document.getElementById("date").value = date;
            document.getElementById("time").value = time;
        }
    }

    function clearBooking() {
        localStorage.removeItem("transportBooking");
        alert("Booking cleared.");
        bookingForm.reset();
    }

    loadPreviousBooking();

    function toggleSidebar() {
        const sidebar = document.querySelector(".sidebar");
        sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
    }

    document.querySelector(".dashboard-btn").addEventListener("click", toggleSidebar);
});