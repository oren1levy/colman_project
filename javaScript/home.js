document.getElementById('openMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '250px';
});
document.getElementById('closeMenu').addEventListener('click', function() {
    document.getElementById('sideMenu').style.width = '0';
});
/*//////////////////////////////////////////////////////////////////*/

document.addEventListener('DOMContentLoaded', () => {
    const companyInfo = document.querySelector('.home-aboutUs');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                companyInfo.classList.add('visible');
            } else {
                companyInfo.classList.remove('visible');
            }
        });
    }, {
        threshold: [1.0]
    });

    const dummyElement = document.createElement('div');
    document.body.appendChild(dummyElement);
    dummyElement.className = 'dummydiv';

    observer.observe(dummyElement);
});