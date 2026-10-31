/*!
 * Hero Reel — builds a 3D wall of portfolio screenshots in the header and
 * plays it as the visitor scrolls. Images are read from the data-shots list
 * on .hero-reel__stage in index.html.
 */
(function () {
    'use strict';

    var header = document.getElementById('main');
    var wall = header && header.querySelector('.hero-reel__wall');
    if (!wall) { return; }

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var stage = header.querySelector('.hero-reel__stage');
    var shots = ((stage && stage.getAttribute('data-shots')) || '').split(/\s+/).filter(Boolean);
    if (!shots.length) { return; }

    var cols = [];
    var colCount = 0;
    var target = 0;   // scroll progress, 0 → 1 as the header leaves the screen
    var current = 0;  // eased progress actually drawn
    var ticking = false;

    function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
    function lerp(a, b, t) { return a + (b - a) * t; }

    function buildWall() {
        var count = window.innerWidth < 768 ? 3 : 5;
        if (count === colCount) { return; }
        colCount = count;

        // Each column gets enough cards to stay taller than the screen while it
        // slides; walking the list column-by-column keeps repeats apart.
        var perCol = Math.max(6, Math.ceil(shots.length * 2 / count));
        var html = '';
        for (var c = 0; c < count; c++) {
            html += '<div class="hero-reel__col">';
            for (var j = 0; j < perCol; j++) {
                var src = shots[(c * 3 + j * count) % shots.length];
                html += '<figure class="hero-reel__card"><img src="' + src + '" alt="" decoding="async"/></figure>';
            }
            html += '</div>';
        }
        wall.innerHTML = html;
        cols = [].slice.call(wall.children);
    }

    function measure() {
        return clamp(-header.getBoundingClientRect().top / header.offsetHeight, 0, 1);
    }

    function render(p) {
        // Wall: starts steeply tilted and close, settles flatter as you scroll
        wall.style.transform =
            'translate(-50%, -50%) ' +
            'rotateX(' + lerp(26, 10, p) + 'deg) ' +
            'rotateZ(' + lerp(-14, -6, p) + 'deg) ' +
            'scale(' + lerp(1.1, 0.95, p) + ')';

        // Columns drift in alternating directions
        var travel = window.innerHeight * 0.6;
        for (var i = 0; i < cols.length; i++) {
            var dir = i % 2 ? 1 : -1;
            cols[i].style.transform = 'translate3d(0,' + (dir * (p - 0.5) * travel - travel * 0.5) + 'px,0)';
        }
    }

    function frame() {
        current += (target - current) * 0.12;
        if (Math.abs(target - current) < 0.0005) { current = target; }
        render(current);
        ticking = current !== target;
        if (ticking) { window.requestAnimationFrame(frame); }
    }

    function onScroll() {
        target = measure();
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(frame);
        }
    }

    buildWall();
    header.className += ' hero-reel--ready';

    if (reduceMotion) {
        render(0.5);
        return;
    }

    current = target = measure();
    render(current);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () {
        buildWall();
        onScroll();
    });
})();
