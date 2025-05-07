function showAttendance() {
    alert("Displaying Attendance Sheet");
}

function showDashboard() {
    alert("Displaying Dashboard");
}

function showReport() {
    alert("Displaying Report");
}

function loadAttendance() {
    const table = document.getElementById("attendanceTable");
    table.innerHTML = `
        <tr>
            <td>CSE2709</td>
            <td>Computer Organization & Architecture</td>
            <td>4/6</td>
        </tr>
        <tr>
            <td>CSE2709</td>
            <td>Design Thinking</td>
            <td>2/6</td>
        </tr>
        <tr>
            <td>CSE2709</td>
            <td>Machine Learning</td>
            <td>8/10</td>
        </tr>
        <tr>
            <td>CSE2709</td>
            <td>Mobile Application Development</td>
            <td>5/10</td>
        </tr>
    `;
}

document.addEventListener("DOMContentLoaded", loadAttendance);

function filterAttendance() {
    alert("Filtering attendance records");
}

function generateSheet() {
    alert("Generating attendance sheet");
}
