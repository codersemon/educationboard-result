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
    // roll duplicate check
    if (studentsInfo.some((item) => item.stu_roll == data.stu_roll)) {
      msg.innerHTML = createAlert("Roll already exist!", "danger");
      return;
    }

    // reg duplicate check
    if (studentsInfo.some((item) => item.stu_reg == data.stu_reg)) {
      msg.innerHTML = createAlert("Reg already exist!", "danger");
      return;
    }

    // add data to studentsInfo array
    studentsInfo.push({
      ...data,
      result: null,
      created_at: Date.now(),
      id: generateUniqueID(),
    });

    // send new data to LS
    sendDataLS("students", studentsInfo);

    // show students
    showStudentsData();

    // reset form
    e.target.reset();

    // save success msg
    msg.innerHTML = createAlert("New Student Added!", "success");
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
        <td>${timeAgo(student.created_at)}</td>
        <td>
          ${student.result == null ? `<button class="btn btn-success" onclick="addResult('${student.id}')" data-bs-toggle="modal" data-bs-target="#addResult">Add Result</button>` : `<button class="btn btn-info">View Result</button>`}
        </td>
        <td>
          <button class="btn btn-info" onclick="showSingleStudent('${
            student.id
          }')" data-bs-target="#singleStudentModal" data-bs-toggle="modal">
            <i class="fa-regular fa-eye"></i>
          </button>
          <button class="btn btn-warning" onclick="editSingleStudent('${
            student.id
          }')" data-bs-target="#editStudent" data-bs-toggle="modal">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="btn btn-danger" onclick="deleteStudent('${
            student.id
          }')">
              <i class="fa-light fa-trash"></i>
          </button>
        </td>
      </tr>`;
    });
  } else {
    studentsContent =
      '<tr><td colspan="8" class="text-center">No Data Found!</td></tr>';
  }
  studentListWrap.innerHTML = studentsContent;
}
showStudentsData();

/****************************
 * Delete student data
 ***************************/
function deleteStudent(id) {
  // get students except deleted student
  const newStudents = studentsInfo.filter((item) => item.id != id);

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
function showSingleStudent(id) {
  // get student by roll
  const singleStudent = studentsInfo.filter((student) => student.id == id);

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

/**********************
 * Reload Student View
 **********************/
const reloadStudentView = document.getElementById("students_view_reload");
reloadStudentView.onclick = (e) => {
  // show new students
  showStudentsData();
};

/**********************
 * Edit student data
 **********************/
const editStudentForm = document.getElementById("editStudentForm");
const editImgPrev = document.getElementById("edit_prev");
const editMsg = document.querySelector('.edit-msg');
function editSingleStudent(id) {
  // select student data
  const student = studentsInfo.filter((item) => item.id == id);

  // show student data in edit form
  editStudentForm.querySelector('input[name="stu_name"]').value =
    student[0].stu_name;
  editStudentForm.querySelector('input[name="stu_roll"]').value =
    student[0].stu_roll;
  editStudentForm.querySelector('input[name="stu_reg"]').value =
    student[0].stu_reg;
  editStudentForm.querySelector('input[name="stu_photo"]').value =
    student[0].stu_photo;
  editStudentForm.querySelector('input[name="id"]').value = student[0].id;
  editImgPrev.setAttribute("src", student[0].stu_photo);
}

// update student data on edit form submit
editStudentForm.onsubmit = (e) => {
  e.preventDefault();

  // get new data on form submit
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  // data validation
  if (!data.stu_name || !data.stu_roll || !data.stu_reg) {
    editMsg.innerHTML = createAlert("All fields are required!", "danger");
  } else if (
    !isNumber(parseInt(data.stu_roll)) ||
    !isNumber(parseInt(data.stu_reg))
  ) {
    editMsg.innerHTML = createAlert("Roll & Reg must be number!", "danger");
  } else {
    // get student data index
    const stuIndex = studentsInfo.findIndex((item) => item.id == data.id);

    // update data in array
    studentsInfo[stuIndex] = {
      ...studentsInfo[stuIndex],
      ...data,
    };

    // send data to LS
    sendDataLS("students", studentsInfo);

    // show students view
    showStudentsData();

    // Update msg 
    editMsg.innerHTML = createAlert("Data update success!", "success");
  }
};

/**********************
 * Add Student Result
 **********************/
const addResultForm = document.getElementById('addResultForm');
const resultMsg = document.querySelector('.result-msg');
function addResult(id){
  addResultForm.querySelector('input[name="id"]').value = id;
}

// add result to db on form submit 
addResultForm.onsubmit = (e) => {
  e.preventDefault();

  // get marks from input 
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  // data validation 
  if(!data.bangla || !data.english || !data.math || !data.science || !data.social_science || !data.religion){
    resultMsg.innerHTML = createAlert('All fields required!', 'danger');
  }else{
    // student data index
    const stuIndex = studentsInfo.findIndex(item => item.id === data.id);

    // data without id 
    const {id, ...dataWithoutId} = data;

    // add student result 
    studentsInfo[stuIndex] = {
      ...studentsInfo[stuIndex],
      result : dataWithoutId
    }

    // send to LS 
    sendDataLS('students', studentsInfo);

    // reload student view 
    showStudentsData();

    // save success msg 
    resultMsg.innerHTML = createAlert('Save success!', 'success');
  }
}

