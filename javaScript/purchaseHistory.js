document.getElementById('logo').addEventListener('click', function() {
    window.location.href = '../html.page/home.html';
});

document.addEventListener('DOMContentLoaded', function() {
    let purchases = [];

    async function getCustomerOrders() {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        const userToken = localStorage.getItem('userToken'); 

        if (!userToken) {
            console.error('User token not found');
            return;
        } else {
            console.log(userToken);
        }

        try {
            const response = await fetch(`http://localhost:3000/api/orders/user/${userToken}`, requestOptions);
            const result = await response.json();
            console.log('Fetch result:', result);

            purchases = result; 
            displayOrders(result); 
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function reverseDateComponents(dateString) {
        const components = dateString.split('-');
        const reversedComponents = components.reverse();
        return reversedComponents.join('-');
    }

    async function getProductDetails(productIds) {
        const productDetails = [];

        for (const id of productIds) {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: id })
            };

            try {
                const response = await fetch('http://localhost:3000/api/products/getProducts', requestOptions);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const result = await response.json();
                productDetails.push(result);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        }

        return productDetails;
    }

    function displayOrders(orders) {
        const ordersSection = document.querySelector('.orders-section');
        ordersSection.innerHTML = ''; 

        let count = 1;
        orders.forEach(async (order) => {
            const singleOrder = document.createElement('div');
            const orderDate = order.createdAt ? order.createdAt.slice(0, 10) : '';

            const reversedDate = reverseDateComponents(orderDate);
            const orderTime = order.createdAt ? order.createdAt.slice(11, 19) : '';

            const productsIdString = order.productsId[0]; 
            const productsIdArray = productsIdString.split(',').map(id => id.trim().replace(/"/g, ''));
            console.log(`Order ${count} productsId:`, productsIdArray);

            const productDetails = await getProductDetails(productsIdArray);

            singleOrder.className = 'orders';
            singleOrder.innerHTML = `
                <div class="order">
                  <span class="purchasehistory-details">
                    <h3 class="customer-orderNumber">הזמנה מספר ${count}</h3>
                    <p class="customer-orderUserId">תאריך קנייה: ${reversedDate}</p>
                    <p class="customer-orderUserId">שעת קנייה: ${orderTime}</p>
                    <p class="customer-orderUserId">מספר לקוח: ${order.userId}</p>
                    <p class="customer-orderTotalPrice">סכום הקנייה: ${order.totalPrice}₪</p>
                    <p class="customer-orderTotalPrice">טלפון: ${order.phone}</p>
                    <p class="customer-orderTotalPrice">מספר קבלה: ${order.billNumber}</p>
                  </span>
                  <span class="purchasehistory-products">
                  </span>
                </div>
            `;

            const productsSpan = singleOrder.querySelector('.purchasehistory-products');
            productDetails.forEach(product => {
                const productInfo = document.createElement('div');
                productInfo.className = 'product-info';
                const productPrice = product.price - 50;
                productInfo.innerHTML = `
                    <img id="productImg" src=http://localhost:3000/${product.img} alt="productImg">
                    <p>שם המוצר: ${product.name}</p>
                    <p>קטגוריית המוצר: ${product.category}</p>
                    <p>מחיר המוצר: ${productPrice}₪</p>
                `;
                productsSpan.appendChild(productInfo);
            });

            count++;
            ordersSection.appendChild(singleOrder);
        });
    }

    function applyFilters() {
        const billFilter = document.getElementById('bill').value;
        const dateFilter = document.getElementById('purchaseDate').value;
        const reversedDate = reverseDateComponents(dateFilter);
        const priceFilter = document.getElementById('priceRange').value;
        let searchproduct = document.getElementById('search-product').value;

        if (searchproduct) {
            searchproduct = `"${searchproduct}"`;
        }

        const filteredResults = purchases.filter(purchase => {
            return (!billFilter || purchase.billNumber.includes(billFilter)) &&
                   (!reversedDate || purchase.createdAt.slice(0, 10) === reversedDate) &&
                   (!priceFilter || purchase.totalPrice <= parseFloat(priceFilter)) &&
                   (!searchproduct || purchase.productsId.includes(searchproduct));

                   
        });
     
        displayOrders(filteredResults);
    }

    document.getElementById('applyFiltersBtn').addEventListener('click', applyFilters);

    document.getElementById('resetFiltersBtn').addEventListener('click', function() {
        document.getElementById('priceRange').value = 10000;
        document.getElementById('priceRangeValue').textContent = '10000₪';
        document.getElementById('bill').value = '';
        document.getElementById('purchaseDate').value = '';
        document.getElementById('search-product').value = '';
        getCustomerOrders();
    });

    document.getElementById('priceRange').addEventListener('input', function() {
        document.getElementById('priceRangeValue').textContent = `${this.value}₪`;
    });

    getCustomerOrders();
});
