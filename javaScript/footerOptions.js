document.querySelectorAll('.middlepage-btn').forEach(button => {
    button.addEventListener('click', () => {
        const hiddencontent = button.closest('.middlepage-span').nextElementSibling;
        if (hiddencontent.classList.contains('open')) {
            hiddencontent.classList.remove('open');
            button.textContent = '+';
        } else {
            hiddencontent.classList.add('open');
            button.textContent = '-';
        }
    });
});

document.querySelector('#collink1').addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:5501/html.page/home.html';
});
document.querySelector('#collink2').addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:5501/html.page/footerOptionsInfo1.html';
});
document.querySelector('#collink3').addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:5501/html.page/footerOptionsInfo2.html';
});
document.querySelector('#collink4').addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:5501/html.page/footerOptionsInfo3.html';
});
document.querySelector('#collink5').addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:5501/html.page/footerOptionsInfo4.html';
});
document.querySelector('#collink6').addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:5501/html.page/footerOptionsInfo5.html';
});
document.querySelector('#collink7').addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:5501/html.page/footerOptionsHelp1.html';
});
document.querySelector('#collink8').addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:5501/html.page/footerOptionsHelp2.html';
});


document.getElementById('col4').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const emailInput = document.getElementById('col4-Email');
    const NameInput = document.getElementById('col4-name');
    document.getElementById('col4-p').style.display = 'block';
    emailInput.value = '';
    NameInput.value = '';

});