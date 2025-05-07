document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".event-card button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            alert("More details will be available soon!");
        });
    });
});