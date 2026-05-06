/* Kaplanski AI Lab — minimal HUD scripts */
(function () {
  'use strict';

  /* UTC clock telemetry — only renders if element exists */
  var el = document.getElementById('lab-clock');
  if (!el) return;
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function tick() {
    var d = new Date();
    el.textContent = pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
  }
  tick();
  setInterval(tick, 1000);
})();
