/* CBDR site menu: Services flyout (desktop) and full menu (mobile). Shared by all pages. */
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.svc-btn');
  var fly = document.querySelector('.flyout');
  var dim = document.querySelector('.fly-dim');
  var burger = document.querySelector('.burger');
  var hover = window.matchMedia ? window.matchMedia('(hover: hover) and (min-width: 761px)') : { matches: false };
  var timer;

  function setFly(open) {
    root.classList.toggle('fly-open', open);
    if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function setMenu(open) {
    root.classList.toggle('menu-open', open);
    if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (btn && fly) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      // On mouse devices hovering already opened it, so a click keeps it open.
      setFly(hover.matches ? true : !root.classList.contains('fly-open'));
    });
    [btn, fly].forEach(function (el) {
      el.addEventListener('mouseenter', function () { if (hover.matches) { clearTimeout(timer); setFly(true); } });
      el.addEventListener('mouseleave', function () { if (hover.matches) { timer = setTimeout(function () { setFly(false); }, 200); } });
    });
  }
  if (dim) dim.addEventListener('click', function () { setFly(false); });
  if (burger) burger.addEventListener('click', function () { setMenu(!root.classList.contains('menu-open')); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setFly(false); setMenu(false); if (btn) btn.focus(); }
  });
  document.querySelectorAll('.flyout a, .mnav a').forEach(function (a) {
    a.addEventListener('click', function () { setFly(false); setMenu(false); });
  });
  window.addEventListener('resize', function () { if (window.innerWidth > 760) setMenu(false); });
})();
