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
                console.log(result)
                localStorage.setItem("userToken",result.email);
                window.location.href = "home.html";
            })
            .catch(error => console.error('Error:', error));
    });

});


