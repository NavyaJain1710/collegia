document.addEventListener("DOMContentLoaded", function() {
    function showAlert(message) {
        alert(message);
    }
    function logMessage(message) {
        console.log(message);
    }
    function toggleSidebar() {
        document.querySelector(".sidebar").classList.toggle("hidden");
    }
    function highlightButtons() {
        document.querySelectorAll(".button").forEach(btn => btn.style.background = "#e74c3c");
    }
    function restoreButtons() {
        document.querySelectorAll(".button").forEach(btn => btn.style.background = "#3498db");
    }
    function fetchData() {
        console.log("Fetching complaints data...");
    }
    function clearComplaints() {
        document.querySelector(".content").innerHTML = "<h2>No complaints available.</h2>";
    }
    function addNewComplaint() {
        console.log("Adding a new complaint: 'Issue with online submission'...");
    }
    function sortComplaints() {
        console.log("Sorting complaints by date...");
    }
    function filterComplaints() {
        console.log("Filtering pending complaints...");
    }

    document.querySelector(".button").addEventListener("click", function() {
        showAlert("Button clicked!");
    });
});
