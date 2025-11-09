/* ===== Tone toggle + spotlight overlays ===== */
(function initSpotlightToggle() {
  if (document.documentElement.classList.contains('no-three-tone-init')) return;

  function injectToneFiltersOnce() {
    if (document.getElementById('toneFiltersDefs')) return;
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('id', 'toneFiltersDefs');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.style.position = 'absolute';
    svg.style.left = '-9999px';
    var defs = document.createElementNS(svgNS, 'defs');

    var filter50 = document.createElementNS(svgNS, 'filter');
    filter50.setAttribute('id', 'fiftyToneFilter');
    var cm3 = document.createElementNS(svgNS, 'feColorMatrix');
    cm3.setAttribute('type', 'saturate');
    cm3.setAttribute('values', '0');
    filter50.appendChild(cm3);
    var ct3 = document.createElementNS(svgNS, 'feComponentTransfer');
    ['feFuncR', 'feFuncG', 'feFuncB'].forEach(function (tag) {
      var f = document.createElementNS(svgNS, tag);
      f.setAttribute('type', 'discrete');
      var vals = [];
      for (var i = 0; i < 50; i++) { vals.push((i / 49).toFixed(3)); }
      f.setAttribute('tableValues', vals.join(' '));
      ct3.appendChild(f);
    });
    filter50.appendChild(ct3);
    defs.appendChild(filter50);
    svg.appendChild(defs);
    document.body.appendChild(svg);
  }

  function createGlobalOverlay() {
    var overlay = document.querySelector('.fiftyToneOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'fiftyToneOverlay';
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  function ensureSpotlightActive(active) {
    if (active) {
      injectToneFiltersOnce();
      var backdrop = document.querySelector('.toneBackdrop');
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'toneBackdrop';
        document.body.appendChild(backdrop);
      }
      createGlobalOverlay();
      document.body.classList.add('has-spotlight');
      document.documentElement.classList.add('has-spotlight');
      if (window.matchMedia('(pointer: fine)').matches) {
        if (!document.querySelector('.spotlightCursor')) {
          var cursor = document.createElement('div');
          cursor.className = 'spotlightCursor';
          document.body.appendChild(cursor);
        }
        if (!document.querySelector('.spotlightCursorPointer')) {
          var pointerCur = document.createElement('div');
          pointerCur.className = 'spotlightCursorPointer';
          document.body.appendChild(pointerCur);
          pointerCur.style.display = 'none';
        }
      }
    } else {
      var overlay = document.querySelector('.fiftyToneOverlay');
      if (overlay) overlay.remove();
      var backdrop = document.querySelector('.toneBackdrop');
      if (backdrop) backdrop.remove();
      var cursor = document.querySelector('.spotlightCursor');
      if (cursor) cursor.remove();
      var pointerCur = document.querySelector('.spotlightCursorPointer');
      if (pointerCur) pointerCur.remove();
      document.body.classList.remove('has-spotlight');
      document.documentElement.classList.remove('has-spotlight');
    }
  }

  function bindPointerTracking() {
    function update(x, y) {
      var rootStyle = document.documentElement.style;
      rootStyle.setProperty('--spotlight-x', x + 'px');
      rootStyle.setProperty('--spotlight-y', y + 'px');
      var cursorEl = document.querySelector('.spotlightCursor');
      var pointerEl = document.querySelector('.spotlightCursorPointer');
      if (cursorEl) { cursorEl.style.left = x + 'px'; cursorEl.style.top = y + 'px'; }
      if (pointerEl) { pointerEl.style.left = x + 'px'; pointerEl.style.top = y + 'px'; }

      if (pointerEl && cursorEl) {
        var el = document.elementFromPoint(x, y);
        var isPointer = false;
        if (el) {
          var cs = window.getComputedStyle(el);
          isPointer = (cs && cs.cursor === 'pointer')
            || el.tagName === 'A'
            || el.tagName === 'BUTTON'
            || el.closest('button, a, .linkButton')
            || el.closest('[role="button"], [onclick]')
            || el.matches('input, select, textarea, label, summary')
            || el.closest('#spotlightSwitch .switch, #spotlightSwitch .slider');
        }
        cursorEl.style.display = isPointer ? 'none' : 'block';
        pointerEl.style.display = isPointer ? 'block' : 'none';
      }
    }
    document.addEventListener('mousemove', e => update(e.clientX, e.clientY));
    document.addEventListener('touchstart', e => {
      if (e.touches && e.touches.length) update(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    document.addEventListener('touchmove', e => {
      if (e.touches && e.touches.length) update(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
  }

  function bindHeaderToggle() {
    var input = document.getElementById('spotlightToggle');
    var switchContainer = document.getElementById('spotlightSwitch');
    if (!input || !switchContainer) return;

    // Restore state from localStorage
    var savedState = localStorage.getItem('spotlightEnabled');
    var isOn = savedState !== null ? savedState === '1' : !!input.checked;
    input.checked = isOn;
    document.body.classList.toggle('tone-on', isOn);
    ensureSpotlightActive(isOn);

    function applyState() {
      var enable = input.checked;
      document.body.classList.toggle('tone-on', enable);
      ensureSpotlightActive(enable);

      // Save state in localStorage
      localStorage.setItem('spotlightEnabled', enable ? '1' : '0');
    }
    input.addEventListener('change', applyState);
    input.addEventListener('input', applyState);

    function updateSpotlightBasedOnViewport() {
      if (window.innerWidth >= 1096) {
        switchContainer.style.display = 'inline-block';
        // Respect saved state
        var saved = localStorage.getItem('spotlightEnabled');
        var enable = saved !== null ? saved === '1' : true;
        input.checked = enable;
        document.body.classList.toggle('tone-on', enable);
        ensureSpotlightActive(enable);
      } else {
        switchContainer.style.display = 'none';
        input.checked = false;
        document.body.classList.remove('tone-on');
        ensureSpotlightActive(false);
      }
    }

    updateSpotlightBasedOnViewport();
    window.addEventListener('resize', updateSpotlightBasedOnViewport);
  }

  if (document.body) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        bindHeaderToggle();
        bindPointerTracking();
      });
    } else {
      bindHeaderToggle();
      bindPointerTracking();
    }
  }
})();

const toggle = document.getElementById('spotlightToggle');
toggle.addEventListener('change', function() {
  this.setAttribute(
    'aria-label',
    this.checked
      ? 'Spotlight modus: aan. Klik om uit te schakelen'
      : 'Spotlight modus: uit. Klik om in te schakelen'
  );
});


/* ===== Random URL Redirector ===== */
document.addEventListener('DOMContentLoaded', function () {
  var urls = [
    'nog_vlotter_afrekenen.html',
    'nieuwsbegrip_vernieuwd.html',
    'hart_voor_jou.html'
  ];

  var link = document.getElementById('randomLink');
  if (!link) return;

  link.addEventListener('click', function (e) {
    e.preventDefault();

    // Get current page filename
    var currentPath = window.location.pathname.split('/').pop();

    // Exclude current page from list
    var available = urls.filter(u => u !== currentPath);
    if (available.length === 0) return;

    // Pick random page
    var random = available[Math.floor(Math.random() * available.length)];

    // Redirect to new page
    window.location.href = random;
  });
});

