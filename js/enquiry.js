/* Urban Crumb Bakery - enquiry form validation (enquiry.html)
   Client-side validation with inline error messages, a live character
   counter and a confirmation message. Server-side validation would still
   be required on a production site. */
(function () {
    'use strict';

    var form = document.getElementById('enquiry-form');
    if (!form) { return; }

    var fields = {
        name:    document.getElementById('full-name'),
        email:   document.getElementById('email'),
        phone:   document.getElementById('phone'),
        type:    document.getElementById('enquiry-type'),
        date:    document.getElementById('event-date'),
        message: document.getElementById('message')
    };
    var counter = document.getElementById('message-count');
    var summary = document.getElementById('form-summary');
    var success = document.getElementById('form-success');

    var MAX_MESSAGE = 500;
    var NAME_RE = /^[A-Za-z\u00C0-\u024F][A-Za-z\u00C0-\u024F' -]{1,59}$/;
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    /* South African numbers: 0XXXXXXXXX or +27XXXXXXXXX, spaces/dashes allowed */
    var PHONE_RE = /^(?:\+27|0)[1-8][0-9]{8}$/;

    /* Date input can't be in the past */
    var today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    var todayStr = today.toISOString().split('T')[0];
    fields.date.min = todayStr;

    /* Pre-select enquiry type / message when arriving from a product modal */
    var params = new URLSearchParams(window.location.search);
    if (params.get('product')) {
        fields.message.value = 'I would like to enquire about: ' + params.get('product').slice(0, 80) + '.\n';
    }

    var validators = {
        name: function (v) {
            if (!v) { return 'Please enter your full name.'; }
            if (!NAME_RE.test(v)) { return 'Names may only contain letters, spaces, hyphens and apostrophes (2-60 characters).'; }
            return '';
        },
        email: function (v) {
            if (!v) { return 'Please enter your email address.'; }
            if (!EMAIL_RE.test(v)) { return 'Enter a valid email address, e.g. you@example.com.'; }
            return '';
        },
        phone: function (v) {
            var cleaned = v.replace(/[\s-]/g, '');
            if (!cleaned) { return 'Please enter your phone number.'; }
            if (!PHONE_RE.test(cleaned)) { return 'Enter a valid South African number, e.g. 012 555 0147 or +27 12 555 0147.'; }
            return '';
        },
        type: function (v) {
            return v ? '' : 'Please choose an enquiry type.';
        },
        date: function (v) {
            if (!v) {
                return fields.type.value === 'general' ? '' : 'Please choose the date you need your order.';
            }
            if (v < todayStr) { return 'The required date cannot be in the past.'; }
            return '';
        },
        message: function (v) {
            if (!v) { return 'Please tell us what you need.'; }
            if (v.length < 10) { return 'Please give us a little more detail (at least 10 characters).'; }
            if (v.length > MAX_MESSAGE) { return 'Message is too long (maximum ' + MAX_MESSAGE + ' characters).'; }
            return '';
        }
    };

    function getError(key) {
        var el = fields[key];
        var value = el.value.trim();
        return validators[key](value);
    }

    function showError(key, message) {
        var el = fields[key];
        var errorEl = document.getElementById(el.id + '-error');
        errorEl.textContent = message;
        el.setAttribute('aria-invalid', message ? 'true' : 'false');
        el.classList.toggle('is-invalid', !!message);
    }

    function validateField(key) {
        var message = getError(key);
        showError(key, message);
        return message;
    }

    Object.keys(fields).forEach(function (key) {
        fields[key].addEventListener('blur', function () { validateField(key); });
        fields[key].addEventListener('input', function () {
            if (fields[key].classList.contains('is-invalid')) { validateField(key); }
        });
    });
    /* Date requirement depends on enquiry type */
    fields.type.addEventListener('change', function () { validateField('date'); });

    fields.message.addEventListener('input', function () {
        var left = MAX_MESSAGE - fields.message.value.length;
        counter.textContent = left + ' characters remaining';
        counter.classList.toggle('is-over', left < 0);
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        success.hidden = true;

        var errors = [];
        Object.keys(fields).forEach(function (key) {
            var msg = validateField(key);
            if (msg) { errors.push({ key: key, msg: msg }); }
        });

        if (errors.length) {
            summary.hidden = false;
            summary.innerHTML = '<strong>Please fix ' + errors.length + ' problem' +
                (errors.length > 1 ? 's' : '') + ' before submitting:</strong>';
            var ul = document.createElement('ul');
            errors.forEach(function (err) {
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.href = '#' + fields[err.key].id;
                a.textContent = err.msg;
                a.addEventListener('click', function (ev) { ev.preventDefault(); fields[err.key].focus(); });
                li.appendChild(a);
                ul.appendChild(li);
            });
            summary.appendChild(ul);
            summary.focus();
            return;
        }

        summary.hidden = true;
        success.hidden = false;
        success.textContent = 'Thank you, ' + fields.name.value.trim().split(' ')[0] +
            '! Your enquiry has been received and we will reply to ' + fields.email.value.trim() + ' within one business day.';
        form.reset();
        counter.textContent = MAX_MESSAGE + ' characters remaining';
        Object.keys(fields).forEach(function (key) { showError(key, ''); });
        success.focus();
    });
})();
