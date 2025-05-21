document.addEventListener("DOMContentLoaded", function () {
    const mainContent = document.querySelector(".main-content");
    const titleInput = document.getElementById("titleInput");
    const authorInput = document.getElementById("authorInput");
    const addBtn = document.getElementById("addBtn");

    async function loadAssignments() {
        try {
            const res = await fetch("http://localhost:5001/api/assignments");
            const data = await res.json();
            data.forEach(assignment => createCard(assignment));
        } catch (err) {
            console.error("Failed to load assignments:", err);
        }
    }

    addBtn.addEventListener("click", async () => {
        const title = titleInput.value.trim();
        const faculty = authorInput.value.trim();

        if (!title || !faculty) {
            alert("Both Title and Faculty fields are required!");
            return;
        }

        const newAssignment = { title, faculty };

        try {
            const res = await fetch("http://localhost:5001/api/assignments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newAssignment)
            });

            if (!res.ok) throw new Error("Failed to save assignment");

            const savedAssignment = await res.json();
            createCard(savedAssignment);

            titleInput.value = "";
            authorInput.value = "";
        } catch (err) {
            console.error("Failed to add assignment:", err);
            alert("Error: Could not save assignment.");
        }
    });

    function createCard(data) {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.id = data._id;

        card.innerHTML = `
            <div class="card-header">${data.title}</div>
            <p><strong>${data.faculty}</strong></p>
            <div class="card-footer">
                <span class="icon edit">✏️</span>
                <span class="icon delete">🗑️</span>
            </div>
        `;
        mainContent.appendChild(card);
    }

    document.addEventListener("click", async function (e) {
        const card = e.target.closest(".card");
        if (!card) return;

        const id = card.dataset.id;

        if (e.target.classList.contains("edit")) {
            const titleElem = card.querySelector(".card-header");
            const facultyElem = card.querySelector("p strong");

            const newTitle = prompt("Edit title:", titleElem.innerText)?.trim();
            const newFaculty = prompt("Edit faculty:", facultyElem.innerText)?.trim();

            if (newTitle && newFaculty) {
                try {
                    const res = await fetch(`http://localhost:5001/api/assignments/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ title: newTitle, faculty: newFaculty })
                    });

                    if (!res.ok) throw new Error("Update failed");

                    const updated = await res.json();
                    titleElem.innerText = updated.title;
                    facultyElem.innerText = updated.faculty;
                } catch (err) {
                    console.error("Failed to update:", err);
                    alert("Update failed.");
                }
            }
        }

        if (e.target.classList.contains("delete")) {
            if (confirm("Are you sure you want to delete this assignment?")) {
                try {
                    const res = await fetch(`http://localhost:5001/api/assignments/${id}`, {
                        method: "DELETE"
                    });

                    if (!res.ok) throw new Error("Delete failed");

                    card.remove();
                } catch (err) {
                    console.error("Delete failed:", err);
                    alert("Could not delete assignment.");
                }
            }
        }
    });

    loadAssignments();
});
