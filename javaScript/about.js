document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('logo').addEventListener('click', function() {
        window.location.href = '../html.page/home.html';
    });

    const map = L.map('map').setView([32.0853, 34.7818], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const locations = [
        { lat: 32.0853, lng: 34.7818, title: "ארלוזורוב 20, תל אביב" },
        { lat: 32.0735, lng: 34.7811, title: "דיזינגוף 80, תל אביב" },
        { lat: 32.0847, lng: 34.7689, title: "הירקון 70, תל אביב" },
        { lat: 32.0877, lng: 34.7706, title: "משה שרת 5, תל אביב" },
        { lat: 32.0916, lng: 34.7748, title: "נהלל 10, תל אביב" }
    ];

    locations.forEach(location => {
        L.marker([location.lat, location.lng]).addTo(map)
            .bindPopup(location.title)
            .openPopup();
    });
    
});