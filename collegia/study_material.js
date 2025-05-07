function toggleSidebar() {
    document.querySelector(".sidebar").classList.toggle("hidden");
}
function openMaterial(page) {
    window.location.href = page;
}
function searchMaterials() {
    let input = document.getElementById("search").value.toLowerCase();
    let cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        let text = card.innerText.toLowerCase();
        card.style.display = text.includes(input) ? "block" : "none";
    });
}
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
}
function sortMaterials() {
    let grid = document.getElementById("materialGrid");
    let cards = Array.from(grid.children);
    cards.sort((a, b) => a.innerText.localeCompare(b.innerText));
    grid.innerHTML = "";
    cards.forEach(card => grid.appendChild(card));
}
function resetView() {
    document.getElementById("search").value = "";
    searchMaterials();
}
function highlightCard(card) {
    card.classList.add("highlight");
    setTimeout(() => card.classList.remove("highlight"), 1000);
}
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mouseover", () => highlightCard(card));
});
function showMaterialCount() {
    alert("Total Materials: " + document.querySelectorAll(".card").length);
}
function toggleTextSize() {
    document.body.classList.toggle("large-text");
}
