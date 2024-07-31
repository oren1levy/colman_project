document.getElementById('openMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '250px';
});

document.getElementById('closeMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '0';
});

document.getElementById('logo').addEventListener('click', function() {
    window.location.href = '../html.page/home.html';
});

$(document).ready(function() {
    $('nav ul li a').click(function(e) {
        e.preventDefault();
        $('section').removeClass('active');
        $($(this).attr('href')).addClass('active');
    });
});

/* Products Section */
function getAllProducts() {
    const requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    fetch('http://localhost:3000/api/products/getAllProducts', requestOptions)
        .then(response => response.json())
        .then(result => {
            const allProducts = document.getElementById('allProducts');
            allProducts.innerHTML = '';  
            result.forEach(product => {
                const productElement = `
                    <div class="product">
                        <h3 class="productName">${product.name}</h3>
                        <p class="productSupplier">Supplier: ${product.supplierId}</p>
                        <p class="productPrice">Price: ${product.price} INS</p>
                        <img id="productImage" src="http://localhost:3000/${product.img}" alt="${product.name}"/>
                        <button onclick="deleteProduct('${product._id}')">מחיקת מוצר</button>
                        <button onclick="editProduct('${product._id}')">עריכת מוצר</button>
                    </div>
                `;
                allProducts.insertAdjacentHTML('beforeend', productElement);
            });
        })
        .catch(error => console.error('Error:', error));
}

function deleteProduct(productId) {
    fetch(`http://localhost:3000/api/products/deleteProduct/${productId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(result => {
        console.log('Product deleted:', result);
        getAllProducts();  
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('createProduct').addEventListener('click', function() {
    window.location.href = 'addProduct.html';
});

function editProduct(productId) {
    window.location.href = `editProduct.html?id=${productId}`;
}

document.addEventListener('DOMContentLoaded', getAllProducts);

document.getElementById('searchProduct').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const allProducts = document.getElementsByClassName('product');
    let noResults = true;

    Array.from(allProducts).forEach(product => {
        const productName = product.querySelector('.productName').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
            noResults = false;
        } else {
            product.style.display = 'none';
        }
    });

    if (noResults) {
        document.getElementById('noProductsMessage').style.display = 'block';
    } else {
        document.getElementById('noProductsMessage').style.display = 'none';
    }
});


/* Orders Section */

async function getOrders() {
    const requestOptions = {
        method: 'POST',
        redirect: 'follow'
    };

    try {
        const response = await fetch('http://localhost:3000/api/orders/getAllOrders', requestOptions);
        const result = await response.json();

        const allOrders = document.getElementById('allOrders');
        allOrders.innerHTML = '';  
        let count = 1;

        for (const order of result) {
            const orderElement = document.createElement('div');
            orderElement.className = 'order-card';
            
            const orderDate = order.createdAt ? order.createdAt.slice(0, 10) : '';

            orderElement.innerHTML = `
                <div class="order-header">
                    <h3 class="order-number">Order #${count}</h3>
                    <p><span class="order-label">Date:</span> ${orderDate}</p>
                    <p><span class="order-label">User ID:</span> ${order.userId}</p>
                    <p><span class="order-label">Total Price:</span> ${order.totalPrice} INS</p>
                    <p><span class="order-label">City:</span> ${order.city}</p>
                    <p><span class="order-label">Address:</span> ${order.address}</p>
                    <p><span class="order-label">Phone:</span> ${order.phone}</p>
                    <button class="toggle-products">View Products</button>
                </div>
                <div class="products-container" style="display: none;"></div>
            `;

            const productsIdArray = order.productsId[0].split(',').map(id => id.trim().replace(/"/g, ''));
            const productDetails = await getProductDetails(productsIdArray);
            
            const productsContainer = orderElement.querySelector('.products-container');
            productDetails.forEach(product => {
                const productInfo = document.createElement('div');
                productInfo.className = 'product-info';
                productInfo.innerHTML = `
                    <div class="product-item">
                        <img class="product-img" src="http://localhost:3000/${product.img}" alt="Product Image">
                        <div class="product-details">
                            <p><span class="product-label">Name:</span> ${product.name}</p>
                            <p><span class="product-label">Price:</span> ${product.price} INS</p>
                        </div>
                    </div>
                `;
                productsContainer.appendChild(productInfo);
            });

            const toggleButton = orderElement.querySelector('.toggle-products');
            toggleButton.addEventListener('click', () => {
                productsContainer.style.display = productsContainer.style.display === 'none' ? 'block' : 'none';
            });

            allOrders.appendChild(orderElement);
            count++;
        }
    } catch (error) {
        console.error('Error:', error);
    }
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

document.addEventListener('DOMContentLoaded', getOrders);

/* Financial Balance Section */

const monthNames = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];

const fetchSalesData = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/orders/sales/monthly');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const salesData = await response.json();
        console.log('Fetched sales data:', salesData);
        return salesData.map(data => ({
            month: monthNames[data._id - 1], 
            totalSales: data.totalSales,
            count: data.count
        }));
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

const renderSalesChart = (salesData) => {
    const ctx = document.getElementById('salesChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: salesData.map(data => data.month),
            datasets: [{
                label: 'כלל המכירות לפי חודשים',
                data: salesData.map(data => data.totalSales),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    titleFont: { size: 16 },
                    bodyFont: { size: 14 }
                }
            },
            hover: {
                animationDuration: 400
            }
        }
    });
};

document.addEventListener('DOMContentLoaded', async () => {
    const salesData = await fetchSalesData();
    renderSalesChart(salesData);
});

/* Users Section */

async function fetchUserStats() {
    try {
        const response = await fetch('http://localhost:3000/api/users/stats');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching user stats:', error);
    }
}

function renderUserStatsChart(stats) {
    const ctx = document.getElementById('userStatsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['כלל המשתמשים', 'כלל ההזמנות'],
            datasets: [{
                label: 'משתמשים אל מול הזמנות',
                data: [stats.totalUsers, stats.totalOrders],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const stats = await fetchUserStats();
    if (stats) {
        renderUserStatsChart(stats);
    }
});


/* Supplier Section */

document.addEventListener('DOMContentLoaded', () => {
    getAllProducts();
    getOrders();
    fetchUserStats().then(stats => {
        if (stats) {
            renderUserStatsChart(stats);
        }
    });
    getAllSuppliers(); 
});


function getAllSuppliers() {
    fetch('http://localhost:3000/api/suppliers/getAllSuppliers', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(result => {
        const allSuppliers = document.getElementById('allSuppliers');
        allSuppliers.innerHTML = '';
        result.forEach(supplier => {
            const supplierElement = `
                <div class="supplier-card">
                    <h3>${supplier.name}</h3>
                    <p><strong>Email:</strong> ${supplier.email}</p>
                    <p><strong>Phone:</strong> ${supplier.phone}</p>
                    <p><strong>Balance:</strong> ${supplier.balance}</p>
                    <button onclick="viewSupplierProducts('${supplier._id}')">צפה במוצרים</button>
                    <button onclick="deleteSupplier('${supplier._id}')">מחיקת ספק</button>
                </div>
            `;
            allSuppliers.insertAdjacentHTML('beforeend', supplierElement);
        });
    })
    .catch(error => console.error('Error:', error));
}

function viewSupplierProducts(supplierId) {
    window.location.href = `supplierProducts.html?supplierId=${supplierId}`;
}

function deleteSupplier(supplierId) {
    fetch(`http://localhost:3000/api/suppliers/deleteSupplier/${supplierId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(result => {
        console.log('Supplier deleted:', result);
        getAllSuppliers(); 
    })
    .catch(error => console.error('Error:', error));
}

document.getElementById('createSupplierButton').addEventListener('click', function() {
    const form = document.getElementById('createSupplierForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('createSupplierForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.display = 'none';

    const name = document.getElementById('supplierName').value.trim();
    const email = document.getElementById('supplierEmail').value.trim();
    const phone = document.getElementById('supplierPhone').value.trim();
    const balance = document.getElementById('supplierBalance').value;

    if (!name || !email || !phone || !balance) {
        errorMessage.innerText = 'יש למלא את כל השדות';
        errorMessage.style.display = 'block';
        return;
    }

    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    if (!phonePattern.test(phone)) {
        errorMessage.innerText = 'פורמט טלפון לא חוקי. השתמשו בפורמט 123-456-7890';
        errorMessage.style.display = 'block';
        return;
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            balance: balance
        })
    };

    fetch('http://localhost:3000/api/suppliers/addSupplier', requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log('Supplier added:', result);
            getAllSuppliers(); 
        })
        .catch(error => console.error('Error:', error));
});



