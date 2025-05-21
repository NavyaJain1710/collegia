const API_URL = 'http://localhost:8001/api/attendance';
let attendanceData = [];

function renderTable() {
    const table = document.getElementById("attendanceTable");
    table.innerHTML = "";

    if (attendanceData.length === 0) {
        table.innerHTML = "<tr><td colspan='4'>No records found</td></tr>";
        return;
    }

    attendanceData.forEach((entry) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.code}</td>
            <td>${entry.course}</td>
            <td>${entry.count}</td>
            <td>
                <button class="edit-btn" onclick="editAttendance('${entry._id}')">Edit</button>
                <button class="delete-btn" onclick="deleteAttendance('${entry._id}')">Delete</button>
            </td>
        `;
        table.appendChild(row);
    });
}

function clearInputs() {
    document.getElementById("codeInput").value = "";
    document.getElementById("courseInput").value = "";
    document.getElementById("countInput").value = "";
}

async function fetchAttendance() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch attendance");
        attendanceData = await res.json();
        renderTable();
    } catch (err) {
        alert("Error fetching attendance data");
        console.error(err);
    }
}

async function addAttendance() {
    const code = document.getElementById("codeInput").value.trim();
    const course = document.getElementById("courseInput").value.trim();
    const count = document.getElementById("countInput").value.trim();

    if (!code || !course || !count) {
        alert("Please fill all fields.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code, course, count })
        });

        if (response.ok) {
            clearInputs();
            fetchAttendance();
        } else {
            const errData = await response.json();
            alert(`Error: ${errData.message}`);
        }
    } catch (err) {
        alert("Error adding attendance.");
        console.error(err);
    }
}

async function deleteAttendance(id) {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!res.ok) throw new Error("Delete failed");

        fetchAttendance();
    } catch (err) {
        alert("Error deleting attendance.");
        console.error(err);
    }
}

async function editAttendance(id) {
    const entry = attendanceData.find(e => e._id === id);
    if (!entry) return;

    const newCode = prompt("Edit Code:", entry.code);
    const newCourse = prompt("Edit Course:", entry.course);
    const newCount = prompt("Edit Attendance Count:", entry.count);

    if (!newCode || !newCourse || !newCount) {
        alert("All fields are required.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: newCode.trim(),
                course: newCourse.trim(),
                count: newCount.trim()
            })
        });

        if (response.ok) {
            fetchAttendance();
        } else {
            const errData = await response.json();
            alert(`Update error: ${errData.message}`);
        }
    } catch (err) {
        alert("Error updating attendance.");
        console.error(err);
    }
}

document.addEventListener("DOMContentLoaded", fetchAttendance);
