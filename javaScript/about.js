document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('logo').addEventListener('click', function() {
        window.location.href = '../html.page/home.html';
    });

    const map = L.map('map').setView([32.0853, 34.7818], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const locations = [
        { lat: 31.9716, lng: 34.7721,title: "זלמן שזר 17 ראשון לציון"}
    ];

    locations.forEach(location => {
        L.marker([location.lat, location.lng]).addTo(map)
            .bindPopup(location.title)
            .openPopup();
    });
    
});