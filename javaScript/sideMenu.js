
(function() {
    const apiUrl = 'http://localhost:3000';
    const userToken = localStorage.getItem('userToken');

    async function loadSideMenu() {
        try {
            document.getElementById('openMenu').addEventListener('click', function() {
                document.getElementById('sideMenu').style.width = '250px';
            });
            document.getElementById('closeMenu').addEventListener('click', function() {
                document.getElementById('sideMenu').style.width = '0';
            });

            if (userToken) {
                const response = await fetch(`${apiUrl}/api/users/searchUser/${userToken}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (data.firstName) {
                    document.getElementById('welcome-message').innerText = `!,ברוך הבא לאתר ${data.firstName} היי`;
                    document.getElementById('login-link').style.display = 'none';
                    document.getElementById('register-link').style.display = 'none';

                    // בדיקה אם הקישורים כבר קיימים בתפריט
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
                } else {
                    console.error('User name not found');
                }
            } else {
                console.error('User token not found');
            }
        } catch (error) {
            console.error('Error loading side menu:', error);
        }
    }

    document.addEventListener('DOMContentLoaded', loadSideMenu);

    // חשיפת הפונקציה loadSideMenu לגלובלי (לשימוש בקבצים אחרים)
    window.loadSideMenu = loadSideMenu;
})();



