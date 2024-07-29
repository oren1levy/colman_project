document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('logo').addEventListener('click', function() {
        window.location.href = '../html.page/home.html';
    });

    function validateForm() {
        const productName = document.getElementById('productName').value.trim();
        const supplierId = document.getElementById('supplierId').value.trim();
        const productPrice = document.getElementById('productPrice').value;
        const productDescription = document.getElementById('productDescription').value.trim();
        const productCategory = document.getElementById('productCategory').value;
        const productColor = document.getElementById('productColor').value;
        const productImage = document.getElementById('productImage').files.length;

        if (!productName || !supplierId || !productPrice || !productDescription || !productCategory || !productColor || productImage === 0) {
            alert("Please fill in all fields and upload an image.");
            return false;
        }

        if (isNaN(productPrice) || parseFloat(productPrice) <= 0) {
            alert("Please enter a valid price.");
            return false;
        }

        return true;
    }

    function handleFormSubmit(event) {
        event.preventDefault(); 

        if (validateForm()) {
            const form = document.getElementById('addProductForm');
            const formData = new FormData(form);

            fetch('http://localhost:3000/api/products/addProducts', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(result => {
                console.log('Product added successfully:', result);
                window.location.href = "manager.html";
            })
            .catch(error => console.error('Error adding product:', error));
        }
    }

    document.getElementById('addProductForm').addEventListener('submit', handleFormSubmit);


    document.getElementById('productImage').addEventListener('change', function(event) {
        const fileInput = event.target;
        const imageContainer = document.getElementById('uploadedProductImage');
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            imageContainer.src = e.target.result;
            imageContainer.style.display = 'block';
        };

        reader.onerror = function() {
            console.error('Error reading the file');
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            console.error('No file selected');
        }
    });
});
