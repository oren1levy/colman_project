
// const apiUrl = 'http://localhost:3000'; 
// const userToken = localStorage.getItem('userToken'); 

// document.addEventListener('DOMContentLoaded', function() {
//     // שליחת בקשה לשרת לקבלת פרטי המשתמש
//     fetch(`${apiUrl}/api/users/searchUser`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${userToken}`
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(userData => {
//         console.log('User Data:', userData); // הוספת לוג לבדיקה

//         // מילוי השדות עם הנתונים מהשרת
//         if (document.getElementById('firstName')) {
//             document.getElementById('firstName').value = userData.firstName || '';
//         }
//         if (document.getElementById('lastName')) {
//             document.getElementById('lastName').value = userData.lastName || '';
//         }
//         if (document.getElementById('birthday')) {
//             document.getElementById('birthday').value = userData.birthday || '';
//         }
//         if (document.getElementById('email')) {
//             document.getElementById('email').value = userData.email || '';
//         }
//         if (document.getElementById('phone')) {
//             document.getElementById('phone').value = userData.phone || '';
//         }
//     })
//     .catch(error => {
//         console.error('Error fetching user data:', error);
//         if (document.getElementById('updateStatus')) {
//             document.getElementById('updateStatus').innerText = `שגיאה: ${error.message}`;
//         }
//     });

//     // מאזין לאירוע submit של הטופס
//     document.getElementById('editUserForm').addEventListener('submit', function(event) {
//         event.preventDefault();

//         const updatedFields = {
//             firstName: document.getElementById('firstName') ? document.getElementById('firstName').value : '',
//             lastName: document.getElementById('lastName') ? document.getElementById('lastName').value : '',
//             birthday: document.getElementById('birthday') ? document.getElementById('birthday').value : '',
//             email: document.getElementById('email') ? document.getElementById('email').value : '',
//             phone: document.getElementById('phone') ? document.getElementById('phone').value : '',
//             password: document.getElementById('password') ? document.getElementById('password').value : ''
//         };

//         fetch(`${apiUrl}/api/users/update`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${userToken}`
//             },
//             body: JSON.stringify(updatedFields)
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(updatedUser => {
//             if (document.getElementById('updateStatus')) {
//                 document.getElementById('updateStatus').innerText = 'פרטי המשתמש עודכנו בהצלחה!';
//             }
//         })
//         .catch(error => {
//             console.error('Error updating user data:', error);
//             if (document.getElementById('updateStatus')) {
//                 document.getElementById('updateStatus').innerText = `שגיאה: ${error.message}`;
//             }
//         });
//     });
// });

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
            document.getElementById('birthday').value = data.birthday ;
            document.getElementById('email').value = data.email;
            document.getElementById('phone').value = data.phone;
        })
        .catch(error => console.error('Error fetching user data:', error));
    } 
    else {
        console.error('User token not found');
    }
}

getUserData(userToken);