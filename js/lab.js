/* Kaplanski AI Lab — minimal HUD scripts */
(function () {
  'use strict';

  /* ---------- UTC clock telemetry ---------- */
  (function clock() {
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

  /* ---------- YouTube loop via IFrame API ----------
     We avoid the loop=1&playlist=ID URL trick because playlist mode
     adds next/previous hover arrows. Instead, listen for ENDED and
     seek back to 0. Keeps the player in single-video mode. */
  (function ytLoop() {
    var iframe = document.getElementById('lab-yt');
    if (!iframe) return;

    function attach() {
      if (!window.YT || !window.YT.Player) return setTimeout(attach, 80);
      try {
        new window.YT.Player('lab-yt', {
          events: {
            onReady: function (e) { try { e.target.mute(); e.target.playVideo(); } catch (_) {} },
            onStateChange: function (e) {
              if (e.data === window.YT.PlayerState.ENDED) {
                try { e.target.seekTo(0, true); e.target.playVideo(); } catch (_) {}
              }
            }
          }
        });
      } catch (_) {}
    }

    if (window.YT && window.YT.Player) { attach(); return; }
    var s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.async = true;
    document.head.appendChild(s);
    var prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof prev === 'function') prev();
      attach();
    };
  })();

})();
