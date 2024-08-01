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

document.getElementById('logo').addEventListener('click',function(){
    window.location.href = '../html.page/home.html';
});






