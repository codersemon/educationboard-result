// new student form selection
const newStudentForm = document.getElementById("newStudentForm");
// form validation msg
const msg = document.querySelector(".msg");

// all students info variable
let studentsInfo = getDataLS("students");

/****************************
 * process new student data
 ***************************/
newStudentForm.onsubmit = (e) => {
  e.preventDefault();

  // get data from the form
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  // data validation
  if (!data.stu_name || !data.stu_roll || !data.stu_reg) {
    msg.innerHTML = createAlert("All fields are required!", "danger");
  } else if (
    !isNumber(parseInt(data.stu_roll)) ||
    !isNumber(parseInt(data.stu_reg))
  ) {
    msg.innerHTML = createAlert("Roll & Reg must be number!", "danger");
  } else {
    msg.innerHTML = createAlert("New Student Added!", "success");

    // add data to studentsInfo array
    studentsInfo.push({
      ...data,
      result: null,
      created_at: Date.now(),
    });

    // send new data to LS
    sendDataLS("students", studentsInfo);

    // show students
    showStudentsData();

    // reset form
    e.target.reset();
  }
};

/****************************
 * Show student data
 ***************************/
const studentListWrap = document.querySelector(".students-list");

function showStudentsData() {
  let studentsContent = "";

  if (studentsInfo.length > 0) {
    // add all student table view content 
    studentsInfo.forEach((student, index) => {
      studentsContent += `<tr class="stu-single stu-${index + 1}">
        <td>${index + 1}</td>
        <td>
          <img
            class="rounded-circle img-fluid"
            src="${student.stu_photo}"
          />
        </td>
        <td>${student.stu_name}</td>
        <td>${student.stu_roll}</td>
        <td>${student.stu_reg}</td>
        <td>5 mins ago</td>
        <td>
          <button class="btn btn-success">Add Result</button>
        </td>
        <td>
          <button class="btn btn-info" onclick="showSingleStudent('${
            student.stu_roll
          }')" data-bs-target="#singleStudentModal" data-bs-toggle="modal">
            <i class="fa-regular fa-eye"></i>
          </button>
          <button class="btn btn-warning">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="btn btn-danger" onclick="deleteStudent('${
            student.stu_roll
          }')">
              <i class="fa-light fa-trash"></i>
          </button>
        </td>
      </tr>`;
    });
  } else {
    studentsContent = '<tr><td colspan="8" class="text-center">No Data Found!</td></tr>'
  }
  studentListWrap.innerHTML = studentsContent;
}
showStudentsData();

/****************************
 * Delete student data
 ***************************/
function deleteStudent(roll) {
  // get students except deleted student
  const newStudents = studentsInfo.filter((item) => item.stu_roll != roll);

  // update studentsInfo with new  data
  studentsInfo = newStudents;

  // send new student to LS
  sendDataLS("students", studentsInfo);

  // show new students
  showStudentsData();
}

/****************************
 * Show Single student
 ***************************/
const singleStudentWrap = document.querySelector(".single-student-wrap");
function showSingleStudent(roll) {
  // get student by roll
  const singleStudent = studentsInfo.filter(
    (student) => student.stu_roll == roll
  );

  singleStudentWrap.innerHTML = `<div class="modal-header">
    <h1 class="modal-title fs-5">${singleStudent[0].stu_name} Details</h1>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="modal"
      aria-label="Close"
    ></button>
  </div>
  <div class="modal-body">
    <div class="row">
      <div class="col-6">
        <img
          class="w-100 rounded"
          src="${singleStudent[0].stu_photo}"
        />
      </div>
      <div class="col-6">
        <table class="table">
          <tr>
            <td>Name:</td>
            <td>${singleStudent[0].stu_name}</td>
          </tr>
          <tr>
            <td>Roll:</td>
            <td>${singleStudent[0].stu_roll}</td>
          </tr>
          <tr>
            <td>Reg:</td>
            <td>${singleStudent[0].stu_reg}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>`;
}
