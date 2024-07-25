document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addProductBtn').addEventListener('click', function() {
        const form = document.getElementById('addProductForm');
        const formData = new FormData(form);

        const fileInput = document.getElementById('productImage');
        const fileName = fileInput.files[0].name;
        const imgPath = `../imges/${fileName}`;

        const newProduct = {
            name: formData.get('productName'),
            supplierId: formData.get('supplierId'),
            price: formData.get('productPrice'),
            description: formData.get('productDescription'),
            category: formData.get('productCategory'),
            color: formData.get('productColor'),
            img: imgPath
        };

        fetch('http://localhost:3000/api/products/addProducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Product added successfully:', result);
            window.location.href = "manager.html";
        })
        .catch(error => console.error('Error adding product:', error));
    });
});
