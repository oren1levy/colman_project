
(function() {
    async function loadSideMenu() {
        try {
            document.getElementById('openMenu').addEventListener('click', function() {
                document.getElementById('sideMenu').style.width = '250px';
            });
            document.getElementById('closeMenu').addEventListener('click', function() {
                document.getElementById('sideMenu').style.width = '0';
            });

            const userToken = localStorage.getItem('userToken');

            if (userToken) {
                const response = await fetch(`http://localhost:3000/api/users/searchUser/${userToken}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                document.getElementById('welcome-message').innerText = `!,ברוך הבא לאתר ${data.firstName} היי`;
                document.getElementById('login-link').style.display = 'none';
                document.getElementById('register-link').style.display = 'none';

                if (!document.getElementById('edit-user-link')) {
                    const editUserLink = document.createElement('a');
                    editUserLink.href = '../html.page/editUser.html';
                    editUserLink.textContent = 'עריכת משתמש';
                    editUserLink.id = 'edit-user-link';
                    document.getElementById('sideMenu').appendChild(editUserLink);
                }

                if (!document.getElementById('purchase-history-link')) {
                    const purchaseHistoryLink = document.createElement('a');
                    purchaseHistoryLink.href = '../html.page/purchaseHistory.html';
                    purchaseHistoryLink.textContent = 'היסטורית רכישות';
                    purchaseHistoryLink.id = 'purchase-history-link';
                    document.getElementById('sideMenu').appendChild(purchaseHistoryLink);
                }

                if (!document.getElementById('logout-link')) {
                    const logoutLink = document.createElement('a');
                    logoutLink.href = '#';
                    logoutLink.textContent = 'התנתקות';
                    logoutLink.id = 'logout-link';
                    document.getElementById('sideMenu').appendChild(logoutLink);

                    logoutLink.addEventListener('click', function(event) {
                        event.preventDefault();
                        localStorage.removeItem('userToken'); 
                        window.location.href = '../html.page/home.html';  
                    });
                }
                
            } else {
                console.error('User token not found');
            }
        } catch (error) {
            console.error('Error loading side menu:', error);
        }
    }

    document.addEventListener('DOMContentLoaded', loadSideMenu);
    window.loadSideMenu = loadSideMenu;
})();
