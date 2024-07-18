document.getElementById('openMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '250px';
});
document.getElementById('closeMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '0';
});
///////////////////////////////////////////////////////////////////////////
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

function updateCartDisplay(counter) {

if (counter === 0){
    document.getElementById('emptyCart-text').style.display = 'block';
    document.getElementById('emptyCart-text').innerHTML = "<hr><hr>העגלה ריקה";
}
else if (counter > 0){
    document.getElementById('emptyCart-text').style.display = 'none';
    document.querySelector('.cart-footer').style.display = 'block';
    document.querySelector('.cart-footer').style.display = 'flex';
    document.querySelector('.review-section').style.display = 'block';
}}



let counter = 0; 
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
})
///////////////////////////////////////////////////////////////////////////////


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
}

// function removeProduct(productId) {
//     const productElement = document.getElementById(productId);
//     if (productElement) {
//         productElement.remove();
        
//         let counter = document.querySelectorAll('.cart-product').length;
//         updateCartDisplay(counter);
//     }
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const deleteButtons = document.querySelectorAll('.delete-cart-product');

//     deleteButtons.forEach(button => {
//         button.addEventListener('click', (event) => {
//             const productElement = event.target.closest('.cart-product');
//             removeProduct(productElement.id);
//         });
//     });

//     counter--;
//     updateCartDisplay(counter);
// });
// document.addEventListener('DOMContentLoaded', () => {
//     const removeButtons = document.querySelectorAll('.delete-cart-product');

//     removeButtons.forEach(button => {
//         button.addEventListener('click', (event) => {
//             const divToRemove = event.target.closest('.cart-item');
//             if (divToRemove) {
//                 divToRemove.remove();
//             }
//         });
//     });
// });

document.querySelectorAll('.addtocart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product');
        const productName = product.querySelector('[data-productName]').textContent;
        const productPrice = parseFloat(product.querySelector('[data-productPrice]').textContent.split('₪')[1]);
        const productId = product.querySelector('[data-productId]').textContent;
        const productImg = product.querySelector('[data-productImg]').getAttribute('src');
        addToCart(productName, productPrice, productId, productImg);
        updateTotalPrice();

        counter++;
        updateCartDisplay(counter)
    });
});

function updateTotalPrice() {
    const cartItems = document.querySelectorAll('.cart-item');
    let totalPrice = 0;

    cartItems.forEach(cartItem => {
        const priceElement = cartItem.querySelector('#cart-item-Price');
        const quantityElement = cartItem.querySelector('#cart-item-Quantity');
        const price = parseFloat(priceElement.textContent.split('₪')[1]);
        const quantity = parseInt(quantityElement.textContent);
        totalPrice += (price / quantity) * quantity;
    });

    const totalPriceElement = document.getElementById('cart-total');
    totalPriceElement.textContent = `Total: ₪${totalPrice.toFixed(2)}`;
}
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






