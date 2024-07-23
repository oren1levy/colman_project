
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.toggle-description-btn');
    const descriptionContent = document.querySelector('.product-description-content');

    toggleButton.addEventListener('click', () => {
        if (descriptionContent.style.display === 'none' || descriptionContent.style.display === '') {
            descriptionContent.style.display = 'block';
            toggleButton.textContent = '-'; 
        } else {
            descriptionContent.style.display = 'none';
            toggleButton.textContent = '+'; 
        }
    });
});


document.querySelectorAll('.thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        const mainImage = document.getElementById('mainImage');
        mainImage.src = this.src;
    });
});









