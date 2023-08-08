// search form select
const searchForm = document.getElementById("searchForm");
const resultSection = document.getElementById("search_result_section");
const msg = document.querySelector(".msg");
const searchFormSection = document.querySelector(".search-form-section");
const preloader = document.querySelector(".preloader");

// all students info variable
let studentsInfo = getDataLS("students");

// search submit
searchForm.onsubmit = (e) => {
  e.preventDefault();

  // get form data
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());


  // validation
  if (!data.roll || !data.reg) {
    msg.innerHTML = createAlert("Roll & Reg Required!", "danger");
  } else if (!isNumber(parseInt(data.roll)) || !isNumber(parseInt(data.reg))) {
    msg.innerHTML = createAlert("Roll and reg must be number!", "danger");
  } else {

// get Student details
const student = studentsInfo.find(
  (item) => item.stu_roll === data.roll && item.stu_reg === data.reg
);

    // data check 
    if(student){
      msg.innerHTML = "";
      // hide searchform
      searchFormSection.style.display = "none";
      preloader.style.width = "98vw";
      preloader.style.height = "85vh";
      preloader.style.opacity = "1";
  
      // final result building
      let totalgpa = 0;
      let totalGPAWithoutAdditional = 0;
      for (item in student.result) {
        totalgpa += getGPAGrade(parseInt(student.result[item])).gpa;
        // check for making result without additonal subject
        if (item == "religion") {
          let getGpaAfterdeduct =
            getGPAGrade(parseInt(student.result[item])).gpa - 2;
          totalGPAWithoutAdditional += getGpaAfterdeduct;
        } else {
          totalGPAWithoutAdditional += getGPAGrade(
            parseInt(student.result[item])
          ).gpa;
        }
      }
      let finalResult = calculateGPAGrade(totalgpa, 6);
  
      // show result
      const resTimeout = setTimeout(() => {
        preloader.style.width = "0";
        preloader.style.height = "0";
        preloader.style.opacity = "0";
        resultSection.style.display = "block";
      }, 2000);
  
      resultSection.querySelector('.title').innerHTML = `Result of ${student.stu_name}`
      resultSection.querySelector(
        ".result"
      ).innerHTML = `<h4 class="text-center text-uppercase text-decoration-underline">Academic Transcript</h4>
      <table
        class="stu-info my-3"
      >
        <tbody>
          <tr>
            <td class="pe-3"><b>Name of Student </b></td>
            <td class="cursive">${student.stu_name}</td>
          </tr>
          <tr>
            <td  class="pe-3"><b>Roll No.</b></td>
            <td>${student.stu_roll}</td>
          </tr>
          <tr>
            <td  class="pe-3"><b>Registration No.</b></td>
            <td>${student.stu_reg}</td>
          </tr>
          <tr>
            <td  class="pe-3"><b>Result</b></td>
            <td  class="cursive">${finalResult.grade == 'F' ? 'FAIL': 'PASS'}</td>
          </tr>
          <tr>
            <td  class="pe-3"><b>GPA</b></td>
            <td>${finalResult.finalgpa}</td>
          </tr>
          <tr>
            <td  class="pe-3"><b>Grade</b></td>
            <td>${finalResult.grade}</td>
          </tr>
        </tbody>
      </table>
  
        <h3 class="text-center">Garde Sheet</h3>
        <table class="table table-sm stu-mark table-striped table-bordered">
          <tr class="table-info">
            <td>SL No</td>
            <td>Subject</td>
            <td>Marks</td>
            <td>GPA</td>
            <td>Grade</td>
            <td>GPA <small>(with additional sub)</small></td>
            <td>GPA</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Bangla</td>
            <td  class="text-center">${student.result.bangla}</td>
            <td  class="text-center">${getGPAGrade(student.result.bangla).gpa}</td>
            <td  class="text-center">${getGPAGrade(student.result.bangla).grade}</td>
            <td class="text-center" rowspan="6">${
              calculateGPAGrade(totalGPAWithoutAdditional, 6).finalgpa
            }</td>
            <td  class="text-center" rowspan="6">${finalResult.finalgpa}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>English</td>
            <td  class="text-center">${student.result.english}</td>
            <td  class="text-center">${getGPAGrade(student.result.english).gpa}</td>
            <td  class="text-center">${getGPAGrade(student.result.english).grade}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Math</td>
            <td  class="text-center">${student.result.math}</td>
            <td  class="text-center">${getGPAGrade(student.result.math).gpa}</td>
            <td  class="text-center">${getGPAGrade(student.result.math).grade}</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Science</td>
            <td  class="text-center">${student.result.science}</td>
            <td  class="text-center">${getGPAGrade(student.result.science).gpa}</td>
            <td  class="text-center">${getGPAGrade(student.result.science).grade}</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Social Science</td>
            <td  class="text-center">${student.result.social_science}</td>
            <td  class="text-center">${getGPAGrade(student.result.social_science).gpa}</td>
            <td  class="text-center">${getGPAGrade(student.result.social_science).grade}</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Religion</td>
            <td  class="text-center">${student.result.religion}</td>
            <td  class="text-center">${getGPAGrade(student.result.religion).gpa}</td>
            <td  class="text-center">${getGPAGrade(student.result.religion).grade}</td>
          </tr>
        </table>`;

    }else{
      // hide searchform
      searchFormSection.style.display = "none";
      preloader.style.width = "98vw";
      preloader.style.height = "85vh";
      preloader.style.opacity = "1";

      // show result
      const resTimeout = setTimeout(() => {
        preloader.style.width = "0";
        preloader.style.height = "0";
        preloader.style.opacity = "0";
        resultSection.style.display = "block";
      }, 2000);
      resultSection.querySelector('.title').innerHTML = `Result Not Found!`
      resultSection.querySelector(
        ".result"
      ).innerHTML = 'Please search with correct roll and registration';
    }
  }
};
