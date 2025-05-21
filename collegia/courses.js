const API_URL = 'http://localhost:7001/api/courses';
let courses = []; // Global variable declaration

// Load courses from backend
async function loadCourses() {
    try {
        const res = await fetch(API_URL);
        courses = await res.json();
        renderTable();
    } catch (error) {
        alert("⚠️ Failed to fetch courses from backend.");
        console.error(error);
    }
}

async function addCourse() {
    const course = getCourseDetailsFromPrompt();
    if (!course) return;

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(course)
        });
        const newCourse = await res.json();
        courses.push(newCourse);
        renderTable();
    } catch (error) {
        alert("⚠️ Failed to add course.");
        console.error(error);
    }
}

async function editCourse(index) {
    const course = courses[index];
    const updated = getCourseDetailsFromPrompt(course);
    if (!updated) return;

    try {
        const res = await fetch(`${API_URL}/${course._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
        });
        const updatedCourse = await res.json();
        courses[index] = updatedCourse;
        renderTable();
    } catch (error) {
        alert("⚠️ Failed to update course.");
        console.error(error);
    }
}

async function deleteCourse(index) {
    const course = courses[index];
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
        await fetch(`${API_URL}/${course._id}`, { method: 'DELETE' });
        courses.splice(index, 1);
        renderTable();
    } catch (error) {
        alert("⚠️ Failed to delete course.");
        console.error(error);
    }
}

function renderTable() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    courses.forEach((course, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${course.code}</td>
            <td>${course.name}</td>
            <td>${course.sessions}</td>
            <td>${course.credits}</td>
            <td>${course.faculty}</td>
            <td>${course.area}</td>
            <td>${course.nextLecture}</td>
            <td class="actions">
                <button onclick="editCourse(${index})">Edit</button>
                <button onclick="deleteCourse(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function getCourseDetailsFromPrompt(existing = {}) {
    const code = prompt("Enter Course Code:", existing.code || "");
    const name = prompt("Enter Course Name:", existing.name || "");
    const sessions = parseFloat(prompt("Enter Sessions:", existing.sessions || ""));
    const credits = parseFloat(prompt("Enter Credits:", existing.credits || ""));
    const faculty = prompt("Enter Faculty Name:", existing.faculty || "");
    const area = prompt("Enter Area:", existing.area || "");
    const nextLecture = prompt("Enter Next Lecture On (e.g., February 24):", existing.nextLecture || "");

    if (
        code && name && !isNaN(sessions) &&
        !isNaN(credits) && faculty && area && nextLecture
    ) {
        return { code, name, sessions, credits, faculty, area, nextLecture };
    } else {
        alert("⚠️ Please fill all fields correctly.");
        return null;
    }
}

// Utility Functions
function showAlert() {
    alert("📅 Class Schedule is under construction.");
}

function highlightToday() {
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const rows = document.querySelectorAll("#tableBody tr");
    rows.forEach(row => {
        const dateCell = row.children[6];
        row.style.backgroundColor = dateCell.textContent.trim() === today ? '#FFD700' : '';
    });
}

function sortByName() {
    courses.sort((a, b) => a.name.localeCompare(b.name));
    renderTable();
}

function exportToCSV() {
    let csv = "Code,Name,Sessions,Credits,Faculty Name,Area,Next Lecture On\n";
    courses.forEach(course => {
        csv += `${course.code},${course.name},${course.sessions},${course.credits},${course.faculty},${course.area},${course.nextLecture}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "courses.csv";
    a.click();
}

function countTotalCredits() {
    const totalCredits = courses.reduce((sum, course) => sum + parseFloat(course.credits), 0);
    alert(`🎓 Total Credits: ${totalCredits}`);
}

function filterByFaculty() {
    const facultyName = prompt("Enter Faculty Name:").trim().toLowerCase();
    const rows = document.querySelectorAll("#tableBody tr");
    rows.forEach((row, index) => {
        const faculty = courses[index].faculty.toLowerCase();
        row.style.display = faculty.includes(facultyName) ? "" : "none";
    });
}

// Load data on start
loadCourses();
