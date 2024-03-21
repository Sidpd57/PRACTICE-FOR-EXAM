const form = document.querySelector('.form');
const tbody = document.getElementById('tbody');
const createForm = document.getElementById('create-form');
const submitBtn = document.getElementById('submit-btn');
const closeBtn = document.getElementById('close-btn');
const educationalTableBody = document.getElementById('educational-table-body');

// form info
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const dateOfBirth= document.getElementById('dateOfBirth');
const graduationYear = document.getElementById('graduationYear');
const address = document.getElementById('Address');
const email = document.getElementById('email');

// form errormsg
const firstNameError = document.getElementById('firstNameError');
const dateOfBirthError = document.getElementById('dateOfBirthError');
const graduationYearError = document.getElementById('graduationYearError');
const addressError = document.getElementById('AddressError');
const emailError = document.getElementById('emailError');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    formValidation();
})

createForm.addEventListener('click', ()=>{
    submitBtn.setAttribute('data-action','add');
    form.reset();
    defaultRow();
})

const formValidation = () => {

    let isValid = true;
    let currentYear = new Date().getFullYear();
    let dobYear = new Date(dateOfBirth).getFullYear();
    let gradYear = new Date(graduationYear.value).getFullYear();
    let emailRegex = /[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    // firstName validation 
    if(firstName.value.trim()==='') {
        isValid = false;
        firstNameError.innerHTML="first Name can't be empty!";
        firstName.classList.add('is-invalid') ;
    }

    if(gradYear>currentYear) {
        isValid = false;
        graduationYearError.innerHTML="Must be before current Year!";
        graduationYear.classList.add('is-invalid') ;
    }

    if(currentYear-dobYear<18) {
        isValid = false;
        dateOfBirthError.innerHTML="Min age should be 18!";
        dateOfBirth.classList.add('is-invalid') ;
    }

    // if(!emailRegex.test(email)) {
    //     isValid = false;
    //     emailError.innerHTML="Enter a valid email!";
        // email.classList.add('is-invalid') ;
    // }

    if(address.value.trim()==='') {
        isValid = false;
        addressError.innerHTML="Address can't be empty!";
        address.classList.add('is-invalid') ;
    }

    if(isValid) {
        console.log('inside form validation')
        console.log(submitBtn.getAttribute('data-action'));
        if(submitBtn.getAttribute('data-action')==='update'){
            updateUserToList();
        }else{
            createUser();
        }
        closeBtn.click();
        resetErrorInputs();
        form.reset();

    }
}

const resetErrorInputs = () => {
    firstNameError.innerHTML="";
    firstName.classList.remove('is-invalid');
    graduationYearError.innerHTML="";
    graduationYear.classList.remove('is-invalid');
    dateOfBirthError.innerHTML="";
    dateOfBirth.classList.remove('is-invalid');
    addressError.innerHTML="";
    address.classList.remove('is-invalid');
}

let users = [];
const createUser = () => {
    let educations = [];
    let rows = document.querySelectorAll('#educational-table-body tr');
    for(const row of rows){
        let education = {
            university: row.querySelector('.university').value,
            degree: row.querySelector('.degree').value,
            startDate: row.querySelector('.start-date').value,
            passoutYear: row.querySelector('.passout-year').value,
            grade: row.querySelector('.grade').value,
            backlog: row.querySelector('.backlog').value,
        }
        educations.push(education);
    }

    let user = {
        firstName: firstName.value,
        lastName: lastName.value,
        dateOfBirth: dateOfBirth.value,
        graduationYear: graduationYear.value,
        address: address.value,
        email: email.value,
        educations: educations
    }
    users.push(user);
    // render users 
    renderUsers();
}

const renderUsers= () => {
    tbody.innerHTML= users.map((element, index)=> {
        let {firstName,lastName, dateOfBirth, address, email} = element;
        return`<tr>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${dateOfBirth}</td>
            <td>${email}</td>
            <td>${address}</td>
            <td><button class="btn btn-outline-primary" onclick="readUser(${index})"><i class="fa-solid fa-eye fa-xl"></i></button></td>
            <td><button class="btn btn-outline-primary" onclick="updateUser(${index})"><i class="fa-solid fa-pen-to-square fa-xl"></i></button></td>
            <td><button class="btn btn-outline-primary" onclick="deleteUser(${index})"><i class="fa-solid fa-trash-can fa-xl"></i></button></td>
        </tr>
        `
    }).join('');
}

const updateUser = (index) => {

    let currentuser = users[index];
    createForm.click()

    firstName.value = currentuser.firstName;
    lastName.value = currentuser.lastName;
    dateOfBirth.value = currentuser.dateOfBirth;
    graduationYear.value = currentuser.graduationYear;
    address.value = currentuser.address;
    email.value = currentuser.email;
    let educations = currentuser.educations;

    educationalTableBody.innerHTML='';
    educationalTableBody.innerHTML= educations.map((education, index)=>{
        let { university, degree, startDate, passoutYear, backlog, grade} = education;
        let disabledProperty = index < 2?'disabled':'';
        return `
        <tr>
            <td>
                <div class="mb-3">
                    <input type="text" class="form-control university" placeholder="GTU" autocomplete="on" value="${university}">
                    <div class="text-danger text-start universityError"></div>
                </div>
            </td>
            <td>
                <div class="mb-3">
                    <input type="text" class="form-control degree" placeholder="CPI" autocomplete="on" value="${degree}">
                    <div class="text-danger text-start degreeError"></div>
                </div>
            </td>
            <td>
                <div class="mb-3">
                    <input type="date" class="form-control start-date" autocomplete="on" value="${startDate}">
                    <div class="text-danger text-start start-date-Error"></div>
                </div>
            </td>
            <td>
                <div class="mb-3">
                    <input type="date" class="form-control passout-year" autocomplete="on"value="${passoutYear}">
                    <div class="text-danger text-start passout-year-Error"></div>
                </div>
            </td>
            <td>
                <div class="mb-3">
                    <input type="number" class="form-control grade" autocomplete="on" min="45" max="100" step="0.01" value="${grade}">
                    <div class="text-danger text-start grade-Error"></div>
                </div>
            </td>
            <td>
                <div class="mb-3">
                    <input type="number" class="form-control backlog" autocomplete="on" min="0" max="10" value="${backlog}">
                    <div class="text-danger text-start backlog-Error"></div>
                </div>
            </td>
            <td><button type="button" class="btn btn-outline-danger" ${disabledProperty} onclick="removeEducationRow(this)"><i class="fa-solid fa-minus fa-xl"></i></button></td>
        </tr>
        `
    }).join('');

    submitBtn.setAttribute('data-action','update');
    submitBtn.setAttribute('data-user-index',index);
}

const updateUserToList = () => {
    console.log('inside updatedUserToList')
    let index = submitBtn.getAttribute('data-user-index');
    if(index!=-1){
        let educations = [];
        let rows = document.querySelectorAll('#educational-table-body tr');
        for(const row of rows){
            let education = {
                university: row.querySelector('.university').value,
                degree: row.querySelector('.degree').value,
                startDate: row.querySelector('.start-date').value,
                passoutYear: row.querySelector('.passout-year').value,
                grade: row.querySelector('.grade').value,
                backlog: row.querySelector('.backlog').value,
            }
            educations.push(education);
        }

        let currentUser = {
            firstName: firstName.value,
            lastName: lastName.value,
            dateOfBirth: dateOfBirth.value,
            graduationYear: graduationYear.value,
            address: address.value,
            email: email.value,
            educations: educations
        }
        users[index] = currentUser;
        alert('user updated!');
    }
    // render users 
    renderUsers();
}

const deleteUser = (index) => {
    const result = confirm('Are you sure?');
    if(result) {
        users.splice(index,1);
        // render users 
        renderUsers();
    }
    
}

const addEducationRow = () => {
    const educationalTableBody = document.getElementById('educational-table-body');
    const newRow = `
    <tr>
        <td>
            <div class="mb-3">
                <input type="text" class="form-control university" placeholder="GTU" autocomplete="on">
                <div class="text-danger text-start universityError"></div>
            </div>
        </td>
        <td>
            <div class="mb-3">
                <input type="text" class="form-control degree" placeholder="CPI" autocomplete="on">
                <div class="text-danger text-start degreeError"></div>
            </div>
        </td>
        <td>
            <div class="mb-3">
                <input type="date" class="form-control start-date" autocomplete="on">
                <div class="text-danger text-start start-date-Error"></div>
            </div>
        </td>
        <td>
            <div class="mb-3">
                <input type="date" class="form-control passout-year" autocomplete="on">
                <div class="text-danger text-start passout-year-Error"></div>
            </div>
        </td>
        <td>
            <div class="mb-3">
                <input type="number" class="form-control grade" autocomplete="on" min="45" max="100" step="0.01">
                <div class="text-danger text-start grade-Error"></div>
            </div>
        </td>
        <td>
            <div class="mb-3">
                <input type="number" class="form-control backlog" autocomplete="on" min="0" max="10">
                <div class="text-danger text-start backlog-Error"></div>
            </div>
        </td>
        <td><button type="button" class="btn btn-outline-danger" onclick="removeEducationRow(this)"><i class="fa-solid fa-minus fa-xl"></i></button></td>
    </tr>
    `
    educationalTableBody.insertAdjacentHTML('beforeend', newRow);
}

const removeEducationRow = (button)=> {
    const row = button.closest('tr');
    row.remove();
}

const defaultRow = () => {
    educationalTableBody.innerHTML='';
    educationalTableBody.innerHTML=`<tr>
    <td>
        <div class="mb-3">
            <input type="text" class="form-control university" placeholder="GTU" autocomplete="on">
            <div class="text-danger text-start universityError"></div>
        </div>
    </td>
    <td>
        <div class="mb-3">
            <input type="text" class="form-control degree" placeholder="CPI" autocomplete="on">
            <div class="text-danger text-start degreeError"></div>
        </div>
    </td>
    <td>
        <div class="mb-3">
            <input type="date" class="form-control start-date" autocomplete="on">
            <div class="text-danger text-start start-date-Error"></div>
        </div>
    </td>
    <td>
        <div class="mb-3">
            <input type="date" class="form-control passout-year"autocomplete="on">
            <div class="text-danger text-start passout-year-Error"></div>
        </div>
    </td>
    <td>
        <div class="mb-3">
            <input type="number" class="form-control grade" autocomplete="on" min="45" max="100" step="0.01">
            <div class="text-danger text-start grade-Error"></div>
        </div>
    </td>
    <td>
        <div class="mb-3">
            <input type="number" class="form-control backlog" autocomplete="on" min="0" max="10">
            <div class="text-danger text-start backlog-Error"></div>
        </div>
    </td>
    <td><button type="button" class="btn btn-outline-danger" disabled><i class="fa-solid fa-minus fa-xl"></i></button></td>
</tr>
<tr>
    <td>
        <div class="mb-3">
            <input type="text" class="form-control university" placeholder="GTU" autocomplete="on">
            <div class="text-danger text-start universityError"></div>
        </div>
    </td>
    <td>
        <div class="mb-3">
            <input type="text" class="form-control degree" placeholder="CPI" autocomplete="on">
            <div class="text-danger text-start degreeError"></div>
        </div>
    </td>
    <td>
        <div class="mb-3">
            <input type="date" class="form-control start-date" autocomplete="on">
            <div class="text-danger text-start start-date-Error"></div>
        </div>
    </td>
    <td>
        <div class="mb-3">
            <input type="date" class="form-control passout-year" autocomplete="on">
            <div class="text-danger text-start passout-year-Error"></div>
        </div>
    </td>
    <td>
        <div class="mb-3">
            <input type="number" class="form-control grade" autocomplete="on" min="45" max="100" step="0.01">
            <div class="text-danger text-start grade-Error"></div>
        </div>
    </td>
    <td>
        <div class="mb-3">
            <input type="number" class="form-control backlog" autocomplete="on" min="0" max="10">
            <div class="text-danger text-start backlog-Error"></div>
        </div>
    </td>
    <td><button type="button" class="btn btn-outline-danger" disabled><i class="fa-solid fa-minus fa-xl"></i></button></td>
    </tr>`;
}

