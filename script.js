// ── GLOBAL: mobile menu ──────────────────────────────
function toggleMob() {
    const m = document.getElementById('mobMenu');
    const b = document.getElementById('burger');
    if (m.classList.contains('open')) { closeMob(); } else {
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

// ── GLOBAL: video tab switcher (lazy-loads src on first click) ──
function switchVTab(idx, btn) {
    document.querySelectorAll('.vtp').forEach((p, i) => p.classList.toggle('act', i === idx));
    document.querySelectorAll('.vtb').forEach(b => b.classList.remove('act'));
    btn.classList.add('act');
    document.querySelectorAll('.vtp video').forEach(v => v.pause());

    const vid = document.getElementById('vTab' + idx);
    if (vid && vid.dataset.src && !vid.src) {
        vid.src = vid.dataset.src;
    }
}

// ── LOADING SCREEN ───────────────────────────────────
const loadStart = Date.now();
window.addEventListener('load', () => {
    const elapsed = Date.now() - loadStart;
    const waitTime = Math.max(0, 2200 - elapsed);
    setTimeout(() => {
        const loader = document.getElementById('loading');
        if (loader) {
            loader.classList.add('out');
            setTimeout(() => {
                const l2 = document.getElementById('loading');
                if (l2) l2.remove();
            }, 900);
        }
    }, waitTime);
});

// ── SINGLE RAF-THROTTLED SCROLL HANDLER ──────────────
let _ticking = false;
function _onScroll() {
    if (_ticking) return;
    _ticking = true;
    requestAnimationFrame(() => {
        const y = window.scrollY;
        document.getElementById('nav').classList.toggle('stuck', y > 60);
        const bar = document.getElementById('bookBar');
        const hero = document.getElementById('hero');
        if (bar && hero) {
            bar.classList.toggle('bb-visible', y > hero.offsetTop + hero.offsetHeight - 80);
        }
        _ticking = false;
    });
}
window.addEventListener('scroll', _onScroll, { passive: true });

let _bbThreshold = 0;
function _calcThreshold() {
    const hero = document.getElementById('hero');
    if (hero) _bbThreshold = hero.offsetTop + hero.offsetHeight - 80;
}
window.addEventListener('resize', _calcThreshold, { passive: true });

// ── MAIN INIT ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    _calcThreshold();

    const VIDEOS = [
        "images/" + encodeURIComponent("Kendinizi her anında özel hissedeceğiniz villalarımız yeni sezonda yeni tasarımı ile sizleri bek.mp4"),
        "images/" + encodeURIComponent("yenilenme.mp4"),
        "images/" + encodeURIComponent("Sadece sizin için 🏡✨Villa tatili yalnızca doğal güzelliklerle sınırlı değildir. Lüks ve konforl.mp4")
    ];

    const ALL_IMAGES = [
        "images/92b216182a54a7c69004aec815da7aebd103e58c180fdee639a0b806c238.webp",
        "images/71908c980bdfa5fc56ed96a5212177710517e6e8f3118fffcddbda5a66ff.webp",
        "images/a0a001e2c4fd2fc7b39d0ab6adc5c641ef6a6a065686fab03f9745a8687e.webp",
        "images/0c86d674040788694141b4935ced561a8f020d7d43ed494a087a790057ad.webp",
        "images/352ef352c3c57867d05afd9f7328c518c6a1a99939d9331a428813416a00.webp",
        "images/feb997f60982e7ec2127e9384dfb23f38bdf923b160b3394eaeb29802821.webp",
        "images/22d29e3e1c6147dc4b52764377e0e8a55aff868862ec31f834c7467228da.webp",
        "images/5d0a3cdb14a053a2ad65c3e96798520e4c47ad1bd342c0db7d71ac1eb13c.webp",
        "images/630d140407ac00aa5dacd644addda179d50cff7e29b779d1dbece1cc84f7.webp",
        "images/1897a1cc76a49b39db72e1dcfe6768630d3a78ce2d1e21aa4f811821ed2c.webp",
        "images/842a19feefb5687c4bc7a27517dbc62d876d3473efc9b262f0962e21433d.webp",
        "images/95bf1276b30f0339c946be879f21e25b3905fa42f6d4e81f2eea52e75f62.webp",
        "images/f820e36c7695cd1f8935629c93ace46f108f7a69da0f15108d8c217a29d1.webp",
        "images/6fcc767c429b61dc36cc479ae0e2934fe4e9b9af6971a1153c92a1207dc7.webp",
        "images/0446b7110c6104919fc88b4fe7ac4ab00f567cfce783bbc453c89a48f86e.jpeg",
        "images/5e02b18859d1b20d5124d3f5aedd7e5b4bcc0acfb2ff8976fc094feb2ba1.jpeg",
        "images/c7c74257c3c45dd0caab31df453888e7a24eca724f0cbe1aea91f58bb006.jpeg",
        "images/260112f5dd78b9f9905f786269592f8e4758a6162966bc1a6f396585f812.avif",
        "images/2fc7f49257db211a71e9256aa87d121870d3f3d5557f7d0d7a9348234dc9.avif",
        "images/4b9d68f540997c7764f8f0e0c69590cc7dda5f32c87b35bb2abfb3655d7e.avif",
        "images/5949fc156df5f144c9a2535e15c3c100388ec7b3e4c638388401461ebfe9.avif",
        "images/6a92293b30feb87970c2f055d091564677d3eb32e6674ed246d70c5713c5.avif",
        "images/bbd64eb1f7f72940394441de7ff2353024cf027be907afab16c95841c489.avif",
        "images/6b938a39b86962d1bd875b6a548870cd1404779773336ada679f8bf20dee.webp",
        "images/b2a3a7d11c7e8fb218c9a3c464a765d7cb8b63c87c20e7175a011a7c827f.webp",
        "images/4912a29d34dbb28c5379b23394bb1326adc0bbd3b198bfcc3e80beb9ff23.webp",
        "images/c008adc90eb3bb867df9579fb47b73fcdef23572d00881aaaefd714b72e0.avif",
        "images/d7947ee4907b2a3392cf9f4bde908196978cb70bd33a5a3dd004dd7b5dc8.avif",
        "images/dbc48b7266c80276fefa2116630ab5d8e13c5f3bb6a1fbcf44cd881bcd11.avif",
        "images/0222912000kwnl6jiDFB3_W_600_0_R5.webp",
        "images/0224u12000kwnlyaq14E7_W_600_0_R5.webp",
        "images/0225w12000k6ut7tq0E9F_W_600_0_R5.webp",
        "images/0226g12000k6utoxpA547_W_600_0_R5.webp",
        "images/06d5ab6a26c55fb5f37f0bd754d9a5e9e6ab53606add82c584593d888198.webp"
    ];

    const SLIDER_IMGS = ALL_IMAGES.slice(0, 18);
    const MASONRY_IMGS = [
        ALL_IMAGES[18], ALL_IMAGES[21], ALL_IMAGES[24], ALL_IMAGES[27], ALL_IMAGES[30], ALL_IMAGES[32],
        ALL_IMAGES[1],  ALL_IMAGES[2],  ALL_IMAGES[3],  ALL_IMAGES[4],  ALL_IMAGES[5],  ALL_IMAGES[6],
        ALL_IMAGES[7],  ALL_IMAGES[8],  ALL_IMAGES[9],  ALL_IMAGES[10], ALL_IMAGES[11], ALL_IMAGES[12],
        ALL_IMAGES[13], ALL_IMAGES[17], ALL_IMAGES[18], ALL_IMAGES[19], ALL_IMAGES[20], ALL_IMAGES[21],
        ALL_IMAGES[22], ALL_IMAGES[23], ALL_IMAGES[30], ALL_IMAGES[31],
    ];
    const IG_IMGS = [
        ALL_IMAGES[0], ALL_IMAGES[5], ALL_IMAGES[2],
        ALL_IMAGES[7], ALL_IMAGES[10], ALL_IMAGES[3],
        ALL_IMAGES[9], ALL_IMAGES[21], ALL_IMAGES[27], ALL_IMAGES[26],
    ];

    // Mobile menu backdrop + ESC close
    document.getElementById('mobMenu').addEventListener('click', function (e) {
        if (e.target === this) closeMob();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMob(); });

    // Hero bg video (critical — above fold)
    document.getElementById('hv').src = VIDEOS[0];

    // Tab videos — lazy via data-src, loaded only on first switchVTab()
    document.getElementById('vTab0').dataset.src = VIDEOS[0];
    document.getElementById('vTab1').dataset.src = VIDEOS[1];
    document.getElementById('vTab2').dataset.src = VIDEOS[2];

    // ── GALLERY SLIDER — single innerHTML assignment, no O(n²) ──────
    document.getElementById('galSlides').innerHTML = SLIDER_IMGS.map((src, i) => `
<div class="swiper-slide">
  <a href="${src}" class="glightbox gal-si" data-gallery="main-gallery" data-type="image">
    <img src="${src}" alt="Villa ${i + 1}" width="800" height="533" loading="lazy">
    <div class="gal-ov">
      <div class="gal-exp">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
      </div>
    </div>
  </a>
</div>`).join('');

    new Swiper('#galSw', {
        slidesPerView: 1.15,
        spaceBetween: 16,
        speed: 750,
        grabCursor: true,
        navigation: { nextEl: '#gNext', prevEl: '#gPrev' },
        breakpoints: {
            640: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.1 },
            1280: { slidesPerView: 2.5 }
        },
        on: {
            slideChange(sw) {
                const cur = String(sw.realIndex + 1).padStart(2, '0');
                const tot = String(SLIDER_IMGS.length).padStart(2, '0');
                document.getElementById('galCount').textContent = `${cur} / ${tot}`;
            }
        }
    });

    // Reviews swiper
    new Swiper('#rvSw', {
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 700,
        grabCursor: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        autoplay: { delay: 5000, pauseOnMouseEnter: true },
        breakpoints: {
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 }
        }
    });

    // Strip duplicate for seamless ticker
    (function () {
        const si = document.getElementById('stripIn');
        si.innerHTML += si.innerHTML;
    })();

    // ── vxBg: lazy-load via IntersectionObserver (saves ~6 MB) ───────
    const vxSection = document.getElementById('vx');
    if (vxSection) {
        new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting) {
                document.getElementById('vxBg').src = VIDEOS[2];
                obs.disconnect();
            }
        }, { rootMargin: '300px' }).observe(vxSection);
    }

    // vxBg fullscreen play button
    document.getElementById('vxPlayBtn').addEventListener('click', () => {
        const v = document.getElementById('vxBg');
        if (v.requestFullscreen) v.requestFullscreen();
        v.muted = false;
        v.play();
    });

    // Restore muted bg loop after fullscreen exit
    ['fullscreenchange', 'webkitfullscreenchange'].forEach(evt => {
        document.addEventListener(evt, () => {
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                const vxBg = document.getElementById('vxBg');
                if (vxBg) { vxBg.muted = true; vxBg.play(); }
            }
        });
    });

    // Pause tab videos when scrolled offscreen
    new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting && entry.target.id !== 'vxBg' && entry.target.id !== 'hv') {
                entry.target.pause();
            }
        });
    }, { threshold: 0.1 }).observe(document.querySelector('.vx-tabs') || document.body);

    // ── IDLE: masonry + instagram + AOS + GLightbox ───────────────────
    const idle = window.requestIdleCallback
        ? (fn, opts) => requestIdleCallback(fn, opts)
        : (fn) => setTimeout(fn, 200);

    idle(() => {
        document.getElementById('masGrid').innerHTML = MASONRY_IMGS.map((src, i) => `
<div class="mas-it">
  <a href="${src}" class="glightbox" data-gallery="main-gallery" data-type="image">
    <img src="${src}" alt="Villa ${i + 1}" width="800" height="533" loading="lazy">
    <div class="mas-ov">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
    </div>
  </a>
</div>`).join('');
    }, { timeout: 1500 });

    idle(() => {
        document.getElementById('igGrid').innerHTML = IG_IMGS.map((src, i) => `
<div class="ig-it">
  <a href="${src}" class="glightbox" data-gallery="ig-gallery" data-type="image">
    <img src="${src}" alt="Instagram ${i + 1}" width="600" height="600" loading="lazy">
    <div class="ig-ov">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
    </div>
  </a>
</div>`).join('');
    }, { timeout: 2000 });

    idle(() => {
        if (window.AOS) AOS.init({ duration: 900, easing: 'ease-out-cubic', once: true, offset: 80 });
    }, { timeout: 2500 });

    idle(() => {
        if (window.GLightbox) GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true, autoplayVideos: false });
    }, { timeout: 3000 });

}); // end DOMContentLoaded
