document.getElementById('openMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '250px';
});
document.getElementById('closeMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '0';
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
            if (data.firstName) {
                document.getElementById('customer-name').innerText = data.firstName;
            } else {
                console.error('User name not found');
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
    } 
    else {
        console.error('User token not found');
    }
}

getUserData(userToken);



