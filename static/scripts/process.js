/*!
 * Design process — steps through the four process stages, swapping the
 * illustrated scene in the browser frame. Auto-advances while the section is
 * on screen; clicking a step jumps to it. Reduced motion: no auto-advance.
 */
(function () {
    'use strict';

    var section = document.getElementById('process');
    if (!section) { return; }

    var list = section.querySelector('.process-steps');
    var steps = section.querySelectorAll('.process-step');
    var scenes = section.querySelectorAll('.scene');
    var url = section.querySelector('.process-url');

    var STEP_MS = 4500;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var current = 0;
    var timer = null;
    var inView = false;
    var paused = false;

    if (reduceMotion) { section.classList.add('is-static'); }

    function show(i) {
        current = i;
        for (var n = 0; n < steps.length; n++) {
            var on = n === i;
            steps[n].classList.toggle('is-active', on);
            steps[n].setAttribute('aria-pressed', on ? 'true' : 'false');
            scenes[n].classList.toggle('is-active', on);
        }
        if (url) { url.textContent = steps[i].getAttribute('data-address'); }
        section.style.setProperty('--process-step-ms', STEP_MS + 'ms');
    }

    function stop() {
        clearTimeout(timer);
        timer = null;
        section.classList.remove('is-playing');
    }

    function play() {
        stop();
        if (reduceMotion || paused || !inView) { return; }
        // restart the progress bar on the active step
        void section.offsetWidth;
        section.classList.add('is-playing');
        timer = setTimeout(function () {
            show((current + 1) % steps.length);
            play();
        }, STEP_MS);
    }

    Array.prototype.forEach.call(steps, function (btn) {
        btn.addEventListener('click', function () {
            show(parseInt(btn.getAttribute('data-step'), 10));
            play();
        });
    });

    // hold on a step while the visitor is reading or using the keyboard there
    list.addEventListener('mouseenter', function () { paused = true; stop(); });
    list.addEventListener('mouseleave', function () { paused = false; play(); });
    list.addEventListener('focusin', function () { paused = true; stop(); });
    list.addEventListener('focusout', function (e) {
        if (!list.contains(e.relatedTarget)) { paused = false; play(); }
    });

    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
            inView = entries[0].isIntersecting;
            if (inView) { play(); } else { stop(); }
        }, { threshold: 0.35 }).observe(section);
    } else {
        inView = true;
        play();
    }

    show(0);
}());
