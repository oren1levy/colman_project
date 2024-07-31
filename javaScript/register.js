const onlyLettersRegex = /^[A-Za-z]+$/;
const onlyBigLetters = /[A-Z]+/;

const firstName = document.getElementById('input_firstName');

firstName.addEventListener("input",function(event){
    const box = document.getElementsByClassName('box')[0];
    const name = firstName.value;
    if(name && onlyLettersRegex.test(name) && name.length < 10){
        box.style.borderBottom = '1px solid green'; 
        document.getElementsByClassName('bi-check-circle')[0].style.display = 'block';
    }
    else{
        box.style.borderBottom = '1px solid red'; 
        document.getElementsByClassName('bi-check-circle')[0].style.display = 'none';
    }
})

const lastName = document.getElementById('input_lastName');

lastName.addEventListener("input",function(event){
    const box = document.getElementsByClassName('box')[1];
    const last = lastName.value;
    if(last && onlyLettersRegex.test(last) && last.length < 10){
        box.style.borderBottom = '1px solid green'; 
        document.getElementsByClassName('bi-check-circle')[1].style.display = 'block';
    }
    else{
        box.style.borderBottom = '1px solid red'; 
        document.getElementsByClassName('bi-check-circle')[1].style.display = 'none';
    }
})

$(function() {
    $("#datepicker").datepicker({
        onSelect: function(dateText) {
            const box = document.getElementsByClassName('box')[2];
            if(dateText){
                box.style.borderBottom = '1px solid green'; 
                document.getElementsByClassName('bi-check-circle')[2].style.display = 'block';
            }
            else{
                box.style.borderBottom = '1px solid red'; 
                document.getElementsByClassName('bi-check-circle')[2].style.display = 'none';
            }
        }
    });
})


function validateEmail(email) {
    const emailRegex1 = /^[^\s@]+@gmail\.com$/;
    const emailRegex2 = /^[^\s@]+@yahoo\.com$/;
    const emailRegex3 = /^[^\s@]+@walla\.com$/;
    const emailRegex4 = /^[^\s@]+@colman\.ac.il$/;
    if (!emailRegex1.test(email) && !emailRegex2.test(email) && !emailRegex3.test(email) && !emailRegex4.test(email)) {
        return false; 
    }
    return true; 
}

const email = document.getElementById('input_email');

email.addEventListener("input",function(event){
    const box = document.getElementsByClassName('box')[3];
    const em = email.value;
    if (validateEmail(em)) {
        box.style.borderBottom = '1px solid green'; 
        document.getElementsByClassName('bi-check-circle')[3].style.display = 'block';
    } else {
        box.style.borderBottom = '1px solid red'; 
        document.getElementsByClassName('bi-check-circle')[3].style.display = 'none';
    }
})

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^(05)\d{8}$/; 
    if (!phoneRegex.test(phoneNumber)) {
        return false; 
    }
    return true; 
}

const phoneNumber = document.getElementById('input_phone');

phoneNumber.addEventListener("input",function(event){
    const box = document.getElementsByClassName('box')[4];
    const phone = phoneNumber.value;
    if (validatePhoneNumber(phone)) {
        box.style.borderBottom = '1px solid green'; 
        document.getElementsByClassName('bi-check-circle')[4].style.display = 'block';
    } else {
        box.style.borderBottom = '1px solid red'; 
        document.getElementsByClassName('bi-check-circle')[4].style.display = 'none';
    }
})

const passwordInput = document.getElementById("input_password");

passwordInput.addEventListener("input",function(event){
    const password = passwordInput.value;
    const box = document.getElementsByClassName('box')[5];
    if(password.length > 8 && password.length < 16){
        box.style.borderBottom = '1px solid green'; 
        document.getElementsByClassName('bi-check-circle')[5].style.display = 'block';
    }
    else{
        box.style.borderBottom = '1px solid red'; 
        document.getElementsByClassName('bi-check-circle')[5].style.display = 'none';
    }
})

function togglePasswordVisibility(){
    const togglePasswordIcon = document.querySelector("bi-eye");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordIcon.classList.remove("fa-eye-slash");
        togglePasswordIcon.classList.add("fa-eye");
    } else {
        passwordInput.type = "password";
        togglePasswordIcon.classList.remove("fa-eye");
        togglePasswordIcon.classList.add("fa-eye-slash");
    }
}

const passwordCInput = document.getElementById("input_Cun_password");

function togglePasswordVisibility2(){
    const togglePasswordIcon2 = document.querySelector("bi-eye2");

    if (passwordCInput.type === "password") {
        passwordCInput.type = "text";
        togglePasswordIcon2.classList.remove("fa-eye-slash");
        togglePasswordIcon2.classList.add("fa-eye");
    } else {
        passwordCInput.type = "password";
        togglePasswordIcon2.classList.remove("fa-eye");
        togglePasswordIcon2.classList.add("fa-eye-slash");
    }
}

passwordCInput.addEventListener("input",function(event){
    const password = passwordInput.value;
    const box = document.getElementsByClassName('box')[6];
    const passwordC = passwordCInput.value;
    if(password === passwordC){
        box.style.borderBottom = '1px solid green';
        document.getElementsByClassName('bi-check-circle')[6].style.display = 'block'; 
    }
    else{
        box.style.borderBottom = '1px solid red'; 
        document.getElementsByClassName('bi-check-circle')[6].style.display = 'none';
    }
})

const btn_submit = document.getElementById('btn_submit');

        btn_submit.addEventListener("click", function(event) {
            event.preventDefault();

            const boxes = document.getElementsByClassName('box');
            let allFieldsValid = true;
            for (const box of boxes) {
                if (box.style.borderBottom !== '1px solid green') {
                    allFieldsValid = false;
                    break;
                }
            }

            if (!allFieldsValid) {
                alert('You did not fill in all the fields correctly');
            } else {
                const firstNameValue = firstName.value;
                const lastNameValue = lastName.value;
                const birthDateValue = $("#datepicker").val();
                const emailValue = email.value;
                const phoneValue = phoneNumber.value;
                const passwordValue = passwordInput.value;

                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({
                    "firstName": firstNameValue,
                    "lastName": lastNameValue,
                    "birthday": birthDateValue,
                    "email": emailValue,
                    "phone": phoneValue,
                    "password": passwordValue
                });

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };

                fetch("http://localhost:3000/api/users/register", requestOptions)
                    .then((response) => response.text())
                    .then((result) => {
                        console.log(result)
                        window.location.href = "login.html";
                    })
                    .catch((error) => console.error(error));

                alert('Success');
            }
        });