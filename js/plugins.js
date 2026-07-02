/*!
 * plugins.js - bundled 3rd-party libraries for Gardyn / GreenUp template
 * Loads all required 3rd-party libs from public CDNs.
 * Order matters: jQuery first, then Bootstrap bundle, then the rest.
 *
 * NOTE: We use document.write() during initial parse so all libraries
 * are loaded synchronously before designesia.js runs.
 */

/* ---------- 1. jQuery 3.7.1 ---------- */
document.write('<script src="https://code.jquery.com/jquery-3.7.1.min.js" crossorigin="anonymous"><\/script>');

/* ---------- 2. Bootstrap 5.3.3 bundle (includes Popper) ---------- */
document.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"><\/script>');

/* ---------- 3. WOW.js 1.1.2 (scroll-triggered CSS animations) ---------- */
document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"><\/script>');

/* ---------- 4. Owl Carousel 2.3.4 ---------- */
document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" crossorigin="anonymous" referrerpolicy="no-referrer">');
document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css" crossorigin="anonymous" referrerpolicy="no-referrer">');
document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"><\/script>');

/* ---------- 5. Magnific Popup 1.1.0 (lightbox) ---------- */
document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css" crossorigin="anonymous" referrerpolicy="no-referrer">');
document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"><\/script>');

/* ---------- 6. Jarallax 2.1.3 (parallax) ---------- */
document.write('<script src="https://cdn.jsdelivr.net/npm/jarallax@2.1.3/dist/jarallax.min.js" crossorigin="anonymous"><\/script>');
document.write('<script src="https://cdn.jsdelivr.net/npm/jarallax@2.1.3/dist/jallax-video.min.js" crossorigin="anonymous"><\/script>');

/* ---------- 7. Enquire.js 2.1.6 (responsive JS callbacks) ---------- */
document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/enquire.js/2.1.6/enquire.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"><\/script>');

/* ---------- 8. Swiper 11 (used on homepage-5/6) ---------- */
document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.css" crossorigin="anonymous">');
document.write('<script src="https://cdn.jsdelivr.net/npm/swiper@11.1.14/swiper-bundle.min.js" crossorigin="anonymous"><\/script>');
