document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('logo').addEventListener('click', function() {
        window.location.href = '../html.page/home.html';
    });
     
    let images = [];

    function getAllProducts() {
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };
    
        fetch("http://localhost:3000/api/products/getAllProducts", requestOptions)
            .then(response => response.json())
            .then(result => {
                images = result.map(product => `http://localhost:3000/${product.img}`);
                initializeImageSwitcher();
            })
            .catch(error => console.error('Error:', error));
    }
        getAllProducts();
    
    let switchInterval;
    let currentIndex = 0;
    const imageContainer = document.querySelector('.thumbnail-container');
    
    function switchImage() {
        if (imageContainer && images.length > 0) {
            console.log('Switching to image:', images[currentIndex]); 
            imageContainer.style.backgroundImage = `url(${images[currentIndex]})`;
            currentIndex = (currentIndex + 1) % images.length;
        } else {
            console.log('Image container or images array is not available.');
        }
    }
    
    
    function initializeImageSwitcher() {
        if (document.hidden) {
            clearInterval(switchInterval);
        } else {
            switchInterval = setInterval(switchImage, 1500);
            switchImage();
        }
    }
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(switchInterval);
        } else {
            initializeImageSwitcher();
        }
    });

    const userToken = localStorage.getItem('userToken'); 

    const passwordInput = document.getElementById("password");
    const togglePasswordIcon = document.querySelector(".bi-eye");

    function togglePasswordVisibility() {
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
    document.getElementById('toggle-pass').addEventListener('click', togglePasswordVisibility);


    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');

    firstName.addEventListener("input",function(event){
        const box = document.getElementsByClassName('box')[0];
        const fN = firstName.value;
        if (validateName(fN)) {
            box.style.borderBottom = '1px solid green'; 
        } else {
            box.style.borderBottom = '1px solid red'; 
        }
    })
    lastName.addEventListener("input",function(event){
        const box = document.getElementsByClassName('box')[1];
        const lN = lastName.value;
        if (validateName(lN)) {
            box.style.borderBottom = '1px solid green'; 
        } else {
            box.style.borderBottom = '1px solid red'; 
        }
    })

    function validateName(name) {
        const nameregex = /^[a-zA-Z\u0590-\u05FF]+$/;
        if(!nameregex.test(name)) {
            return false;
        }
        return true;
    }

    const phonenumber = document.getElementById('phone')

    phonenumber.addEventListener("input",function(event){
        const box = document.getElementsByClassName('box')[2];
        const pN = phonenumber.value;
        if (validatePhoneNumber(pN)) {
            box.style.borderBottom = '1px solid green'; 
        } else {
            box.style.borderBottom = '1px solid red'; 
        }
    })
    function validatePhoneNumber(phonenumber) {
        const phonenumberregex = /^\d{10}$/;
        if(!phonenumberregex.test(phonenumber)) {
            return false;
        }
        return true;
    }

    const password = document.getElementById('password')

    password.addEventListener("input",function(event){
        const box = document.getElementsByClassName('box')[3];
        const pass = password.value;
        if (validatePassword(pass)) {
            box.style.borderBottom = '1px solid green'; 
        } else {
            box.style.borderBottom = '1px solid red'; 
        }
    })
    function validatePassword(password) {
        const regex = /^[a-zA-Z0-9]{9,15}$/;
        ;
        return regex.test(password);
    }

    function getUserData(userToken){
        if (userToken) {
            fetch(`http://localhost:3000/api/users/searchUser/${userToken}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                const date = new Date(data.birthday);
                const formattedDate = date.toISOString().split('T')[0];
                document.getElementById('birthday').value = formattedDate;
                document.getElementById('email').value = data.email;
                document.getElementById('firstName').value = data.firstName;
                document.getElementById('lastName').value = data.lastName;
                document.getElementById('phone').value = data.phone;
            })
            .catch(error => console.error('Error fetching user data:', error));
        } 
        else {
            console.error('User token not found');
        }
    }

    getUserData(userToken);

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

        const firstNameValue = document.getElementById('firstName').value;
        const lastNameValue = document.getElementById('lastName').value;
        const birthDateValue = document.getElementById('birthday').value;
        const emailValue = document.getElementById('email').value;
        const phoneValue = document.getElementById('phone').value;
        const passwordValue = document.getElementById('password').value;

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
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`http://localhost:3000/api/users/updateUser/${userToken}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                console.log(result);
                alert('User details updated successfully');
                window.location.href = "home.html";
            })
            .catch(error => {
                console.error('Error updating user data:', error);
                alert('Error updating user data');
            });
        
   }});

});
