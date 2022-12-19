const teamSelection = document.getElementById('teams');
const positionsSelection = document.getElementById('positions');
const nextBtnSubmit = document.getElementById('nextBtn');

let teamSelectionVal;
let teamSelectionId;
let positionId;

const geoLetterRegex = /^[ა-ჰ]+$/;
const EmailRegex = /^[a-zA-Z0-9+_.-]+@redberry.ge$/;
const phoneRegex = /^[+]9955[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}$/;

let formValidation;
let firstName, lastName, teams, position, email, phone;

//get Fetch position Id
positionsSelection.addEventListener('change', () => {
  fetch('https://pcfy.redberryinternship.ge/api/positions')
    .then(response => response.json())
    .then(posId => {
      posId = Object.entries(posId)[0][1];
      for (let i = 0; i < posId.length; i++) {
        if (posId[i].name.replaceAll(' ', ',') == positionsSelection.value) {
          positionId = posId[i].id;
          //console.log(positionId);
        }
      }
    });
});

fetch('https://pcfy.redberryinternship.ge/api/teams')
  .then(response => response.json())
  .then(teamsDate => {
    teamsDate = Object.entries(teamsDate)[0][1];

    teamsDate.forEach((team, index) => {
      document.getElementById('teams').innerHTML += `
      <option value=${team.name} id=${index}> ${team.name}</option>`;

      fetch('https://pcfy.redberryinternship.ge/api/positions')
        .then(response => response.json())
        .then(positions => {
          positions = Object.entries(positions)[0][1];

          teamSelection.addEventListener('change', () => {
            teamSelectionVal = document.getElementById('teams').value;

            if (teamSelection.value === team.name) {
              positions.forEach(job => {
                if (job.team_id === team.id) {
                  positionsSelection.innerHTML +=
                    '<option value=' +
                    job.name.replace(/\s+/g, ',') +
                    '>' +
                    job.name +
                    '</option>';
                }
              });
            }
          });
        });
    });
  });

nextBtn.addEventListener('click', () => {
  employeeValidation();
});

// fucntions
function emplErrorValShow(divId, inputId) {
  document.getElementById(divId).style.color = 'red';
  document.getElementById(inputId).style.border = '1.8px solid red';
}

function emplErrorValHide(divId, inputId) {
  document.getElementById(divId).style.color = 'black';
  document.getElementById(inputId).style.border = '1.8px solid #8ac0e2';
}

function employeeValidation() {
  formValidation = true;
  firstName = document.getElementById('firstName').value;
  lastName = document.getElementById('lastName').value;
  position = document.getElementById('positions').value;
  teams = document.getElementById('teams').value;
  position = document.getElementById('positions').value;
  email = document.getElementById('email').value;
  phone = document.getElementById('phone').value;

  //firsName validation
  if (geoLetterRegex.test(firstName) && firstName.length > 2) {
    emplErrorValHide('name-input', 'firstName');
  } else {
    emplErrorValShow('name-input', 'firstName');
    document.getElementById('firstNameError').innerText =
      'გამოიყენე ქართული ასოები';
    formValidation = false;
  }
  //lastName validation
  if (geoLetterRegex.test(lastName) && lastName.length > 2) {
    emplErrorValHide('surname-input', 'lastName');
  } else {
    emplErrorValShow('surname-input', 'lastName');
    document.getElementById('lastNameError').innerText =
      'გამოიყენე ქართული ასოები';
    formValidation = false;
  }
  //team validation
  if (teamSelectionVal === undefined) {
    document.getElementById('teams').style.border = '1.8px solid red';
    formValidation = false;
  } else {
    teams == 'დეველოპერი' ? (teamSelectionId = 1) : null;
    teams == 'HR' ? (teamSelectionId = 2) : null;
    teams == 'გაყიდვები' ? (teamSelectionId = 3) : null;
    teams == 'დიზაინი' ? (teamSelectionId = 4) : null;
    teams == 'მარკეტინგი' ? (teamSelectionId = 5) : null;

    document.getElementById('teams').style.border = '1.8px solid #8ac0e2';
  }
  //position validation
  if (positionsSelection.value == 'პოზიცია') {
    document.getElementById('positions').style.border = '1.8px solid red';
    formValidation = false;
  } else {
    document.getElementById('positions').style.border = '1.8px solid #8ac0e2';
  }
  //email validation
  if (EmailRegex.test(email)) {
    document.getElementById('employee-email-input').style.color = 'black';
    document.getElementById('email').style.border = '1.8px solid #8ac0e2';
  } else {
    document.getElementById('employee-email-input').style.color = 'red';
    document.getElementById('email').style.border = '1.8px solid red';
    formValidation = false;
  }
  //phone validation
  if (phoneRegex.test(phone)) {
    document.getElementById('employee-phone-input').style.color = 'black';
    document.getElementById('phone').style.border = '1.8px solid #8ac0e2';
  } else {
    document.getElementById('employee-phone-input').style.color = 'red';
    document.getElementById('phone').style.border = '1.8px solid red';
    formValidation = false;
  }

  if (formValidation) {
    window.localStorage.setItem(
      'employee-info',
      JSON.stringify({
        name: firstName,
        lastname: lastName,
        team_id: teamSelectionId,
        position_id: positionId,
        phone_number: phone,
        email: email,
        token: 'a086b96f603f0accef75ef5bef8cf938'
      })
    );
    window.location.href = './laptop-information.html';
  }
}
