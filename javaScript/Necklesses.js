document.getElementById('openMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '250px';
});
document.getElementById('closeMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '0';
});
///////////////////////////////////////////////////////////////////////////

function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; 

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img id="cart-item-Img" src="${item.productImg}" alt="${item.productName}">
            <span class="cart-item-Details">
                <span id="cart-item-Name">${item.productName}</span>
                <span id="cart-item-quantity-text"><span id="cart-item-Quantity">${item.quantity}</span><span>:כמות</span></span>
                <span id="cart-item-Price">₪${(item.productPrice).toFixed(2)}</span>
                <span id="cart-item-Id">${item.productId}</span>
                <button class="delete-cart-product">הסר</button>
            </span>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    counter = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    updateCartDisplay(counter);
    updateCartTotal();
    updateCartIcon();
}


document.getElementById('openCart').addEventListener('click', function() {
    document.getElementById('cart').style.width = '380px';
    document.getElementById('cart').style.opacity = '100%';
    document.getElementById('overlay').style.display = 'block'
});
document.getElementById('closeCart').addEventListener('click', function() {
    document.getElementById('cart').style.width = '0';
    document.getElementById('cart').style.opacity = '0';
    document.getElementById('overlay').style.display = 'none'
});

let counter = 0; 

function updateCartDisplay(counter) {

if (counter === 0){
    document.getElementById('emptyCart-text').style.display = 'block';
    document.getElementById('emptyCart-text').innerHTML = "<hr><hr>העגלה ריקה";
    document.querySelector('.cart-footer').style.display = 'none';
    document.querySelector('.review-section').style.display = 'none';
    document.querySelector('.cart-count').style.display = 'none';
}
else if (counter > 0){
    document.getElementById('emptyCart-text').style.display = 'none';
    document.querySelector('.cart-footer').style.display = 'block';
    document.querySelector('.cart-footer').style.display = 'flex';
    document.querySelector('.review-section').style.display = 'block';
    document.querySelector('.cart-count').style.display = 'block';
}}

 function createElemnent() {
    // <figure class="product">
    //                     <img class="productImg" data-productImg="productImg" src="../imges/yukaNeckless.jpg" alt="Image 1">
    //                     <figcaption class="productName" data-productName="productName">Yuka שרשרת</figcaption>
    //                     <figcaption class="productprice" data-productPrice="productprice"><del id="deletedprice">220₪</del>&nbsp;170₪</figcaption>
    //                     <figcaption class="productId" data-productId="productId">111111 :מק"ט</figcaption>
    //                     <div class="productColor">
    //                         <span id="colorspanG"></span>
    //                         <span id="colorspanS"></span>
    //                         <span id="colorspanRG"></span>
    //                     </div>
    //                     <button class="addtocart-btn">הוסף לסל</button>
    //                 </figure>
}

function getAllProducts() {
    const requestOptions = {
        method: "POST", 
        redirect: "follow"
    };
    
    fetch("http://localhost:3000/api/products/getAllProducts", requestOptions) // Added http://
        .then((response) => response.json()) // Assuming the response is JSON
        .then((result) => {
            console.log(result)
            alert(result[0].description +  "the length of products" + result.length)
        })
        .catch((error) => console.error('Error:', error));
}


getAllProducts();

updateCartDisplay(counter);

document.querySelector('.toggle-button').addEventListener('click', () => {
    const hiddencontent = document.querySelector('.hidden-content');
    const button = document.querySelector('.toggle-button');
    console.log(hiddencontent); 
    console.log(button);
    if (hiddencontent.style.display === 'none' || hiddencontent.style.display === '') {
        hiddencontent.style.display = 'block';
        button.textContent = '-';
    } else {
        hiddencontent.style.display = 'none';
        button.textContent = '+';
    }
})

document.querySelector('#hidden-content-btn').addEventListener('click', () => {
    const textarea = document.getElementById("reviewInput");
    const text = textarea.value;
    
    let displayText = document.createElement("div");
    displayText.className = "saved-review"
    displayText.textContent = text;
    
    textarea.parentNode.replaceChild(displayText, textarea);
    sessionStorage.setItem('review', text);

})
///////////////////////////////////////////////////////////////////////////////
function updateCartItemCount() {
    const cartItemCountElement = document.getElementById('cart-item-count');
    const cartItems = document.querySelectorAll('.cart-item');
    let itemCount = 0;

    cartItems.forEach(cartItem => {
        const quantityElement = cartItem.querySelector('#cart-item-Quantity');
        itemCount += parseInt(quantityElement.textContent);
    });

    cartItemCountElement.textContent = itemCount;
}

function updateCartIcon() {
    document.getElementById('cartCount').textContent = counter;
}

function addToCart(productName, productPrice, productId, productImg) {
    const cartItemsContainer = document.querySelector('.cart-items');
    let existingCartItem = null;

    document.querySelectorAll('.cart-item').forEach(cartItem => {
        const itemId = cartItem.querySelector('#cart-item-Id').textContent;
        if (itemId === productId) {
            existingCartItem = cartItem;
        }
    });

    
    if (existingCartItem) {
        let quantityElement = existingCartItem.querySelector('#cart-item-Quantity');
        let newQuantity = parseInt(quantityElement.textContent) + 1;
        quantityElement.textContent = newQuantity;
        
        let priceElement = existingCartItem.querySelector('#cart-item-Price');
        let totalPrice = productPrice * newQuantity;
        priceElement.textContent = `₪${totalPrice.toFixed(2)}`;
    } else {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img id="cart-item-Img" src="${productImg}" alt="${productName}">
            <span class="cart-item-Details">
                <span id="cart-item-Name">${productName}</span>
                <span id="cart-item-quantity-text"><span id="cart-item-Quantity">1</span><span>:כמות</span></span>
                <span id="cart-item-Price">₪${productPrice}</span>
                <span id="cart-item-Id">${productId}</span>
                <button class="delete-cart-product">הסר</button>
            </span>
        `;
        cartItemsContainer.appendChild(cartItem);

    }

    updateCartItemCount();
}


///////////// filterProducts ////////
document.addEventListener('DOMContentLoaded', () => {
    const filterOptions = document.querySelectorAll('.filter-option input');
    const products = document.querySelectorAll('.product');

    filterOptions.forEach(option => {
        option.addEventListener('change', () => {
            filterProducts();
        });
    });

    function filterProducts() {
        const selectedFilters = Array.from(filterOptions)
            .filter(option => option.checked)
            .map(option => option.value);

        products.forEach(product => {
            const category = product.getAttribute('data-category');
            if (selectedFilters.length === 0 || selectedFilters.includes(category)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const filterToggleBtn = document.querySelector('.filter-toggle-btn');
    const filterContainer = document.getElementById('filterContainer');
    const filterOptions = document.querySelectorAll('.filter-option input');
    const products = document.querySelectorAll('.product');

    filterToggleBtn.addEventListener('click', () => {
        if (filterContainer.style.display === 'none' || filterContainer.style.display === '') {
            filterContainer.style.display = 'block';
        } else {
            filterContainer.style.display = 'none';
        }
    });

    filterOptions.forEach(option => {
        option.addEventListener('change', () => {
            filterProducts();
        });
    });

    function filterProducts() {
        const selectedFilters = Array.from(filterOptions)
            .filter(option => option.checked)
            .map(option => option.value);

        products.forEach(product => {
            const category = product.getAttribute('data-category');
            if (selectedFilters.length === 0 || selectedFilters.includes(category)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
});

document.querySelectorAll('.addtocart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product');
        const productName = product.querySelector('[data-productName]').textContent;
        const productPrice = parseFloat(product.querySelector('[data-productPrice]').textContent.split('₪')[1]);
        const productId = product.querySelector('[data-productId]').textContent;
        const productImg = product.querySelector('[data-productImg]').getAttribute('src');
        addToCart(productName, productPrice, productId, productImg);
    });
});



function removeFromCart(productId, productPrice) {
    const cartItemsContainer = document.querySelector('.cart-items');
    let cartItemToRemove = null;

    document.querySelectorAll('.cart-item').forEach(cartItem => {
        const itemId = cartItem.querySelector('#cart-item-Id').textContent;
        if (itemId === productId) {
            cartItemToRemove = cartItem;
        }
    });

    if (cartItemToRemove) {
        let quantityElement = cartItemToRemove.querySelector('#cart-item-Quantity');
        let quantity = parseInt(quantityElement.textContent);

        if (quantity > 1) {
            quantityElement.textContent = quantity - 1;
            let priceElement = cartItemToRemove.querySelector('#cart-item-Price');
            let totalPrice = (productPrice / quantity) * (quantity - 1);
            priceElement.textContent = `₪${totalPrice.toFixed(2)}`;
        } else {
            cartItemsContainer.removeChild(cartItemToRemove);
        }
    }

}


document.querySelector('.cart-items').addEventListener('click', function(event) {
    if (event.target && event.target.matches('.delete-cart-product')) {
        const cartItem = event.target.closest('.cart-item');
        if (cartItem) {
            const productId = cartItem.querySelector('#cart-item-Id').textContent;
            const productPrice = parseFloat(cartItem.querySelector('#cart-item-Price').textContent.split('₪')[1]);
            removeFromCart(productId, productPrice);

            counter--;
            updateCartDisplay(counter);
            updateCartTotal();
            updateCartIcon();
            saveCart();
        }
    }
});


function updateCartTotal() {
    const cartItemsContainer = document.querySelector('.cart-items');
    let total = 0;

    document.querySelectorAll('.cart-item').forEach(cartItem => {
        let priceElement = cartItem.querySelector('#cart-item-Price');
        let price = parseFloat(priceElement.textContent.replace('₪', ''));
        total += price;
    });

    document.getElementById('cart-total').textContent = `₪${total.toFixed(2)}`;
}

function saveCart() {
    const cartItems = [];
    document.querySelectorAll('.cart-item').forEach(cartItem => {
        const productId = cartItem.querySelector('#cart-item-Id').textContent;
        const productName = cartItem.querySelector('#cart-item-Name').textContent;
        const productPrice = parseFloat(cartItem.querySelector('#cart-item-Price').textContent.replace('₪', ''));
        const quantity = parseInt(cartItem.querySelector('#cart-item-quantity-text').textContent);
        const productImg = cartItem.querySelector('#cart-item-Img').src;
        cartItems.push({ productId, productName, productPrice, quantity,productImg });
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function saveReviews() {
    const cartReview = [];
    document.querySelectorAll('.cart-item')
}

document.querySelector('.payment-btn').addEventListener('click', () => {
    const cartTotal = document.getElementById('cart-total').textContent;
    sessionStorage.setItem('cartTotal', cartTotal);
});

window.addEventListener('load', loadCart);

//////////////////////////////////////////////////////////////////////////
/////cart to payment/////

function getCartProducts() {
    return JSON.parse(localStorage.getItem('cartProducts')) || [];
}

// Function to save cart products to local storage
function saveCartProducts(cartProducts) {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
}

document.querySelector('.payment-btn').addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:5501/html.page/payment.html';
});





/////////////////////////Products From Back/////////////////////////////
// document.addEventListener("DOMContentLoaded", function() {
//     const productContainer = document.querySelector(".gallery");

//     async function fetchProducts() {
//         try {
//             const response = await fetch('http://localhost:3000/api/products');
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const products = await response.json();
//             displayProducts(products);
//         } catch (error) {
//             console.error('Fetch error:', error);
//             productContainer.innerHTML = '<p>Failed to load products</p>';
//         }
//     }

//     function displayProducts(products) {
//         productContainer.innerHTML = products.map(product => `
//             <figure class="product">
//                 <img class="productImg" src="${product.image}" alt="${product.name}">
//                 <figcaption class="productName">${product.name}</figcaption>
//                 <figcaption class="productprice">
//                     <del id="deletedprice">${product.originalPrice}₪</del>&nbsp;${product.discountedPrice}₪
//                 </figcaption>
//                 <figcaption class="productId">מק"ט: ${product.id}</figcaption>
//                 <div class="productColor">
//                      <span id="colorspanG"></span>
//                      <span id="colorspanS"></span>
//                      <span id="colorspanRG"></span>
//                 </div>
//                 <button class="addtocart-btn">הוסף לסל</button>
//             </figure>
//         `).join('');
//     }

//     fetchProducts();
// });





