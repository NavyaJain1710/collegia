
function showAlert() {
    alert("Class Schedule is under construction.");
}

function highlightToday() {
    const today = 'February 24';
    const rows = document.querySelectorAll("#tableBody tr");
    rows.forEach(row => {
        const dateCell = row.children[6];
        if (dateCell.textContent.trim() === today) {
            row.style.backgroundColor = '#FFD700';
        }
    });
}

function sortByName() {
    const table = document.getElementById("tableBody");
    const rows = Array.from(table.querySelectorAll("tr"));

    rows.sort((a, b) => {
        const nameA = a.children[1].textContent.trim().toLowerCase();
        const nameB = b.children[1].textContent.trim().toLowerCase();
        return nameA.localeCompare(nameB);
    });

    table.innerHTML = "";
    rows.forEach(row => table.appendChild(row));
}

function exportToCSV() {
    let csv = "Code,Name,Session,Credits,Faculty Name,Area,Next Lecture On\n";
    const rows = document.querySelectorAll("#courseTable tr");

    rows.forEach(row => {
        const cells = Array.from(row.children).map(cell => cell.textContent.trim());
        csv += cells.join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "courses.csv";
    a.click();
}

function countTotalCredits() {
    const rows = document.querySelectorAll("#tableBody tr");
    let totalCredits = 0;
    rows.forEach(row => {
        totalCredits += parseFloat(row.children[3].textContent.trim());
    });
    alert(`Total Credits: ${totalCredits}`);
}

function filterByFaculty() {
    const facultyName = prompt("Enter Faculty Name:").trim().toLowerCase();
    const rows = document.querySelectorAll("#tableBody tr");

    rows.forEach(row => {
        const facultyCell = row.children[4].textContent.trim().toLowerCase();
        if (!facultyCell.includes(facultyName)) {
            row.style.display = "none";
        } else {
            row.style.display = "";
        }
    });
}
