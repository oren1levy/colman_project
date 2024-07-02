document.getElementById('openMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '250px';
});
document.getElementById('closeMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '0';
});
////////////////////////////////////////////////////////////////////////////
document.getElementById('openCart').addEventListener('click', function() {
    document.getElementById('cart').style.width = '380px';
    document.getElementById('cart').style.opacity = '100%';
});
document.getElementById('closeCart').addEventListener('click', function() {
    document.getElementById('cart').style.width = '0';
    document.getElementById('cart').style.opacity = '0';
});

let counter = 1;

if (counter === 0){
    document.getElementById('emptyCart').innerHTML = "העגלה ריקה";
}
if (counter > 0){
    document.getElementById('paymentbtn').style.display = 'block';
    document.getElementById('saah').style.display = 'block';
    document.getElementById('saah').style.display = 'flex';
}

let product = {
    name:"watch",
    price: 5000,
}

function addproduct(product) {
    document.getElementById('addToCart').onclick 
}