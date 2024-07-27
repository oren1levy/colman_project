document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('logo').addEventListener('click', function() {
        window.location.href = '../html.page/home.html';
    });

    const map = L.map('map').setView([32.0853, 34.7818], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    fetch('http://localhost:3000/api/locations/getAllLocations')
        .then(response => response.json())
        .then(data => {
            data.forEach(location => {
                L.marker([location.lat, location.lng]).addTo(map)
                    .bindPopup(location.title)
                    .openPopup();
            });
        })
        .catch(error => console.error('Error fetching locations:', error));
});
