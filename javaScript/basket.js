    const userId = localStorage.getItem('userToken'); 

    if (!userId) {
        console.error('User ID not found in localStorage');
    }

    document.getElementById('logo').addEventListener('click', function() {
        window.location.href = '../html.page/home.html';
    });
    

    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('twitterButton').onclick = function() {
            window.location.href = 'https://x.com/yolo082024';
        };
    });
    
document.getElementById('openMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '250px';
});
document.getElementById('closeMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '0';
});

function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
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
    
    
    
    updateCartDisplay(counter);

function updateCartIcon() {
    document.getElementById('cartCount').textContent = counter;
}

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
    document.querySelector('.cart-items');
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
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
}

document.querySelector('.payment-btn').addEventListener('click', () => {
    const cartTotal = document.getElementById('cart-total').textContent;
    sessionStorage.setItem('cartTotal', cartTotal);
});

window.addEventListener('load', loadCart);


document.querySelector('.payment-btn').addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:5501/html.page/payment.html';
});


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
        counter++;
        updateCartDisplay(counter)
        updateCartTotal();
        updateCartIcon();
        saveCart();
    
}
document.querySelectorAll('.addToCartBtn').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product');
        const productName = product.querySelector('[data-productName]').textContent;
        const productPrice = parseFloat(product.querySelector('[data-productPrice]').textContent.split('₪')[1]);
        const productId = product.querySelector('[data-productId]').textContent;
        const productImg = product.querySelector('[data-productImg]').getAttribute('src');
        addToCart(productName, productPrice, productId, productImg);
    });
});
