document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('logo').addEventListener('click', function() {
        window.location.href = '../html.page/home.html';
    });
    
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('twitterButton').onclick = function() {
            window.location.href = 'https://x.com/yolo082024';
        };
    });
    
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
            const discount = product.price - 50;
            console.log(product);
            document.getElementById('mainImage').src = `http://localhost:3000/${product.img}`;
            document.getElementById('productName').textContent = product.name;
            document.getElementById('productPrice').textContent = `₪${discount}`;
            document.getElementById('productDescription').textContent = product.description;
            document.getElementById('productId').textContent = product._id;

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


document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.toggle-description-btn');
    const descriptionContent = document.querySelector('.product-description-content');

    toggleButton.addEventListener('click', () => {
        if (descriptionContent.style.display === 'none' || descriptionContent.style.display === '') {
            descriptionContent.style.display = 'block';
            toggleButton.textContent = '-'; 
        } else {
            descriptionContent.style.display = 'none';
            toggleButton.textContent = '+'; 
        }
    });
})




