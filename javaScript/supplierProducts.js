// Get supplierId from the URL
const urlParams = new URLSearchParams(window.location.search);
const supplierId = urlParams.get('supplierId');

// Fetch and display products by supplier
function getProductsBySupplier() {
    fetch(`http://localhost:3000/api/products/supplier/${supplierId}`)
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById('products-container');
            products.forEach(product => {
                const productBox = `
                    <div class="product-info">
                        <img src="http://localhost:3000/${product.img}" class="product-img" alt="${product.name}">
                        <div class="product-details">
                            <p class="product-label">Name: ${product.name}</p>
                            <p class="product-label">Category: ${product.category}</p>
                            <p class="product-label">Price: ${product.price} NIS</p>
                        </div>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', productBox);
            });
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', getProductsBySupplier);
