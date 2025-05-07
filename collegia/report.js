ocument.addEventListener("DOMContentLoaded", () => {
    const reportForm = document.getElementById("report-form");

    reportForm.addEventListener("submit", function(event) {
        event.preventDefault();
        generateReport();
    });

    function generateReport() {
        const studentName = document.getElementById("student-name").value;
        const studentID = document.getElementById("student-id").value;
        const course = document.getElementById("course").value;
        const grades = document.getElementById("grades").value;
        const comments = document.getElementById("comments").value;

        if (!studentName || !studentID || !course || !grades) {
            alert("Please fill all required fields.");
            return;
        }

        const reportData = { studentName, studentID, course, grades, comments };
        localStorage.setItem("studentReport", JSON.stringify(reportData));

        alert("Report generated successfully!");
        reportForm.reset();
    }

    function loadPreviousReport() {
        const storedReport = localStorage.getItem("studentReport");
        if (storedReport) {
            const { studentName, studentID, course, grades, comments } = JSON.parse(storedReport);
            document.getElementById("student-name").value = studentName;
            document.getElementById("student-id").value = studentID;
            document.getElementById("course").value = course;
            document.getElementById("grades").value = grades;
            document.getElementById("comments").value = comments;
        }
    }

    loadPreviousReport();
});