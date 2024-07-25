

// const apiUrl = 'http://localhost:3000';
// const userToken = localStorage.getItem('userToken');

// // פונקציה לטעינת היסטוריית הרכישות
// async function loadPurchaseHistory() {
//     try {
//         const response = await fetch(`${apiUrl}/api/orders`, {
//             headers: {
//                 'Authorization': `Bearer ${userToken}` // שליחת הטוקן כדי לזהות את המשתמש
//             }
//         });
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const orders = await response.json();

//         const purchaseHistoryContainer = document.querySelector('.purchaseHistory');
//         if (!purchaseHistoryContainer) {
//             throw new Error('purchaseHistory element not found');
//         }
//         purchaseHistoryContainer.innerHTML = ''; // מנקה את ה-DIV לפני עדכון

//         for (const order of orders) {
//             // יצירת כרטיסיית הזמנה
//             const orderCard = document.createElement('div');
//             orderCard.className = 'order-card';

//             // HTML של פרטי הזמנה בסיסיים
//             let orderHtml = `
//                 <div class="order-details">
//                     <h3>מספר הזמנה: ${order._id}</h3>
//                     <p>כתובת: ${order.address}, ${order.city}</p>
//                     <p>טלפון: ${order.phone}</p>
//                     <p>מיקוד: ${order.postalCode}</p>
//                     <h4>פרטי מוצרים:</h4>
//             `;

//             // קבלת פרטי המוצרים בהזמנה
//             const productIds = order.productsId.split(',');
//             for (const productId of productIds) {
//                 const productResponse = await fetch(`${apiUrl}/api/products/${productId}`);
//                 if (!productResponse.ok) {
//                     throw new Error(`HTTP error! status: ${productResponse.status}`);
//                 }
//                 const product = await productResponse.json();
                
//                 // הוספת פרטי המוצר ל-HTML
//                 orderHtml += `
//                     <div class="product-item">
//                         <img src="${product.img}" alt="${product.name}" />
//                         <div class="product-info">
//                             <p>שם המוצר: ${product.name}</p>
//                             <p>תיאור: ${product.description}</p>
//                             <p>מחיר: ${product.price}</p>
//                             <p>צבע: ${product.color}</p>
//                         </div>
//                     </div>
//                 `;
//             }

//             orderHtml += `<h4>סך הכל: ${order.totalPrice}</h4></div>`;
//             orderCard.innerHTML = orderHtml;
//             purchaseHistoryContainer.appendChild(orderCard);
//         }
//     } catch (error) {
//         console.error('Error loading purchase history:', error);
//     }
// }

// // קריאה לפונקציות כשהדף נטען
// window.onload = function() {
//     loadSideMenu();
//     loadPurchaseHistory();
// };


(function() {
    const apiUrl = 'http://localhost:3000';
    const userToken = localStorage.getItem('userToken');

    // פונקציה לטעינת היסטוריית הרכישות
    async function loadPurchaseHistory() {
        try {
            const response = await fetch(`${apiUrl}/api/orders`, {
                headers: {
                    'Authorization': `Bearer ${userToken}` // שליחת הטוקן כדי לזהות את המשתמש
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const orders = await response.json();

            const purchaseHistoryContainer = document.querySelector('.purchaseHistory');
            if (!purchaseHistoryContainer) {
                throw new Error('purchaseHistory element not found');
            }
            purchaseHistoryContainer.innerHTML = ''; // מנקה את ה-DIV לפני עדכון

            for (const order of orders) {
                // יצירת כרטיסיית הזמנה
                const orderCard = document.createElement('div');
                orderCard.className = 'order-card';

                // HTML של פרטי הזמנה בסיסיים
                let orderHtml = `
                    <div class="order-details">
                        <h3>מספר הזמנה: ${order._id}</h3>
                        <p>כתובת: ${order.address}, ${order.city}</p>
                        <p>טלפון: ${order.phone}</p>
                        <p>מיקוד: ${order.postalCode}</p>
                        <h4>פרטי מוצרים:</h4>
                `;

                // קבלת פרטי המוצרים בהזמנה
                const productIds = order.productsId.split(',');
                for (const productId of productIds) {
                    const productResponse = await fetch(`${apiUrl}/api/products/${productId}`);
                    if (!productResponse.ok) {
                        throw new Error(`HTTP error! status: ${productResponse.status}`);
                    }
                    const product = await productResponse.json();
                    
                    // הוספת פרטי המוצר ל-HTML
                    orderHtml += `
                        <div class="product-item">
                            <img src="${product.img}" alt="${product.name}" />
                            <div class="product-info">
                                <p>שם המוצר: ${product.name}</p>
                                <p>תיאור: ${product.description}</p>
                                <p>מחיר: ${product.price}</p>
                                <p>צבע: ${product.color}</p>
                            </div>
                        </div>
                    `;
                }

                orderHtml += `<h4>סך הכל: ${order.totalPrice}</h4></div>`;
                orderCard.innerHTML = orderHtml;
                purchaseHistoryContainer.appendChild(orderCard);
            }
        } catch (error) {
            console.error('Error loading purchase history:', error);
        }
    }

    // קריאה לפונקציות כשהדף נטען
    window.onload = function() {
        loadSideMenu();
        loadPurchaseHistory();
    };
})();

