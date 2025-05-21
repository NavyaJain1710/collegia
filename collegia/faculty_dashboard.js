const apiUrl = "http://localhost:7001/api/faculty";

// Load all faculty data
async function loadFaculty() {
    try {
        const response = await fetch(`${apiUrl}/all`);
        const contentType = response.headers.get("content-type");
        if (!response.ok || !contentType.includes("application/json")) {
            throw new Error("Invalid response from server");
        }

        const facultyList = await response.json();
        const tableBody = document.querySelector("#faculty-table-body");
        tableBody.innerHTML = "";

        facultyList.forEach(faculty => {
            const row = `
                <tr>
                    <td>${faculty.name}</td>
                    <td>${faculty.facultyId}</td>
                    <td>${faculty.department}</td>
                    <td>${faculty.designation}</td>
                    <td>
                        <button onclick="editFaculty('${faculty._id}')">Edit</button>
                        <button onclick="deleteFaculty('${faculty._id}')">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        alert(`Failed to load faculty: ${error.message}`);
    }
}

// Add new faculty
async function addFaculty() {
    const name = document.querySelector("#name").value;
    const facultyId = document.querySelector("#facultyId").value;
    const department = document.querySelector("#department").value;
    const designation = document.querySelector("#designation").value;

    if (!name || !facultyId || !department || !designation) {
        alert("Please fill in all fields");
        return;
    }

    const data = { name, facultyId: Number(facultyId), department, designation };

    try {
        const response = await fetch(`${apiUrl}/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("Failed to add faculty");

        await loadFaculty();
        clearFields();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

// Delete faculty
async function deleteFaculty(id) {
    if (!confirm("Are you sure you want to delete this faculty?")) return;

    try {
        const response = await fetch(`${apiUrl}/delete/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Failed to delete");

        await loadFaculty();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

// Edit (prefill form)
let editingId = null;

function editFaculty(id) {
    const row = [...document.querySelectorAll("tr")].find(r => r.innerHTML.includes(id));
    const cells = row.querySelectorAll("td");

    document.querySelector("#name").value = cells[0].textContent;
    document.querySelector("#facultyId").value = cells[1].textContent;
    document.querySelector("#department").value = cells[2].textContent;
    document.querySelector("#designation").value = cells[3].textContent;

    editingId = id;
    document.querySelector("#addBtn").style.display = "none";
    document.querySelector("#updateBtn").style.display = "inline-block";
}

// Update faculty
async function updateFaculty() {
    if (!editingId) return;

    const name = document.querySelector("#name").value;
    const facultyId = document.querySelector("#facultyId").value;
    const department = document.querySelector("#department").value;
    const designation = document.querySelector("#designation").value;

    const data = { name, facultyId: Number(facultyId), department, designation };

    try {
        const response = await fetch(`${apiUrl}/update/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("Failed to update");

        await loadFaculty();
        clearFields();
        editingId = null;
        document.querySelector("#addBtn").style.display = "inline-block";
        document.querySelector("#updateBtn").style.display = "none";
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

// Clear form fields
function clearFields() {
    document.querySelector("#name").value = "";
    document.querySelector("#facultyId").value = "";
    document.querySelector("#department").value = "";
    document.querySelector("#designation").value = "";
}

window.onload = loadFaculty;
