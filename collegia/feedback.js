document.addEventListener("DOMContentLoaded", init);

function init() {
    loadFeedbackHistory();
}

// 1. Submit feedback function
function submitFeedback() {
    let feedbackText = document.getElementById("feedbackText").value;
    if (feedbackText.trim() === "") {
        alert("Please enter feedback before submitting.");
        return;
    }

    let feedbacks = getFeedbacks();
    feedbacks.push(feedbackText);
    saveFeedbacks(feedbacks);

    updateHistory();
    document.getElementById("feedbackText").value = "";
}

// 2. Load feedback history
function loadFeedbackHistory() {
    updateHistory();
}

// 3. Update feedback history UI
function updateHistory() {
    let historyDiv = document.getElementById("history");
    let feedbacks = getFeedbacks();

    historyDiv.innerHTML = feedbacks.length > 0 ? feedbacks.map(f => `<p>${f}</p>`).join('') : "No feedback submitted yet.";
}

// 4. Get feedbacks from localStorage
function getFeedbacks() {
    let feedbacks = localStorage.getItem("feedbacks");
    return feedbacks ? JSON.parse(feedbacks) : [];
}

// 5. Save feedbacks to localStorage
function saveFeedbacks(feedbacks) {
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
}

// 6. Clear all feedbacks
function clearFeedbacks() {
    localStorage.removeItem("feedbacks");
    updateHistory();
}

// 7. Export feedbacks as text file
function exportFeedbacks() {
    let feedbacks = getFeedbacks();
    let content = feedbacks.join("\n");
    let blob = new Blob([content], { type: "text/plain" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "feedbacks.txt";
    a.click();
}

// 8. Simulate an alert on page load
function welcomeMessage() {
    alert("Welcome to the feedback section!");
}

// 9. Change background color dynamically
function changeBackground(color) {
    document.body.style.backgroundColor = color;
}

// 10. Add a sample feedback for demo
function addSampleFeedback() {
    let sample = "This is a sample feedback!";
    let feedbacks = getFeedbacks();
    feedbacks.push(sample);
    saveFeedbacks(feedbacks);
    updateHistory();
}
