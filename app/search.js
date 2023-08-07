// search form select 
const searchForm = document.getElementById('searchForm');
const resultSection = document.getElementById('search_result_section');
const msg = document.querySelector('.msg');

// all students info variable
let studentsInfo = getDataLS("students");

// search submit 
searchForm.onsubmit = (e) => {
    e.preventDefault();

    // get form data 
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());

    // validation 
    if(!data.roll || !data.reg){
        msg.innerHTML = createAlert('Roll & Reg Required!', 'danger');
    }else if(!isNumber(parseInt(data.roll)) || !isNumber(parseInt(data.reg))){
        msg.innerHTML = createAlert('Roll and reg must be number!', 'danger');
    } else{
        msg.innerHTML = '';

        // get Student details 
        const student = studentsInfo.find(item => item.stu_roll === data.roll && item.stu_reg === data.reg);

        // result building 
        let mareksheet = [];
        let totalgpa = 0;
      
        for(item in student.result){
          mareksheet.push(getGPAGrade(student.result[item], item));
          totalgpa += getGPAGrade(student.result[item]).gpa;
        }
        let finalResult = calculateGPAGrade(totalgpa, mareksheet.length);

        // generate sub wise result html
        let marksheetHTML = '';
        mareksheet.forEach(item => {
            marksheetHTML += `<tr class="table-info">
            <td>${item.sub}</td>
            <td>${item.gpa}</td>
            <td>${item.grade}</td>
            </tr>`;
        })




        // show result 
        resultSection.style.display = 'block';
        resultSection.querySelector('.result').innerHTML = `<table class="table stu-info table-bordered table-success table-sm">
        <tr>
          <td>Roll No</td>
          <td>${student.stu_roll}</td>
          <td>Reg No</td>
          <td>${student.stu_reg}</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>${student.stu_name}</td>
          <td>Result</td>
          <td>${finalResult.grade == 'F' ? 'FAIL': 'PASS'}</td>
        </tr>
        <tr>
          <td>GPA</td>
          <td>${finalResult.finalgpa}</td>
          <td>Grade</td>
          <td>${finalResult.grade}</td>
        </tr>
      </table>

      <h3 class="text-center">Garde Sheet</h3>
      <table class="table table-sm stu-mark table-striped table-bordered">
        <tr class="table-info">
          <td>Subject</td>
          <td>Marks</td>
          <td>Grade</td>
        </tr>
        ${marksheetHTML}
      </table>`
    }



}