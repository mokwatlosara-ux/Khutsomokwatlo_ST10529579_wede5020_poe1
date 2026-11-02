/* Urban Crumb Bakery - shared site behaviour (all pages)
   Part 3: scroll-reveal animation, back-to-top, mobile-nav auto close,
   accordion, tabs and the gallery lightbox. Each feature only runs if
   its markup exists on the current page. */
(function () {
    'use strict';

    /* ---------- 1. Scroll-reveal animation (IntersectionObserver) ---------- */
    var revealItems = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealItems.length) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealItems.forEach(function (el) { observer.observe(el); });
    } else {
        revealItems.forEach(function (el) { el.classList.add('reveal--visible'); });
    }

    /* ---------- 2. Close the mobile menu after a link is chosen ---------- */
    var navToggle = document.getElementById('nav-toggle');
    document.querySelectorAll('.site-nav a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (navToggle) { navToggle.checked = false; }
        });
    });

    /* ---------- 3. Back-to-top button (created with DOM manipulation) ---------- */
    var topBtn = document.createElement('button');
    topBtn.type = 'button';
    topBtn.className = 'back-to-top';
    topBtn.setAttribute('aria-label', 'Back to top');
    topBtn.textContent = '\u2191';
    document.body.appendChild(topBtn);

    window.addEventListener('scroll', function () {
        topBtn.classList.toggle('back-to-top--show', window.scrollY > 400);
    }, { passive: true });
    topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---------- 4. Accordion (one panel open at a time) ---------- */
    document.querySelectorAll('.accordion').forEach(function (accordion) {
        var triggers = accordion.querySelectorAll('.accordion__trigger');

        triggers.forEach(function (trigger) {
            trigger.addEventListener('click', function () {
                var isOpen = trigger.getAttribute('aria-expanded') === 'true';

                triggers.forEach(function (other) {
                    other.setAttribute('aria-expanded', 'false');
                    document.getElementById(other.getAttribute('aria-controls')).hidden = true;
                });

                if (!isOpen) {
                    trigger.setAttribute('aria-expanded', 'true');
                    document.getElementById(trigger.getAttribute('aria-controls')).hidden = false;
                }
            });
        });
    });

    /* ---------- 5. Tabs (click + arrow-key navigation) ---------- */
    document.querySelectorAll('.tabs').forEach(function (tabs) {
        var tabButtons = Array.prototype.slice.call(tabs.querySelectorAll('[role="tab"]'));

        function activate(tab) {
            tabButtons.forEach(function (t) {
                var selected = t === tab;
                t.setAttribute('aria-selected', String(selected));
                t.tabIndex = selected ? 0 : -1;
                document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
            });
            tab.focus();
        }

        tabButtons.forEach(function (tab, index) {
            tab.addEventListener('click', function () { activate(tab); });
            tab.addEventListener('keydown', function (e) {
                var next = null;
                if (e.key === 'ArrowRight') { next = tabButtons[(index + 1) % tabButtons.length]; }
                if (e.key === 'ArrowLeft') { next = tabButtons[(index - 1 + tabButtons.length) % tabButtons.length]; }
                if (next) { e.preventDefault(); activate(next); }
            });
        });
    });

    /* ---------- 6. Gallery with lightbox ---------- */
    var galleryLinks = Array.prototype.slice.call(document.querySelectorAll('.gallery__item'));
    if (galleryLinks.length) {
        var current = 0;
        var lastFocused = null;

        var box = document.createElement('div');
        box.className = 'lightbox';
        box.setAttribute('role', 'dialog');
        box.setAttribute('aria-modal', 'true');
        box.setAttribute('aria-label', 'Image viewer');
        box.hidden = true;
        box.innerHTML =
            '<button type="button" class="lightbox__close" aria-label="Close image viewer">&times;</button>' +
            '<button type="button" class="lightbox__nav lightbox__nav--prev" aria-label="Previous image">&#8249;</button>' +
            '<figure class="lightbox__figure"><img class="lightbox__img" alt="">' +
            '<figcaption class="lightbox__caption"></figcaption></figure>' +
            '<button type="button" class="lightbox__nav lightbox__nav--next" aria-label="Next image">&#8250;</button>';
        document.body.appendChild(box);

        var imgEl = box.querySelector('.lightbox__img');
        var capEl = box.querySelector('.lightbox__caption');
        var closeBtn = box.querySelector('.lightbox__close');

        function show(index) {
            current = (index + galleryLinks.length) % galleryLinks.length;
            var link = galleryLinks[current];
            var thumb = link.querySelector('img');
            imgEl.src = link.getAttribute('href');
            imgEl.alt = thumb.alt;
            capEl.textContent = thumb.alt + ' (' + (current + 1) + ' of ' + galleryLinks.length + ')';
        }
        function open(index) {
            lastFocused = document.activeElement;
            show(index);
            box.hidden = false;
            document.body.classList.add('no-scroll');
            closeBtn.focus();
        }
        function close() {
            box.hidden = true;
            document.body.classList.remove('no-scroll');
            if (lastFocused) { lastFocused.focus(); }
        }

        galleryLinks.forEach(function (link, index) {
            link.addEventListener('click', function (e) { e.preventDefault(); open(index); });
        });
        closeBtn.addEventListener('click', close);
        box.querySelector('.lightbox__nav--prev').addEventListener('click', function () { show(current - 1); });
        box.querySelector('.lightbox__nav--next').addEventListener('click', function () { show(current + 1); });
        box.addEventListener('click', function (e) { if (e.target === box) { close(); } });
        document.addEventListener('keydown', function (e) {
            if (box.hidden) { return; }
            if (e.key === 'Escape') { close(); }
            if (e.key === 'ArrowLeft') { show(current - 1); }
            if (e.key === 'ArrowRight') { show(current + 1); }
        });
    }
})();
