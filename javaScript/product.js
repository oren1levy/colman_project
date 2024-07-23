document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetch('http://localhost:3000/api/products/getProducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: productId })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(product => {
            console.log(product);
            document.getElementById('mainImage').src = product.img;
            document.getElementById('productName').textContent = product.name;
            document.getElementById('productPrice').textContent = `₪${product.price}`;
            document.getElementById('productDescription').textContent = product.description;

            const thumbnailImages = document.getElementById('thumbnailImages');
            if (Array.isArray(product.images)) {
                product.images.forEach(image => {
                    const imgElement = document.createElement('img');
                    imgElement.src = image;
                    imgElement.alt = 'Thumbnail';
                    imgElement.className = 'thumbnail';
                    imgElement.addEventListener('click', function() {
                        document.getElementById('mainImage').src = this.src;
                    });
                    thumbnailImages.appendChild(imgElement);
                });
            }
        })
        .catch(error => console.error('Error:', error));
    }
});


document.querySelectorAll('.thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        const mainImage = document.getElementById('mainImage');
        mainImage.src = this.src;
    });
});


// document.addEventListener('DOMContentLoaded', () => {
//     const toggleButton = document.querySelector('.toggle-description-btn');
//     const descriptionContent = document.querySelector('.product-description-content');

//     toggleButton.addEventListener('click', () => {
//         if (descriptionContent.style.display === 'none' || descriptionContent.style.display === '') {
//             descriptionContent.style.display = 'block';
//             toggleButton.textContent = '-'; 
//         } else {
//             descriptionContent.style.display = 'none';
//             toggleButton.textContent = '+'; 
//         }
//     });





