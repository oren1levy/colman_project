// document.addEventListener('DOMContentLoaded', function() {
//     const passwordInput = document.getElementById("input_password");
//     const togglePasswordIcon = document.querySelector(".bi-eye");

//     function togglePasswordVisibility() {
//         if (passwordInput.type === "password") {
//             passwordInput.type = "text";
//             togglePasswordIcon.classList.remove("fa-eye-slash");
//             togglePasswordIcon.classList.add("fa-eye");
//         } else {
//             passwordInput.type = "password";
//             togglePasswordIcon.classList.remove("fa-eye");
//             togglePasswordIcon.classList.add("fa-eye-slash");
//         }
//     }
//     document.getElementById('toggle-pass').addEventListener('click', togglePasswordVisibility);

//     document.getElementById('login_form').addEventListener('submit', function(event) {
//         event.preventDefault();

//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         const email = document.getElementById("input_email").value;
//         const password = passwordInput.value;

//         const raw = JSON.stringify({
//             email: email,
//             password: password
//         });

//         const requestOptions = {
//             method: "POST",
//             headers: myHeaders,
//             body: raw,
//             redirect: "follow"
//         };

//         fetch("http://localhost:3000/api/users/login", requestOptions)
//             .then(response => response.json()) 
//             .then(result => {
//                 console.log(result)
//                 if (result.message == 'Invalid password'){
//                     alert("the email or the password is incorrect");
//                 }
//                 else{
//                     localStorage.setItem("userToken",result._id); 
//                     window.location.href = "home.html";
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     });

// });


document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById("input_password");
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

    document.getElementById('login_form').addEventListener('submit', function(event) {
        event.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const email = document.getElementById("input_email").value;
        const password = passwordInput.value;

        const raw = JSON.stringify({
            email: email,
            password: password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:3000/api/users/login", requestOptions)
            .then(response => response.json()) 
            .then(result => {
                console.log(result);
                if (result.message === 'Invalid email') {
                    alert("wrong email.");
                } else if (result.message === 'Invalid password') {
                    alert("wrong password. please try again.");
                } else {
                    localStorage.setItem("userToken", result._id); 
                    window.location.href = "home.html";
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("An error occurred while trying to log in. Please try again later");
            });
    });
});






