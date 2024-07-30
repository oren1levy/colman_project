

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('logo').addEventListener('click', function() {
        window.location.href = '../html.page/home.html';
    });
});

    function getAllProducts() {
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

        fetch("http://localhost:3000/api/products/getAllProducts", requestOptions)
            .then(response => response.json())
            .then(result => {
                displayProducts(result);
            })
            .catch(error => console.error('Error:', error));
    }

    function displayProducts(products) {
        const productGallery = document.getElementById('productGallery');
        productGallery.innerHTML = ''; 
        products.forEach(product => {
            const discount = product.price - 50;
            const productElement = `
                <figure class="product">
                    <div class="image-container">
                        <img class="productImg" data-productId="${product._id}" src="http://localhost:3000/${product.img}" alt="${product.name}">
                        <button class="addToCartBtn">הוספה מהירה לסל</button>
                    </div>
                    <figcaption class="productName" data-productName="productName">${product.name}</figcaption>
                    <figcaption class="productprice" data-productPrice="productprice"><del id="deletedprice">${product.price}₪</del>&nbsp;${discount}₪</figcaption>
                    <div class="productColor">
                        ${Array.isArray(product.colors) ? product.colors.map(color => `<span style="background-color: ${color};" class="color-span"></span>`).join('') : ''}
                    </div>
                </figure>
            `;
            productGallery.insertAdjacentHTML('beforeend', productElement);
        });

        document.querySelectorAll('.productImg').forEach(img => {
            img.addEventListener('click', function() {
                const productId = this.getAttribute('data-productId');
                window.location.href = `product.html?id=${productId}`;
            });
        });
        
        document.querySelectorAll('.addToCartBtn').forEach(button => {
            button.addEventListener('click', function(){
                const product = this.closest('.product');
                const productName = product.querySelector('[data-productName]').textContent;
                const productPrice = parseFloat(product.querySelector('[data-productPrice]').textContent.split('₪')[1]);
                const productId = product.querySelector('.productImg').getAttribute('data-productId');
                const productImg = product.querySelector('.productImg').getAttribute('src');

                addToCart(productName,productPrice,productId,productImg);
            });
        });
    }
 
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

    document.getElementById('applyFiltersBtn').addEventListener('click', applyFilters);

    document.getElementById('resetFiltersBtn').addEventListener('click', function() {
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.getElementById('priceRange').value = 1000;
        document.getElementById('priceRangeValue').textContent = '1000₪';
        document.getElementById('search-product').value = '';
        getAllProducts();
    });

    document.getElementById('priceRange').addEventListener('input', function() {
        document.getElementById('priceRangeValue').textContent = `${this.value}₪`;
    });

    getAllProducts();
