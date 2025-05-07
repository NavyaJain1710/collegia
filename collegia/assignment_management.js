document.addEventListener("DOMContentLoaded", function () {
    console.log("Page Loaded Successfully");

    // Function to toggle assignment details
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", function () {
            this.classList.toggle("expanded");
        });
    });

    // Function to highlight due assignments
    function highlightDueAssignments() {
        document.querySelectorAll(".card").forEach(card => {
            if (card.innerText.includes("Due today")) {
                card.classList.add("highlight");
            }
        });
    }
    highlightDueAssignments();

    // Function to filter assignments
    document.querySelector(".sidebar").addEventListener("click", function (event) {
        if (event.target.tagName === "P") {
            let filterText = event.target.innerText;
            document.querySelectorAll(".card").forEach(card => {
                card.style.display = card.innerText.includes(filterText) ? "block" : "none";
            });
        }
    });

    // Function to reset filters
    document.querySelector(".sidebar h2").addEventListener("click", function () {
        document.querySelectorAll(".card").forEach(card => {
            card.style.display = "block";
        });
    });

    // Function to change theme
    document.addEventListener("keydown", function (event) {
        if (event.key === "t") {
            document.body.classList.toggle("dark-mode");
        }
    });

    // Function to add hover effect on cards
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("mouseover", function () {
            this.classList.add("hover-effect");
        });
        card.addEventListener("mouseleave", function () {
            this.classList.remove("hover-effect");
        });
    });

    // Function to dynamically add a new assignment card
    function addNewAssignment(title, author) {
        let newCard = document.createElement("div");
        newCard.className = "card";
        newCard.innerHTML = `<div class="card-header">${title}</div><p><strong>${author}</strong></p><div class="card-footer"><span class="icon">📂</span></div>`;
        document.querySelector(".main-content").appendChild(newCard);
    }
    addNewAssignment("AI & Ethics", "John Doe");

    // Function to delete a card on double-click
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("dblclick", function () {
            this.remove();
        });
    });

    // Function to display an alert when clicking the submission link
    document.querySelector(".sidebar p:last-child").addEventListener("click", function () {
        alert("Redirecting to Submission Portal...");
    });

    // Function to show a timestamp when clicking a card
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", function () {
            console.log(`Card clicked at ${new Date().toLocaleTimeString()}`);
        });
    });
});
