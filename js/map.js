/* Urban Crumb Bakery - interactive branch map (contact.html)
   Uses Leaflet with OpenStreetMap tiles. Coordinates are approximate. */
(function () {
    'use strict';

    var mapEl = document.getElementById('map');
    if (!mapEl || typeof L === 'undefined') { return; }

    var branches = [
        { id: 'cbd',    name: 'Pretoria CBD Branch', address: '120 Church Street, Pretoria Central', phone: '012 555 0147', coords: [-25.7461, 28.1881] },
        { id: 'menlyn', name: 'Menlyn Branch',       address: '55 Atterbury Road, Menlyn',            phone: '012 555 0148', coords: [-25.7853, 28.2772] }
    ];

    var map = L.map('map', { scrollWheelZoom: false }).setView([-25.765, 28.23], 11);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var markers = {};
    branches.forEach(function (b) {
        var popup = document.createElement('div');
        var title = document.createElement('strong');
        title.textContent = b.name;
        var addr = document.createElement('p');
        addr.textContent = b.address;
        var tel = document.createElement('a');
        tel.href = 'tel:+27' + b.phone.replace(/\s/g, '').slice(1);
        tel.textContent = b.phone;
        popup.append(title, addr, tel);

        markers[b.id] = L.marker(b.coords, { title: b.name, alt: b.name }).addTo(map).bindPopup(popup);
    });

    /* Buttons beside the map fly to a branch */
    document.querySelectorAll('[data-branch]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var id = btn.getAttribute('data-branch');
            var b = branches.filter(function (x) { return x.id === id; })[0];
            map.flyTo(b.coords, 15, { duration: 1.2 });
            markers[id].openPopup();
            mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });

    /* Allow scroll-zoom only after the map has been clicked */
    map.on('click', function () { map.scrollWheelZoom.enable(); });
    map.on('mouseout', function () { map.scrollWheelZoom.disable(); });
})();
