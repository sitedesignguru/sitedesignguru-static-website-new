/*!
 * portfolio.html — full-page hover scroll and type filters.
 */
(function () {
    'use strict';

    var SPEED = 300; // pixels of screenshot scrolled per second

    // Work out how far each screenshot has to travel to show its bottom edge
    function measure(img) {
        var frame = img.parentNode;
        var holder = frame.closest('.pf-card, .pf-spot-frame');
        var travel = img.offsetHeight - frame.clientHeight;
        if (travel > 20) {
            frame.style.setProperty('--shift', -travel + 'px');
            frame.style.setProperty('--dur', Math.max(2, travel / SPEED).toFixed(1) + 's');
            holder.classList.add('is-tall');
        } else {
            frame.style.removeProperty('--shift');
            holder.classList.remove('is-tall');
        }
    }

    var shots = [].slice.call(document.querySelectorAll('.pf-frame img'));
    shots.forEach(function (img) {
        if (img.complete && img.naturalHeight) { measure(img); }
        img.addEventListener('load', function () { measure(img); });
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () { shots.forEach(measure); }, 150);
    });

    // Filters
    var bar = document.querySelector('.pf-filters');
    if (bar) {
        bar.addEventListener('click', function (e) {
            var chip = e.target.closest('.pf-chip');
            if (!chip) { return; }
            var type = chip.getAttribute('data-filter');
            [].forEach.call(bar.querySelectorAll('.pf-chip'), function (c) {
                c.setAttribute('aria-pressed', c === chip);
            });
            [].forEach.call(document.querySelectorAll('.pf-card'), function (card) {
                card.hidden = type !== 'all' && card.getAttribute('data-type') !== type;
            });
            // Cards that just became visible had zero size before; re-measure them
            shots.forEach(measure);
        });
    }
})();
