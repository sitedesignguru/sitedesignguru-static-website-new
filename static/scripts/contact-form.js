/*!
 * Contact form — validates in the browser, then posts to Web3Forms using the
 * access key set in content/homepage/contact.md.
 */
(function () {
    'use strict';

    var form = document.getElementById('contactForm');
    if (!form) { return; }

    var MAX_BYTES = 20 * 1024 * 1024;
    var ALLOWED = ['pdf', 'jpg', 'jpeg', 'png', 'docx'];
    var MIN_FILL_MS = 3000; // faster than this is a bot

    var status = form.querySelector('.cf-status');
    var button = form.querySelector('.cf-submit');
    var fileInput = form.querySelector('input[type="file"]');
    var endpoint = form.getAttribute('action');

    form.elements.started.value = Date.now();

    function setStatus(message, kind) {
        status.textContent = message;
        status.className = 'cf-status' + (kind ? ' is-' + kind : '');
    }

    function sent() {
        form.reset();
        form.elements.started.value = Date.now();
        setStatus(form.getAttribute('data-success'), 'success');
    }

    function fileProblem() {
        var file = fileInput && fileInput.files && fileInput.files[0];
        if (!file) { return ''; }
        var ext = file.name.split('.').pop().toLowerCase();
        if (ALLOWED.indexOf(ext) === -1) { return 'That file type isn’t accepted. Please attach a pdf, jpg, png, or docx.'; }
        if (file.size > MAX_BYTES) { return 'That file is over 20 MB. Please attach a smaller file.'; }
        return '';
    }

    function markInvalid() {
        var first = null;
        [].forEach.call(form.querySelectorAll('input, textarea'), function (field) {
            var box = field.closest('.cf-field');
            if (!box) { return; }
            var bad = !field.checkValidity();
            box.classList.toggle('is-invalid', bad);
            if (bad && !first) { first = field; }
        });
        return first;
    }

    form.addEventListener('input', function (e) {
        var box = e.target.closest('.cf-field');
        if (box && e.target.checkValidity()) { box.classList.remove('is-invalid'); }
    });

    if (fileInput) {
        fileInput.addEventListener('change', function () {
            var problem = fileProblem();
            fileInput.setCustomValidity(problem);
            fileInput.closest('.cf-field').classList.toggle('is-invalid', !!problem);
            setStatus(problem, problem ? 'error' : '');
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        var firstBad = markInvalid();
        if (firstBad) {
            setStatus(fileProblem() || form.getAttribute('data-invalid'), 'error');
            firstBad.focus();
            return;
        }

        // Pretend success to bots so they don't learn what tripped the filter
        if (form.elements.botcheck.checked || Date.now() - form.elements.started.value < MIN_FILL_MS) {
            sent();
            return;
        }

        var data = new FormData(form);
        data.delete('started');
        data.append('subject', 'New website inquiry from ' + data.get('first_name') + ' ' + data.get('last_name'));

        button.disabled = true;
        setStatus(form.getAttribute('data-sending'));

        fetch(endpoint, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        })
            .then(function (res) {
                return res.json().catch(function () { return {}; }).then(function (body) {
                    if (!res.ok || !body.success) { throw new Error(body.message || ''); }
                });
            })
            .then(sent)
            .catch(function (err) {
                if (err.message) { console.error('Web3Forms: ' + err.message); }
                setStatus(form.getAttribute('data-error'), 'error');
            })
            .then(function () {
                button.disabled = false;
            });
    });
})();
