document.getElementById('openMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '250px';
});
document.getElementById('closeMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '0';
});
/*///////////////////////////////////////////////////////////////////*/

$('nav ul li a').click(function(e) {
    e.preventDefault();
    $('section').removeClass('active');
    $($(this).attr('href')).addClass('active');
});