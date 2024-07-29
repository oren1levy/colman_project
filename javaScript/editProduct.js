document.addEventListener('DOMContentLoaded', function() {

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    fetch(`http://localhost:3000/api/products/getProducts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId })
    })
    .then(response => response.json())
    .then(product => {
        console.log(product)
        document.getElementById('mainImage').src = `http://localhost:3000/${product.img}`;
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productColor').value = product.color;
    })
    .catch(error => console.error('Error fetching product data:', error));

    document.getElementById('updateProductBtn').addEventListener('click', function() {
        const updatedProduct = {
            name: document.getElementById('productName').value,
            price: document.getElementById('productPrice').value,
            description: document.getElementById('productDescription').value,
            color: document.getElementById('productColor').value,
            category: document.getElementById('productCategory').value
        };

        fetch(`http://localhost:3000/api/products/updateProduct/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        })
        .then(response => response.json())
        .then(result => {
            console.log('Product updated successfully:', result);
            window.location.href = "manager.html";
        })
        .catch(error => console.error('Error updating product:', error));
    });

    
});

