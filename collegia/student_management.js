// 🔄 Fetch all students from backend
async function fetchStudents() {
    const res = await fetch("http://localhost:3000/api/students");
    return await res.json();
  }
  
  //  Add new student
  async function addStudent(student) {
    await fetch("http://localhost:3000/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    loadAndRender(); 
  }
  
  //  Update existing student
  async function updateStudent(id, student) {
    await fetch(`http://localhost:3000/api/students/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    loadAndRender(); 
  }
  
  // Delete student
  async function deleteStudent(id) {
    await fetch(`http://localhost:3000/api/students/${id}`, {
      method: "DELETE",
    });
    loadAndRender(); 
  }
  
  //  Load and render all students into table
  async function loadAndRender() {
    const students = await fetchStudents();
    const tbody = document.querySelector("#studentTable tbody");
    tbody.innerHTML = "";
  
    students.forEach((student) => {
      tbody.innerHTML += `
        <tr>
          <td>${student.name}</td>
          <td>${student.roll}</td>
          <td>${student.branch}</td>
          <td>
            <button onclick='fillForm(${JSON.stringify(student)})'>Edit</button>
            <button onclick='deleteStudent("${student._id}")'>Delete</button>
          </td>
        </tr>`;
    });
  }
  
  //  Handle form submit for add/edit
  document.getElementById("studentForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const student = {
      name: document.getElementById("name").value,
      roll: document.getElementById("roll").value,
      branch: document.getElementById("branch").value,
    };
  
    if (this.dataset.id) {
      // Edit mode
      await updateStudent(this.dataset.id, student);
      delete this.dataset.id;
    } else {
      // Add mode
      await addStudent(student);
    }
  
    this.reset(); // clear form
  });
  
  //  Fill form with existing student data for edit
  function fillForm(student) {
    document.getElementById("name").value = student.name;
    document.getElementById("roll").value = student.roll;
    document.getElementById("branch").value = student.branch;
    document.getElementById("studentForm").dataset.id = student._id;
  }
  
  //  Initial load
  loadAndRender();
  