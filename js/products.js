/* Urban Crumb Bakery - dynamic product listing (products.html)
   Renders product cards from a data array, with live search,
   category filter, sorting and a details modal. */
(function () {
    'use strict';

    var PRODUCTS = [
        { id: 1,  name: 'Farmhouse White Loaf',    category: 'Bread',    price: 35,  img: 'bread',     desc: 'Soft, golden white loaf baked fresh each morning. Ideal for toast and sandwiches.' },
        { id: 2,  name: 'Seeded Brown Bread',      category: 'Bread',    price: 42,  img: 'bread',     desc: 'Wholesome brown loaf packed with sunflower, pumpkin and linseed.' },
        { id: 3,  name: 'Rye Sourdough',           category: 'Bread',    price: 55,  img: 'bread',     desc: 'Slow-fermented sourdough with a crisp crust and a tangy crumb.' },
        { id: 4,  name: 'Butter Croissant',        category: 'Pastries', price: 20,  img: 'pastries',  desc: 'Flaky, buttery layers baked until deep golden. Best enjoyed warm.' },
        { id: 5,  name: 'Blueberry Muffin',        category: 'Pastries', price: 25,  img: 'pastries',  desc: 'Moist muffin bursting with blueberries and a sugar-crunch top.' },
        { id: 6,  name: 'Custard Danish',          category: 'Pastries', price: 28,  img: 'pastries',  desc: 'Laminated pastry filled with vanilla custard and glazed apricot.' },
        { id: 7,  name: 'Birthday Celebration Cake', category: 'Cakes',  price: 350, img: 'cakes',     desc: 'Custom-decorated sponge cake for birthdays. Choose your flavour and colours.' },
        { id: 8,  name: 'Red Velvet Cake',         category: 'Cakes',    price: 420, img: 'cakes',     desc: 'Layers of red velvet sponge with cream cheese frosting.' },
        { id: 9,  name: 'Three-Tier Wedding Cake', category: 'Cakes',    price: 1800, img: 'cakes',    desc: 'An elegant tiered cake designed with you. Consultation required.' },
        { id: 10, name: 'Pastry Platter',          category: 'Catering', price: 250, img: 'catering',  desc: 'Assorted mini pastries and savoury bites. Serves 8 to 10 people.' },
        { id: 11, name: 'Breakfast Box',           category: 'Catering', price: 320, img: 'catering',  desc: 'Croissants, muffins, fruit and spreads, boxed for office meetings.' },
        { id: 12, name: 'Dessert Selection',       category: 'Catering', price: 480, img: 'catering',  desc: 'A curated mix of tarts, brownies and mini cakes. Serves 12 to 15.' }
    ];

    var grid = document.getElementById('product-grid');
    if (!grid) { return; }

    var searchInput = document.getElementById('product-search');
    var categorySelect = document.getElementById('product-category');
    var sortSelect = document.getElementById('product-sort');
    var countEl = document.getElementById('product-count');
    var emptyEl = document.getElementById('product-empty');
    var resetBtn = document.getElementById('product-reset');

    function formatPrice(n) { return 'R' + n.toLocaleString('en-ZA'); }

    function buildCard(p) {
        var card = document.createElement('article');
        card.className = 'card reveal reveal--visible';

        var img = document.createElement('img');
        img.src = 'images/' + p.img + '-800.jpg';
        img.srcset = 'images/' + p.img + '-400.jpg 400w, images/' + p.img + '-800.jpg 800w';
        img.sizes = '(max-width: 48em) 100vw, 33vw';
        img.alt = p.name + ' - ' + p.category.toLowerCase() + ' from Urban Crumb Bakery';
        img.loading = 'lazy';
        img.width = 800;
        img.height = 600;

        var body = document.createElement('div');
        body.className = 'card__body';

        var badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = p.category;

        var h3 = document.createElement('h3');
        h3.textContent = p.name;

        var desc = document.createElement('p');
        desc.textContent = p.desc;

        var price = document.createElement('p');
        price.className = 'card__price';
        price.textContent = 'From ' + formatPrice(p.price);

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'button button--secondary button--small';
        btn.textContent = 'View details';
        btn.setAttribute('aria-label', 'View details for ' + p.name);
        btn.addEventListener('click', function () { openModal(p, btn); });

        body.append(badge, h3, desc, price, btn);
        card.append(img, body);
        return card;
    }

    function render() {
        var term = searchInput.value.trim().toLowerCase();
        var cat = categorySelect.value;
        var sort = sortSelect.value;

        var list = PRODUCTS.filter(function (p) {
            var matchesText = !term || (p.name + ' ' + p.desc + ' ' + p.category).toLowerCase().indexOf(term) !== -1;
            var matchesCat = cat === 'all' || p.category === cat;
            return matchesText && matchesCat;
        });

        list.sort(function (a, b) {
            if (sort === 'price-asc') { return a.price - b.price; }
            if (sort === 'price-desc') { return b.price - a.price; }
            if (sort === 'name') { return a.name.localeCompare(b.name); }
            return a.id - b.id;
        });

        grid.innerHTML = '';
        list.forEach(function (p) { grid.appendChild(buildCard(p)); });

        countEl.textContent = 'Showing ' + list.length + ' of ' + PRODUCTS.length + ' products';
        emptyEl.hidden = list.length !== 0;
    }

    ['input', 'change'].forEach(function (evt) {
        searchInput.addEventListener(evt, render);
    });
    categorySelect.addEventListener('change', render);
    sortSelect.addEventListener('change', render);
    resetBtn.addEventListener('click', function () {
        searchInput.value = '';
        categorySelect.value = 'all';
        sortSelect.value = 'default';
        render();
        searchInput.focus();
    });

    /* ---------- Details modal ---------- */
    var modal = document.getElementById('product-modal');
    var modalTitle = document.getElementById('modal-title');
    var modalBody = document.getElementById('modal-body');
    var modalImg = document.getElementById('modal-img');
    var modalClose = document.getElementById('modal-close');
    var modalEnquire = document.getElementById('modal-enquire');
    var returnFocus = null;

    function openModal(p, trigger) {
        returnFocus = trigger;
        modalTitle.textContent = p.name;
        modalBody.textContent = p.desc + ' Prices start from ' + formatPrice(p.price) + '.';
        modalImg.src = 'images/' + p.img + '-800.jpg';
        modalImg.alt = p.name;
        modalEnquire.href = 'enquiry.html?product=' + encodeURIComponent(p.name);
        modal.hidden = false;
        document.body.classList.add('no-scroll');
        modalClose.focus();
    }
    function closeModal() {
        modal.hidden = true;
        document.body.classList.remove('no-scroll');
        if (returnFocus) { returnFocus.focus(); }
    }
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) { closeModal(); } });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.hidden) { closeModal(); }
    });

    render();
})();
