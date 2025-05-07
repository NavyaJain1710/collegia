// Function 1: Generate Attendance Sheet
function generateAttendance() {
    alert("Attendance Sheet Generated!");
}

// Function 2: Toggle Select All
function toggleSelectAll() {
    let checkboxes = document.querySelectorAll(".student-checkbox");
    checkboxes.forEach(cb => cb.checked = document.getElementById("selectAll").checked);
}

// Function 3: Submit Attendance
function submitAttendance() {
    alert("Attendance Submitted Successfully!");
}

// Function 4: Reset Attendance
function resetAttendance() {
    document.querySelectorAll(".student-checkbox").forEach(cb => cb.checked = false);
    document.getElementById("selectAll").checked = false;
}

// Function 5: Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

// Function 6: Search Student
function searchStudent() {
    let searchVal = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll("#student-list tr").forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(searchVal) ? "" : "none";
    });
}

// Function 7-15: Additional Event Listeners
document.getElementById("date").addEventListener("change", () => console.log("Date changed!"));
document.getElementById("subject").addEventListener("change", () => console.log("Subject changed!"));
document.getElementById("section").addEventListener("change", () => console.log("Section changed!"));
