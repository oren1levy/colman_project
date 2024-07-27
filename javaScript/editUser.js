document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('logo').addEventListener('click', function() {
        window.location.href = '../html.page/home.html';
    });
    
    const userToken = localStorage.getItem('userToken'); 

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
                document.getElementById('firstName').value = data.firstName ;
                document.getElementById('lastName').value = data.lastName ;
                const date = new Date(data.birthday);
                const formattedDate = date.toISOString().split('T')[0];
                document.getElementById('birthday').value = formattedDate;
                document.getElementById('email').value = data.email;
                document.getElementById('phone').value = data.phone;
                document.getElementById('password').value = data.password;
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
            })
            .catch(error => {
                console.error('Error updating user data:', error);
                alert('Error updating user data');
            });
    });
});


