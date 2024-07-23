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
    document.querySelector('.safePayment').style.display = 'flex';
    document.querySelector('.self-collecting').style.display = 'none';
    document.getElementById('summary-delivery-value').textContent = '₪20'
    document.getElementById('summary-sikum-value').textContent = totalPriceDelivery();
    document.getElementById('summary-total-num').textContent = totalPriceToPay();
});

option2.addEventListener('click', () => {
    selectOption(option2);
    document.querySelector('.safePayment').style.display = 'none';
    document.querySelector('.self-collecting').style.display = 'flex';
    document.getElementById('summary-delivery-value').textContent = '₪0'
    document.getElementById('summary-sikum-value').textContent = totalPriceDelivery();
    document.getElementById('summary-total-num').textContent = totalPriceToPay();
});


function selectOption(selectedOption) {
    option1.classList.remove('selected');
    option2.classList.remove('selected');
    selectedOption.classList.add('selected');
}

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

//////////////////////////////////////////////////////////
const email = document.getElementById('contactEmail');

function validateEmail(email) {
    const emailRegex1 = /^[^\s@]+@gmail\.com$/;
    const emailRegex2 = /^[^\s@]+@yahoo\.com$/;
    const emailRegex3 = /^[^\s@]+@colman\.ac.com$/;

    if (!emailRegex1.test(email) && !emailRegex2.test(email) && !emailRegex3.test(email)) {
        return false; 
    }
    return true; 
}

email.addEventListener("input",function(event){
    const box = document.getElementById('contactEmail');
    const em = email.value;
    if (validateEmail(em)) {
        box.style.borderBottom = '2px solid green'; 
    } else {
        box.style.borderBottom = '2px solid red'; 
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
const creditCardnumber = document.getElementById('CCnumber');

creditCardnumber.addEventListener("input",function(event){
    const box = document.getElementById('CCnumber');
    const CC = creditCardnumber.value;
    if (validCreditCardnumber(CC)) {
        box.style.borderBottom = '2px solid green'; 
    } else {
        box.style.borderBottom = '2px solid red'; 
    }
})

function validCreditCardnumber(details) {
    const creditCardRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
    if (!creditCardRegex.test(details)) {
        return false;
    }
    return true;
}

//////////////////////////////////////////////////////////
const creditCardid = document.getElementById('CCid');

creditCardid.addEventListener("input",function(event){
    const box = document.getElementById('CCid');
    const CC = creditCardid.value;
    if (validCreditCardid(CC)) {
        box.style.borderBottom = '2px solid green'; 
    } else {
        box.style.borderBottom = '2px solid red'; 
    }
})

function validCreditCardid(details) {
    const nineDigitsRegex = /^\d{9}$/;
    if (!nineDigitsRegex.test(details)) {
        return false;
    }
    return true;
}

/////////////////////////////////////////////////////
const creditCardcvv = document.getElementById('CCcvv');
const appartment = document.getElementById('apartment');

creditCardcvv.addEventListener("input",function(event){
    const box = document.getElementById('CCcvv');
    const CC = creditCardcvv.value;
    if (validCreditCardcvv(CC)) {
        box.style.borderBottom = '2px solid green'; 
    } else {
        box.style.borderBottom = '2px solid red'; 
    }
})
appartment.addEventListener("input",function(event){
    const box = document.getElementById('apartment');
    const CC = appartment.value;
    if (validapartment(CC)) {
        box.style.borderBottom = '2px solid green'; 
    } else {
        box.style.borderBottom = '2px solid red'; 
    }
})

function validapartment(details) {
    const numberRegex = /^(?:[1-9]|[1-9][0-9]{1,2})$/;
    if (!numberRegex.test(details)) {
        return false;
    }
    return true;
}

function validCreditCardcvv(details) {
    const threeDigitsRegex = /^\d{3}$/;
    if (!threeDigitsRegex.test(details)) {
        return false;
    }
    return true;
}
////////////////////////////////////////////////////
const creditCarddate = document.getElementById('CCdate');

creditCarddate.addEventListener("input",function(event){
    const box = document.getElementById('CCdate');
    const CC = creditCarddate.value;
    if (validCreditCarddate(CC)) {
        box.style.borderBottom = '2px solid green'; 
    } else {
        box.style.borderBottom = '2px solid red'; 
    }
})


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

    if (inputDate >= now) {
        return true;
    }
    return false;
}



/////////////////////////////////////////////////////////////
///cart to payment///

function loadpayment() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.querySelector('.cart-to-payment-items');
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

        hiddenContent.insertBefore(displayText, textarea);
        textarea.style.display = 'none'; 
    }
}

function clearReviewOnPayment() {
    sessionStorage.removeItem('review');
}

document.addEventListener('DOMContentLoaded', () => {
    loadSavedReview();
});

function loadCartTotal() {
    const cartTotal = sessionStorage.getItem('cartTotal');
    if (cartTotal) {
        document.getElementById('summary-total-cart-value').textContent = cartTotal;
    }
     
}
    
 
function totalPriceDelivery() {
    const cartTotal = parseFloat(document.getElementById('summary-total-cart-value').textContent.replace('₪', '')) || 0;
    const deliveryCost = parseFloat(document.getElementById('summary-delivery-value').textContent.replace('₪', '')) || 0;
    const total = cartTotal + deliveryCost;
    return total.toFixed(2) + '₪';
}

function totalPriceToPay(){
    const total = parseFloat(totalPriceDelivery()) * 1.18;
    return total.toFixed(2) + '₪';
}


document.addEventListener('DOMContentLoaded', () => {
    loadCartTotal();
});
  
loadpayment();
