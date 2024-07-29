document.getElementById('logo').addEventListener('click', function() {
    window.location.href = '../html.page/home.html';
})

document.addEventListener('DOMContentLoaded', function() {

    function getCustomerOrders() {
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

        fetch(`http://localhost:3000/api/orders/user/${userToken}`, requestOptions)
            .then(response => response.json())
            .then(async result => {
                console.log('Fetch result:', result);

                const orders = document.querySelector('.orders-section');
                orders.innerHTML = ''; 

                let count = 1;
                for (const order of result) {
                    const singleOrder = document.createElement('div');
                    const orderDate = order.createdAt ? order.createdAt.slice(0, 10) : '';
                    const orderTime = order.createdAt ? order.createdAt.slice(11, 19) : '';

                    const productsIdString = order.productsId[0]; 
                    const productsIdArray = productsIdString.split(',').map(id => id.trim().replace(/"/g, ''));
                    console.log(`Order ${count} productsId:`, productsIdArray);

                    const productDetails = await getProductDetails(productsIdArray);
                    console.log(`Order ${count} product details:`, productDetails);

                    singleOrder.className = 'orders';
                    singleOrder.innerHTML = `
                        <div class="order">
                          <span class="purchasehistory-details">
                            <h3 class="customer-orderNumber">הזמנה מספר ${count}</h3>
                            <p class="customer-orderUserId">תאריך קנייה: ${orderDate}</p>
                            <p class="customer-orderUserId">שעת קנייה: ${orderTime}</p>
                            <p class="customer-orderUserId">מספר לקוח: ${order.userId}</p>
                            <p class="customer-orderTotalPrice">סכום הקנייה: ${order.totalPrice}₪</p>
                            <p class="customer-orderTotalPrice">טלפון: ${order.phone}</p>
                            <p class="customer-orderTotalPrice">מספר קבלה: ${order.billNumber}</p>
                          </span>
                          <span class="purchasehistory-products">
                              ${productDetails.map(product => `
                                  <div class="product-item">
                                      <img class="productImg" src="${product.img}" alt="productImg">
                                      <p>קוד המוצר: ${product._id}</p>
                                      <p>שם המוצר: ${product.name}</p>
                                      <p>מחיר המוצר: ${product.price}₪</p>
                                  </div>
                              `).join('')}
                          </span>
                        </div>
                    `;

                    count++;
                    orders.appendChild(singleOrder);
                }
            })
            .catch(error => console.error('Error:', error));
    }
    ////////////////////////////////////////////////////////////////
    async function getProductDetails(productIds) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productIds })
        };

        try {
            const response = await fetch(`http://localhost:3000/api/products/getProducts/${productIds}`, requestOptions);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error fetching product details:', error);
            return [];
        }
    }

    getCustomerOrders();    
});

function applyFilters() {
    const selectedTypes = Array.from(document.querySelectorAll('input[name="jewelryType"]:checked')).map(cb => cb.value);
    const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(cb => cb.value);
    const maxPrice = document.getElementById('priceRange').value;
    const searchQuery = document.getElementById('search-product').value.toLowerCase();

    fetch("http://localhost:3000/api/products/getAllProducts", { method: "POST", redirect: "follow" })
        .then(response => response.json())
        .then(result => {
            let filteredProducts = result;

            if (selectedTypes.length > 0) {
                filteredProducts = filteredProducts.filter(product => selectedTypes.includes(product.category));
            }

            if (selectedColors.length > 0) {
                filteredProducts = filteredProducts.filter(product => selectedColors.includes(product.color));
            }

            if (maxPrice) {
                filteredProducts = filteredProducts.filter(product => parseFloat(product.price) <= parseFloat(maxPrice));
            }

            if (searchQuery) {
                filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(searchQuery));
            }

            displayProducts(filteredProducts);
        })
        .catch(error => console.error('Error:', error));
}