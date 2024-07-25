document.getElementById('openMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '250px';
});
document.getElementById('closeMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '0';
});
/*///////////////////////////////////////////////////////////////////*/
$(document).ready(function() {

    $('nav ul li a').click(function(e) {
        e.preventDefault();
        $('section').removeClass('active');
        $($(this).attr('href')).addClass('active');
    });
    
});
/*////////////////////////////// products delete and update //////////////////////////////////*/

function getAllProducts() {
    const requestOptions = {
        method: "POST",
        redirect: "follow"
    };

    fetch("http://localhost:3000/api/products/getAllProducts", requestOptions)
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

document.getElementById('createProduct').addEventListener("click",function(){
    window.location.href = "addProduct.html"
})

function editProduct(productId) {
    window.location.href = `editProduct.html?id=${productId}`;
}

document.addEventListener('DOMContentLoaded', getAllProducts);

/*///////////////////////////////////////////////////////////////////*/

/*////////////////////////////// orders //////////////////////////////////*/

function getOrders() {
    const requestOptions = {
        method: "POST",
        redirect: "follow"
    };

    fetch("http://localhost:3000/api/orders/getAllOrders", requestOptions)
        .then(response => response.json())
        .then(result => {
            const allOrders = document.getElementById('allOrders');
            allOrders.innerHTML = '';  
            let count = 1;
            result.forEach(order => {
                const orderElement = `
                    <div class="order">
                        <h3 class="orderNumber">${count}</h3>
                        <p class="orderUserId">User id: ${order.userId}</p>
                        <p class="orderTotalPrice">Total price: ${order.totalPrice} INS</p>
                        <p class="orderCity">City: ${order.city} </p>
                        <p class="orderAddress">Address: ${order.address} </p>
                        <p class="orderPhone">Connection number: ${order.phone} </p>
                    </div>
                `;
                allOrders.insertAdjacentHTML('beforeend', orderElement);
                count++;
            });
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', getOrders);

/*///////////////////////////////////////////////////////////////////*/

/*////////////////////////////// balance //////////////////////////////////*/

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const fetchSalesData = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/orders/sales/monthly');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const salesData = await response.json();
        console.log('Fetched sales data:', salesData);
        return salesData.map(data => ({
            month: monthNames[data._id - 1], // convert month number to month name
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
                label: 'Total Sales',
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


/*///////////////////////////////////////////////////////////////////*/
