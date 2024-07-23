function getAllProducts() {
    const requestOptions = {
        method: "POST", 
        redirect: "follow"
    };

    fetch("http://localhost:3000/api/products/getAllProducts", requestOptions)
        .then(response => response.json()) 
        .then(result => { 
            const productGallery = document.getElementById('productGallery');
            result.forEach(product => {
                const discount = product.price - 50;
                const productElement = `
                    <figure class="product">
                        <div class="image-container">
                            <img class="productImg" data-productId="${product._id}" src="${product.img}" alt="${product.name}">
                            <button class="addtocart-btn">הוספה מהירה לסל</button>
                        </div>
                        <figcaption class="productName" data-productName="productName">${product.name}</figcaption>
                        <figcaption class="productDescription" data-productDescription="productDescription">${product.description}</figcaption>
                        <figcaption class="productprice" data-productPrice="productprice"><del id="deletedprice">${product.price}₪</del>&nbsp;${discount}₪</figcaption>
                        <div class="productColor">
                            ${Array.isArray(product.colors) ? product.colors.map(color => `<span style="background-color: ${color};" class="color-span"></span>`).join('') : ''}
                        </div>
                    </figure>
                `;
                productGallery.insertAdjacentHTML('beforeend', productElement);
            });

            // Add event listener for product images
            document.querySelectorAll('.productImg').forEach(img => {
                img.addEventListener('click', function() {
                    const productId = this.getAttribute('data-productId');
                    window.location.href = `product.html?id=${productId}`;
                });
            });
        })
        .catch(error => console.error('Error:', error));
}

getAllProducts();
