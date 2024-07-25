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
});

option2.addEventListener('click', () => {
    selectOption(option2);
    document.querySelector('.safePayment').style.display = 'none';
    document.querySelector('.self-collecting').style.display = 'flex';
    document.getElementById('summary-delivery-value').textContent = '₪0'
    document.getElementById('summary-total-num').textContent = totalPriceDelivery();
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


document.addEventListener('DOMContentLoaded', () => {
    loadCartTotal();
});
  
function generateOrderId(length = 15) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

loadpayment();

document.getElementById('backtohome').addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:5501/html.page/home.html';
});

/////////////////////////////////////////////////////////////////////
//////////////////payment to DataBase/////////////////////

/////////////////////////////////ניסיון 1

// document.addEventListener('DOMContentLoaded', function() {

// document.querySelector('.safePaymentForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     const streetName = document.getElementById('address').value;
//     const city = document.getElementById('city').value;
//     const postal = document.getElementById('mikud').value;
//     const phoneNumber = document.getElementById('Phonenumber').value;
//     const price = totalPriceDelivery();
//     function getUserData(userToken) {
//         if (userToken) {
//             fetch(`http://localhost:3000/api/users/searchUser/${userToken}`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             .then(response => response.json())
//     }}
//     function getProductIdsFromCart() {
//         const cart = JSON.parse(localStorage.getItem('cart')) || [];
//         return cart.map(item => item.productId);
//     }
//     const productsId = getProductIdsFromCart();
//     const userToken = localStorage.getItem('userToken');
//     const userID = getUserData(userToken)
 


//     const raw = JSON.stringify({
//         _id: userID,
//         streetname: streetName,
//         city: city,
//         phone: phoneNumber,
//         postalcode: postal,
//         productsId: productsId,
//         totalPrice: price
//     });

//     const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//         redirect: "follow"
//     };

//     fetch("http://localhost:3000/api/orders/", requestOptions)
//         .then(response => response.json()) 
//         .then(result => {
//             console.log(result)
//             if (result.message == 'Invalid order'){
//                 alert("something is incorrect");
//             }
//             else{
//                 localStorage.setItem("userToken",result._id); 
//                 window.location.href = "home.html";
//             }
//         })
//         .catch(error => console.error('Error:', error));
// });
// });

///////////////////////////////////ניסיון 2

// document.addEventListener('DOMContentLoaded', function() {
//     document.querySelector('.safePaymentForm').addEventListener('submit', async function(event) {
//         event.preventDefault();

//         const myHeaders = new Headers();
//         myHeaders.append("Content-Type", "application/json");

//         const streetName = document.getElementById('address').value;
//         const city = document.getElementById('city').value;
//         const postal = document.getElementById('mikud').value;
//         const phoneNumber = document.getElementById('Phonenumber').value;
//         const price = totalPriceDelivery();

//         async function getUserData(userToken) {
//             if (userToken) {
//                 const response = await fetch(`http://localhost:3000/api/users/searchUser/${userToken}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 });
//                 return response.json();
//             }
//             return null;
//         }

//         function getProductIdsFromCart() {
//             const cart = JSON.parse(localStorage.getItem('cart')) || [];
//             return cart.map(item => item.productId);
//         }

//         const productsId = getProductIdsFromCart();
//         const userToken = localStorage.getItem('userToken');
//         const userData = await getUserData(userToken);
//         const userID = userData ? userData._id : null;

//         const raw = JSON.stringify({
//             _id: userID,
//             streetname: streetName,
//             city: city,
//             phone: phoneNumber,
//             postalcode: postal,
//             productsId: productsId,
//             totalPrice: price
//         });

//         const requestOptions = {
//             method: "POST",
//             headers: myHeaders,
//             body: raw,
//             redirect: "follow"
//         };

//         fetch("http://localhost:3000/api/orders/", requestOptions)
//             .then(response => response.json()) 
//             .then(result => {
//                 console.log(result);
//                 if (result.message == 'Invalid order'){
//                     alert("something is incorrect");
//                 } else {
//                     localStorage.setItem("userToken", result._id); 
//                     // window.location.href = "home.html";
//                 }
//             })
//             .catch(error => console.error('Error:', error));
//     });
// });

///////////////////////////////////////ניסיון 3

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.safePaymentForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const streetName = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const postal = document.getElementById('mikud').value;
        const phoneNumber = document.getElementById('Phonenumber').value;
        const price = parseFloat(totalPriceDelivery().replace(/[^\d.-]/g, '')); 
        // const address = `${streetName}`;

      
        // function getUserData(userToken){
        //     if (userToken) {
        //         fetch(`http://localhost:3000/api/users/searchUser/${userToken}`, {
        //             method: 'GET',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             }
        //         })
        //         .then(response => response.json())
        //         .then(data => {
        //             if (data._id) {
        //                 return data._id;
        //             } else {
        //                 console.error('User Id not found');
        //             }
        //         })
        //         .catch(error => console.error('Error fetching user data:', error));
        //     } 
        //     else {
        //         console.error('User token not found');
        //     }
        // }
        async function getUserData(userToken) {
            if (userToken) {
                try {
                    const response = await fetch(`http://localhost:3000/api/users/searchUser/${userToken}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
        
                    // Check if the response is ok
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
        
                    const data = await response.json();
        
                    // Check if _id exists in the response
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
        

        function getProductIdsFromCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            return cart.map(item => item.productId).join(','); 
        }

        const productsId = getProductIdsFromCart();
        const userToken = localStorage.getItem('userToken');
        const userData = await getUserData(userToken);

        const raw = JSON.stringify({
            address: streetName,
            city: city,
            phone: phoneNumber,
            postalCode: postal,
            productsId: productsId,
            totalPrice: price,
            userId: userData
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
    });
});

