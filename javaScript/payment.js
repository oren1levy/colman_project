document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('logo').addEventListener('click', function() {
        window.location.href = '../html.page/home.html';
 });
 
document.getElementById('openMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '250px';
});
document.getElementById('closeMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '0';
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
//////////////////////////////////////////////////////////////////////
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');

option1.addEventListener('click', () => {
    selectOption(option1);
    cartprice1 = document.getElementById('summary-total-cart-value').textContent;
    let cartprice = parseFloat(cartprice1.replace(/[^\d.-]/g, ''));
    document.querySelector('.safePayment').style.display = 'flex';
    document.querySelector('.self-collecting').style.display = 'none';
    document.getElementById('summary-delivery-value').textContent = '₪20';
    document.getElementById('summary-total-num').textContent = totalPriceDelivery();
    document.getElementById('city').value = '';
    document.getElementById('address').value = '';
    document.getElementById('mikud').value = '';
    document.getElementById('Phonenumber').value = '';
    document.getElementsByClassName('box')[3].style.borderBottom = '1px solid black';
});

option2.addEventListener('click', () => {
    selectOption(option2);
    document.querySelector('.self-collecting').style.display = 'flex';
    document.getElementById('summary-delivery-value').textContent = '₪0'
    document.getElementById('summary-total-num').textContent = totalPriceDelivery();
    const city = document.getElementById('city');
    city.readOnly = true;
    city.value = 'איסוף עצמי';
    const addrress = document.getElementById('address');
    addrress.readOnly = true;
    addrress.value = 'איסוף עצמי';
    const mikud = document.getElementById('mikud');
    mikud.readOnly = true;
    mikud.value = 'איסוף עצמי';
    document.getElementsByClassName('box')[3].style.borderBottom = '2px solid green';
});


function selectOption(selectedOption) {
    option1.classList.remove('selected');
    option2.classList.remove('selected');
    selectedOption.classList.add('selected');
}
//////////////////////////////////////////////////////////////////////
const email = document.getElementById('contactEmail');

function validateEmail(email) {
    const emailRegex1 = /^[^\s@]+@gmail\.com$/;
    const emailRegex2 = /^[^\s@]+@yahoo\.com$/;
    if (!emailRegex1.test(email) && !emailRegex2.test(email)) {
        return false; 
    }
    return true; 
}

email.addEventListener("input", function(event) {
    const box = document.getElementById('contactEmail');
    const email = box.value;
    if(validateEmail(email)) {
        box.style.borderBottom = '2px solid green'; 
    }
    else {
        box.style.borderBottom = '2px solid red'; 
    }
})
//////////////////////////////////////////////////////////////////////
const phoneNumber = document.getElementById('Phonenumber');

function validPhoneNumber(phonenumber) {
    const phonenumberregex = /^\d{10}$/;
    if(!phonenumberregex.test(phonenumber)) {
        return false;
    }
    return true;
}

phoneNumber.addEventListener("input", function(event) {
    const box = document.getElementById('Phonenumber');
    const Pn = phoneNumber.value;
    if(validPhoneNumber(Pn)) {
        box.style.borderBottom = '2px solid green'; 
    }
    else {
        box.style.borderBottom = '2px solid red'; 
    }
})
//////////////////////////////////////////////////////////

const Name = document.getElementById('first-name');
const lastName = document.getElementById('last-name');

function validName(name) {
    const nameregex = /^[a-zA-Z\u0590-\u05FF]+$/;
    if(!nameregex.test(name)) {
        return false;
    }
    return true;
}

Name.addEventListener("input", function(event) {
    const box1 = document.getElementById('first-name');
    const box2 = document.getElementById('last-name');
    const firstname = Name.value;
    const lastname = lastName.value;

    if(validName(firstname)) {
        box1.style.borderBottom = '2px solid green'; 
    }
    else {
        box1.style.borderBottom = '2px solid red'; 
    }

})

lastName.addEventListener("input", function(event) {
    const box2 = document.getElementById('last-name');
    const lastname = lastName.value;

    if(validName(lastname)) {
        box2.style.borderBottom = '2px solid green'; 
    }
    else {
        box2.style.borderBottom = '2px solid red'; 
    }

})



/////////////////////////////////////////////////////////////

$( function() {
    var availableTags = [
      "אום אל פחם",
      "אשדוד",
      "אור-יהודה",
      "אשקלון",
      "בני ברק",
      "בת-ים",
      "גבעת-שמואל",
      "גבעתיים",
      "הוד השרון",
      "הרצליה",
      "חדרה",
      "חולון",
      "יבנה",
      "יהוד-מונוסון",
      "ירושלים",
      "לוד",
      "מודיעין",
      "מכבים",
      "רעות",
      "נס-ציונה",
      "פתח-תקווה",
      "קריית אונו",
      "קריית-גת",
      "קריית-מלאכי",
      "ראשון לציון",
      "רחובות",
      "רמלה",
      "רמת גן", 
      "רמת השרון", 
      "רעננה", 
      "שהם", 
      "תל אביב-יפו"
    ];
    $( "#city" ).autocomplete({
      source: availableTags
    });
  } );


const cityInput = document.getElementById('city');

cityInput.addEventListener("input", function(event) {
    const box = document.getElementById('city');
    const cityName = cityInput.value;

    if ((availableTags) => {
        return validCityNames.includes(cityName);
    }) {
        box.style.borderBottom = '2px solid green'; 
    } else {
        box.style.borderBottom = '2px solid red'; 
    }
});


/////////////////////////////////////////////////////////////
function formatCreditCardNumber(value) {
    return value.replace(/\s+/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
}

    const creditCardNumber = document.getElementById('CCnumber');

    creditCardNumber.addEventListener("input", function(event) {
        let value = creditCardNumber.value.replace(/\D/g, ''); 
        creditCardNumber.value = formatCreditCardNumber(value);

        if (value.length > 16) {
            value = value.slice(0, 16);
        }

        const CC = creditCardNumber.value.replace(/\s+/g, '');
        if (validCreditCardNumber(CC)) {
            creditCardNumber.style.borderBottom = '2px solid green';
        } else {
            creditCardNumber.style.borderBottom = '2px solid red';
        }
    });

function validCreditCardNumber(details) {
    const creditCardRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
    const regex = /^\d{16}$/;

    return regex.test(details) || creditCardRegex.test(details);
}

//////////////////////////////////////////////////////////
const creditCardid = document.getElementById('CCid');
creditCardid.addEventListener("input", function(event) {
    let value = creditCardid.value.replace(/\D/g, '');

    creditCardid.value = value; 

    const box = document.getElementById('CCid');
    const CC = creditCardid.value;
    if (validCreditCardid(CC)) {
        box.style.borderBottom = '2px solid green';
    } else {
        box.style.borderBottom = '2px solid red';
    }
});

function validCreditCardid(details) {
    const nineDigitsRegex = /^\d{9}$/;
    if (!nineDigitsRegex.test(details)) {
        return false;
    }
    return true;
}

/////////////////////////////////////////////////////
const creditCardcvv = document.getElementById('CCcvv');
creditCardcvv.addEventListener("input", function(event) {
    let value = creditCardcvv.value.replace(/\D/g, '');

    creditCardcvv.value = value; 

    const box = document.getElementById('CCcvv');
    const CC = creditCardcvv.value;
    if (validCreditCardcvv(CC)) {
        box.style.borderBottom = '2px solid green';
    } else {
        box.style.borderBottom = '2px solid red';
    }
});


function validCreditCardcvv(details) {
    const threeDigitsRegex = /^\d{3}$/;
    if (!threeDigitsRegex.test(details)) {
        return false;
    }
    return true;
}
//////////////////////////////////////////////////////
const creditCarddate = document.getElementById('CCdate');

creditCarddate.addEventListener("input", function(event) {
    const box = document.getElementById('CCdate');
    let CC = creditCarddate.value;

    if (CC.length === 2 && !CC.includes('/')) {
        CC += '/';
        creditCarddate.value = CC;
    }

    if (validCreditCarddate(CC)) {
        box.style.borderBottom = '2px solid green'; 
    } else {
        box.style.borderBottom = '2px solid red'; 
    }
});

function validCreditCarddate(datePlate) {
    const dateregex = /^(0[1-9]|1[0-2])\/(2[4-9]|[3-9][0-9])$/;
    if (!dateregex.test(datePlate)) {
        return false;
    }

    const parts = datePlate.split("/");
    const month = parseInt(parts[0], 10);
    const year = parseInt("20" + parts[1], 10); 

    const now = new Date();
    const inputDate = new Date(year, month - 1);

    return inputDate >= now;
}

/////////////////////////////////////////////////////////////
///cart to payment///

function loadpayment() {
    const cartItems = JSON.parse(localStorage.getItem(`cart_${userToken}`)) || [];
    const cartItemsContainer = document.querySelector('.cart-to-payment-items');
    cartItemsContainer.innerHTML = ''; 
    

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img id="cart-item-Img" src="${item.productImg}" alt="${item.productName}">
            <span class="cart-item-Details">
                <span id="cart-item-Name">${item.productName}</span>
                <span id="cart-item-quantity-text"><span id="cart-item-Quantity">${item.quantity}</span><span id=cart-item-Quantity>:כמות</span></span>
                <span id="cart-item-Price">₪${(item.productPrice).toFixed(2)}</span>
                <span id="cart-item-Id">${item.productId}</span>
            </span>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

function loadSavedReview() {
    const savedReview = sessionStorage.getItem('review');
    if (savedReview) {
        const hiddenContent = document.querySelector('.hidden-content');
        const textarea = document.getElementById("reviewInput");
        document.getElementById('payment-reviews-text').textContent = savedReview;
    }
}



function loadCartTotal() {
    const cartTotal = sessionStorage.getItem('cartTotal');
    if (cartTotal) {
        let cartTotalNumber = parseFloat(cartTotal.replace(/[₪\s,]/g, ''));
        let discountedPrice = cartTotalNumber * (1 - 0.18);
        let formattedDiscountedPrice = `₪${discountedPrice.toFixed(2)}`;
        document.getElementById('summary-total-cart-value').textContent = formattedDiscountedPrice;
        let cartTotalNumber2 = parseFloat(cartTotal.replace(/[₪\s,]/g, ''));
        let discountedPrice2 = cartTotalNumber2 * (1 - 0.82);
        let formattedDiscountedPrice2 = `₪${discountedPrice2.toFixed(2)}`;
        document.getElementById('summary-tax-value').textContent = formattedDiscountedPrice2; 
        document.getElementById('summary-sikum-value').textContent = cartTotal
    }
    const orderId = generateOrderId(15);
    document.getElementById('order-id-number').textContent = orderId; 
}
  
 
function totalPriceDelivery() {
    const cartTotal = sessionStorage.getItem('cartTotal');
    let cartTotalNumber = parseFloat(cartTotal.replace(/[₪\s,]/g, ''));
    const deliveryCost = parseFloat(document.getElementById('summary-delivery-value').textContent.replace('₪', '')) || 0;
    const total = cartTotalNumber + deliveryCost;
    return total.toFixed(2) + '₪';
}

loadCartTotal();
  
function generateOrderId(length = 15) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

loadSavedReview();
loadpayment();

/////////////////////////////////////////////////////////////////////
//////////////////payment to DataBase/////////////////////


    document.querySelector('.safePaymentForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const boxes = document.getElementsByClassName('box');
        let allFieldsValid = true;
        for (const box of boxes) {
            if (box.style.borderBottom !== '2px solid green') {
                allFieldsValid = false;
                break;
            }
        }
       
        if (!allFieldsValid) {
            alert('You did not fill in all the fields correctly');
        } else {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const streetName = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const postal = document.getElementById('mikud').value;
        const phoneNumber = document.getElementById('Phonenumber').value;
        const bill = document.getElementById('order-id-number').innerText;
        const price = parseFloat(totalPriceDelivery().replace(/[^\d.-]/g, '')); 

  
        async function getUserData(userToken) {
            if (userToken) {
                try {
                    const response = await fetch(`http://localhost:3000/api/users/searchUser/${userToken}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
        
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
        
                    const data = await response.json();
        
                    if (data._id) {
                        return data._id;
                    } else {
                        console.error('User Id not found');
                        return null;
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    return null;
                }
            } else {
                console.error('User token not found');
                return null;
            }
        }
        const userToken = localStorage.getItem('userToken');

        function getProductIdsFromCart() {
            const cart = JSON.parse(localStorage.getItem(`cart_${userToken}`)) || [];
            const productIds = cart.map(item => `"${item.productId}"`);
            return productIds.join(', ');
        }

        const productsId = getProductIdsFromCart();
        const userData = await getUserData(userToken);

        const raw = JSON.stringify({
            address: streetName,
            city: city,
            phone: phoneNumber,
            postalCode: postal,
            productsId: productsId,
            totalPrice: price,
            userId: userData,
            billNumber: bill
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:3000/api/orders/", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                if (result.message === 'Invalid order') {
                    alert("Something is incorrect");
                } else {
                    window.location.href = "home.html";
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
            clearCart();
        }
    });
});

const userToken = localStorage.getItem('userToken');

function clearCart() {
    localStorage.removeItem('cartItems');
    localStorage.removeItem(`cart_${userToken}`);
    sessionStorage.removeItem('review');
    updateCartDisplay();
    document.getElementById('payment-reviews-text').textContent = ''; 
    console.log("Cart has been cleared");
}



