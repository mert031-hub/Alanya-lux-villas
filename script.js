function toggleMob() {
    const m = document.getElementById('mobMenu');
    const b = document.getElementById('burger');
    const isOpen = m.classList.contains('open');
    if (isOpen) { closeMob(); } else {
        m.classList.add('open');
        b.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}
function closeMob() {
    document.getElementById('mobMenu').classList.remove('open');
    document.getElementById('burger').classList.remove('open');
    document.body.style.overflow = '';
}
function switchVTab(idx, btn) {
    document.querySelectorAll('.vtp').forEach((p, i) => p.classList.toggle('act', i === idx));
    document.querySelectorAll('.vtb').forEach(b => b.classList.remove('act'));
    btn.classList.add('act');
    document.querySelectorAll('.vtp video').forEach(v => v.pause());
}
/* Sticky nav — passive scroll, no library needed */
window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('stuck', window.scrollY > 60);
}, { passive: true });

/* Sticky Book Now bar — appears after hero scrolled past */
(function () {
    const bar = document.getElementById('bookBar');
    const hero = document.getElementById('hero');
    if (!bar || !hero) return;
    let threshold = 0;
    function calcThreshold() {
        threshold = hero.offsetTop + hero.offsetHeight - 80;
    }
    calcThreshold();
    window.addEventListener('scroll', function () {
        bar.classList.toggle('bb-visible', window.scrollY > threshold);
    }, { passive: true });
    window.addEventListener('resize', calcThreshold, { passive: true });
})();
