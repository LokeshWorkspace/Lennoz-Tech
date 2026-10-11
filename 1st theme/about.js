'use strict';
// Loader (~1.2s), sticky nav, mobile menu, scroll reveal, counters
const ld = document.getElementById('load'); setTimeout(() => ld && ld.classList.add('x'), 1200);
const nav = document.querySelector('.nav'), bg = document.querySelector('.burger'), ul = document.querySelector('.nav ul');
addEventListener('scroll', () => nav.classList.toggle('s', scrollY > 20), { passive: true });
bg.addEventListener('click', () => { const o = ul.classList.toggle('open'); bg.setAttribute('aria-expanded', o) });
ul.addEventListener('click', e => { if (e.target.matches('a')) { ul.classList.remove('open'); bg.setAttribute('aria-expanded', false) } });
const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
function count(el) { const t = +el.dataset.count, s = el.dataset.suffix || '', st = performance.now(); (function f(n) { const p = Math.min((n - st) / 1400, 1); el.textContent = (t > 999 ? Math.round(t * p).toString() : Math.round(t * p)) + s; if (p < 1 && !reduce) requestAnimationFrame(f); else el.textContent = t + s })(st) }
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); e.target.querySelectorAll('[data-count]').forEach(count); if (e.target.dataset.count) count(e.target); io.unobserve(e.target) } }), { threshold: .15 });
document.querySelectorAll('[data-r]').forEach(el => io.observe(el));