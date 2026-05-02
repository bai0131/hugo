(function () {

  var themeToggle = document.getElementById('themeToggle');

  function initTheme() {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  initTheme();

  /* ===========================================================
     Hero Player — 首页 C 位播放器 (v2)
     =========================================================== */
  var musicMap = [
    { file: 'bgm1',  title: '那天下雨了',   artist: '周杰伦' },
    { file: 'bgm2',  title: '晴天',         artist: '周杰伦' },
    { file: 'bgm3',  title: '一路向北',     artist: '周杰伦' },
    { file: 'bgm4',  title: '夜曲',         artist: '周杰伦' },
    { file: 'bgm5',  title: '发如雪',       artist: '周杰伦' },
    { file: 'bgm6',  title: '蒲公英的约定', artist: '周杰伦' },
    { file: 'bgm7',  title: '枫',           artist: '周杰伦' },
    { file: 'bgm8',  title: '爱你没差',     artist: '周杰伦' },
    { file: 'bgm9',  title: '我不配',       artist: '周杰伦' },
    { file: 'bgm10', title: '最长的电影',   artist: '周杰伦' },
    { file: 'bgm11', title: '告白气球',     artist: '周杰伦' },
    { file: 'bgm12', title: '反方向的钟',   artist: '周杰伦' }
  ];

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function initHeroPlayer() {
    var container = document.getElementById('hero-player');
    if (!container) return;

    var now = Date.now();
    var playlist = shuffle(musicMap);
    var currentIdx = 0;
    var audio = new Audio();
    audio.volume = 0.75;

    var lyricsLines = [];
    var lyricsTimer = null;
    var lyricsEl = document.getElementById('heroLyrics');

    var elTitle = document.getElementById('heroTitle');
    var elArtist = document.getElementById('heroArtist');
    var elCoverWrap = document.querySelector('.hp-cover-wrap');
    var elCover = document.getElementById('heroCover');
    var elPlay = document.getElementById('heroPlay');
    var elPrev = document.getElementById('heroPrev');
    var elNext = document.getElementById('heroNext');
    var elPlaylistBtn = document.getElementById('heroPlaylistBtn');
    var elPlaylistClose = document.getElementById('playlistClose');
    var elPlaylistDrawer = document.getElementById('playlistDrawer');
    var elPlaylistList = document.getElementById('playlistList');
    var elVolume = document.getElementById('heroVolume');
    var elProgressBar = document.getElementById('heroProgressBar');
    var elProgressFill = document.getElementById('heroProgressFill');
    var elProgressThumb = document.getElementById('heroProgressThumb');

    var playSvg = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>';
    var pauseSvg = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="3" width="5" height="18"/><rect x="14" y="3" width="5" height="18"/></svg>';

    function loadTrack(idx) {
      currentIdx = idx;
      var track = playlist[idx];
      var file = track.file.toLowerCase();
      audio.src = '/music/' + file + '.mp3?t=' + now;
      audio.load();

      elTitle.textContent = track.title;
      elArtist.textContent = track.artist;
      if (elCover) {
        elCover.style.backgroundImage = 'url(/music/' + track.file + '.jpg?t=' + now + ')';
      }

      lyricsLines = [];
      clearLyricsDisplay();

      fetch('/music/' + file + '.lrc?t=' + now)
        .then(function (r) { return r.text(); })
        .then(parseLrc)
        .catch(function () { lyricsLines = []; });

      elProgressFill.style.width = '0%';
      elProgressThumb.style.left = '0%';
      updatePlaylistActive();
    }

    function parseLrc(text) {
      lyricsLines = [];
      var lines = text.split(/\r?\n/);
      for (var i = 0; i < lines.length; i++) {
        var match = lines[i].match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
        if (match) {
          var min = parseInt(match[1], 10);
          var sec = parseInt(match[2], 10);
          var ms = match[3].length === 3 ? parseInt(match[3], 10) : parseInt(match[3], 10) * 10;
          lyricsLines.push({ time: min * 60 + sec + ms / 1000, text: match[4].trim() || '...' });
        }
      }
      lyricsLines.sort(function (a, b) { return a.time - b.time; });
    }

    function clearLyricsDisplay() {
      if (lyricsTimer) { cancelAnimationFrame(lyricsTimer); lyricsTimer = null; }
      lyricsEl.innerHTML = '<span class="lyric-line">♪ ' + playlist[currentIdx].title + ' ♪</span>';
    }

    function updateLyrics() {
      if (lyricsLines.length === 0) { lyricsTimer = requestAnimationFrame(updateLyrics); return; }

      var ct = audio.currentTime;
      var activeIdx = -1;
      for (var i = 0; i < lyricsLines.length; i++) {
        if (lyricsLines[i].time <= ct) activeIdx = i;
      }

      if (activeIdx < 0) { lyricsTimer = requestAnimationFrame(updateLyrics); return; }

      var text = escHtml(lyricsLines[activeIdx].text);
      lyricsEl.innerHTML = '<span class="lyric-line lyric-active">' + text + '</span>';

      lyricsTimer = requestAnimationFrame(updateLyrics);
    }

    function escHtml(s) {
      var d = document.createElement('div');
      d.textContent = s;
      return d.innerHTML;
    }

    function updateProgress() {
      if (audio.duration) {
        var pct = (audio.currentTime / audio.duration * 100).toFixed(2);
        elProgressFill.style.width = pct + '%';
        elProgressThumb.style.left = pct + '%';
      }
    }

    function setCoverSpin(playing) {
      if (!elCoverWrap) return;
      if (playing) {
        elCoverWrap.classList.add('playing');
      } else {
        elCoverWrap.classList.remove('playing');
      }
    }

    /* ---- Playlist drawer ---- */
    function buildPlaylistDOM() {
      var html = '';
      for (var i = 0; i < playlist.length; i++) {
        html +=
          '<div class="playlist-drawer__item' + (i === currentIdx ? ' active' : '') + '" data-idx="' + i + '">' +
          '<span class="playlist-drawer__item-num">' + (i + 1) + '</span>' +
          '<span class="playlist-drawer__item-title">' + playlist[i].title + '</span>' +
          '<span class="playlist-drawer__item-artist">' + playlist[i].artist + '</span>' +
          '</div>';
      }
      elPlaylistList.innerHTML = html;
    }

    function updatePlaylistActive() {
      var items = elPlaylistList.querySelectorAll('.playlist-drawer__item');
      for (var i = 0; i < items.length; i++) {
        var idx = parseInt(items[i].getAttribute('data-idx'), 10);
        items[i].classList.toggle('active', idx === currentIdx);
      }
    }

    function togglePlaylist() {
      var open = elPlaylistDrawer.classList.contains('open');
      if (open) {
        elPlaylistDrawer.classList.remove('open');
      } else {
        buildPlaylistDOM();
        elPlaylistDrawer.classList.add('open');
      }
    }

    function closePlaylist() {
      elPlaylistDrawer.classList.remove('open');
    }

    elPlaylistList.addEventListener('click', function (e) {
      var item = e.target.closest('.playlist-drawer__item');
      if (!item) return;
      var idx = parseInt(item.getAttribute('data-idx'), 10);
      if (idx === currentIdx) { closePlaylist(); return; }
      closePlaylist();
      loadTrack(idx);
      audio.play().catch(function () {});
    });

    /* ---- Audio events ---- */
    audio.addEventListener('timeupdate', updateProgress);

    audio.addEventListener('ended', function () {
      nextTrack();
    });

    audio.addEventListener('play', function () {
      elPlay.innerHTML = pauseSvg;
      setCoverSpin(true);
      lyricsTimer = requestAnimationFrame(updateLyrics);
    });

    audio.addEventListener('pause', function () {
      elPlay.innerHTML = playSvg;
      setCoverSpin(false);
      if (lyricsTimer) { cancelAnimationFrame(lyricsTimer); lyricsTimer = null; }
    });

    audio.addEventListener('error', function () {
      nextTrack();
    });

    /* ---- Controls ---- */
    function togglePlay() {
      if (audio.src && !audio.paused) {
        audio.pause();
      } else if (audio.src) {
        audio.play().catch(function () {});
      } else {
        loadTrack(0);
        audio.play().catch(function () {});
      }
    }

    function prevTrack() {
      var idx = currentIdx - 1;
      if (idx < 0) idx = playlist.length - 1;
      loadTrack(idx);
      audio.play().catch(function () {});
    }

    function nextTrack() {
      var idx = currentIdx + 1;
      if (idx >= playlist.length) idx = 0;
      loadTrack(idx);
      audio.play().catch(function () {});
    }

    elPlay.addEventListener('click', togglePlay);
    elPrev.addEventListener('click', prevTrack);
    elNext.addEventListener('click', nextTrack);
    elPlaylistBtn.addEventListener('click', togglePlaylist);
    elPlaylistClose.addEventListener('click', closePlaylist);

    elProgressBar.addEventListener('click', function (e) {
      if (!audio.duration) return;
      var rect = elProgressBar.getBoundingClientRect();
      var pct = (e.clientX - rect.left) / rect.width;
      audio.currentTime = pct * audio.duration;
    });

    if (elCover) {
      elCover.addEventListener('click', togglePlay);
    }

    elVolume.addEventListener('input', function () {
      audio.volume = parseFloat(elVolume.value);
    });

    loadTrack(0);
  }

  initHeroPlayer();

  /* ===========================================================
     分类筛选
     =========================================================== */
  var typeFilters = document.getElementById('typeFilters');
  if (typeFilters) {
    typeFilters.addEventListener('click', function (e) {
      var btn = e.target.closest('.type-filter');
      if (!btn) return;
      typeFilters.querySelectorAll('.type-filter').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.getAttribute('data-cat');
      var cards = document.querySelectorAll('.article-card');
      var count = 0;
      cards.forEach(function (card) {
        var match = cat === 'all' || card.getAttribute('data-cat') === cat;
        card.style.display = match ? '' : 'none';
        if (match) count++;
      });
      var countEl = document.querySelector('.episodes-count');
      if (countEl) countEl.textContent = count + ' 篇文章';
    });
  }

  document.querySelectorAll('.article-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var url = card.getAttribute('data-url');
      if (url) window.location.href = url;
    });
  });

  /* ===========================================================
     访问量统计
     =========================================================== */
  var pvEl = document.getElementById('site-pv');
  if (pvEl) {
    fetch('https://bxl.vercel.app/article?path=/&type=time')
      .then(function (r) { return r.text(); })
      .then(function (d) {
        var pv = parseInt(d, 10) || 0;
        pvEl.textContent = pv;
      })
      .catch(function () {});
  }

  /* ===========================================================
     站点运行计时
     =========================================================== */
  (function () {
    var START = new Date('2026-04-29T16:00:00');
    var el = document.getElementById('runtime-timer');
    if (!el) return;

    function pad(n) { return n < 10 ? '0' + n : n; }

    function tick() {
      var diff = Date.now() - START.getTime();
      var s = Math.floor(diff / 1000);
      var d = Math.floor(s / 86400); s %= 86400;
      var h = Math.floor(s / 3600);  s %= 3600;
      var m = Math.floor(s / 60);
      s %= 60;
      el.textContent = pad(d) + 'd ' + pad(h) + 'h ' + pad(m) + 'm ' + pad(s) + 's';
    }

    tick();
    setInterval(tick, 1000);
  })();

  /* ===========================================================
     赛博监控面板 —— 实时性能 / 网络数据
     =========================================================== */
  (function () {
    var elFps = document.getElementById('cyFps');
    var elMem = document.getElementById('cyMem');
    var elBat = document.getElementById('cyBat');
    var elScrl = document.getElementById('cyScrl');
    var elPing = document.getElementById('cyPing');
    var elClock = document.getElementById('cyClock');
    var elUptime = document.getElementById('cyUptime');
    var elBrowser = document.getElementById('cyBrowser');
    if (!elFps && !elPing) return;

    var START = new Date('2026-04-29T16:00:00');

    function pad(n) { return n < 10 ? '0' + n : n; }

    function setWarn(el, cond) {
      if (cond) el.classList.add('warn');
      else el.classList.remove('warn');
    }

    var fpsFrames = 0;
    var fpsLast = performance.now();
    function fpsLoop(now) {
      fpsFrames++;
      if (now - fpsLast >= 500) {
        var fps = Math.round(fpsFrames / ((now - fpsLast) / 1000));
        if (elFps) {
          elFps.textContent = fps;
          setWarn(elFps, fps < 45);
        }
        fpsFrames = 0;
        fpsLast = now;
      }
      requestAnimationFrame(fpsLoop);
    }
    requestAnimationFrame(fpsLoop);

    function updateMem() {
      if (!elMem) return;
      try {
        if (performance.memory) {
          var mb = (performance.memory.usedJSHeapSize / 1048576).toFixed(1);
          elMem.textContent = mb + 'MB';
        }
      } catch (e) { elMem.textContent = 'N/A'; }
    }
    setInterval(updateMem, 2000);
    updateMem();

    function updateBat() {
      if (!elBat) return;
      try {
        navigator.getBattery().then(function (b) {
          var pct = Math.round(b.level * 100);
          var ch = b.charging ? '+' : '';
          elBat.textContent = ch + pct + '%';
        }).catch(function () { elBat.textContent = '--%'; });
      } catch (e) { elBat.textContent = '--%'; }
    }
    updateBat();
    setInterval(updateBat, 30000);
    if (navigator.getBattery) {
      navigator.getBattery().then(function (b) {
        b.addEventListener('levelchange', updateBat);
        b.addEventListener('chargingchange', updateBat);
      });
    }

    function updateScroll() {
      if (!elScrl) return;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var pct = h > 0 ? Math.round(window.scrollY / h * 100) : 0;
      elScrl.textContent = pct + '%';
    }
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    function updatePing() {
      if (!elPing) return;
      var start = performance.now();
      fetch('/favicon.ico', { method: 'HEAD', cache: 'no-store' })
        .then(function () {
          var ms = Math.round(performance.now() - start);
          elPing.textContent = ms + 'ms';
          setWarn(elPing, ms > 100);
        })
        .catch(function () {
          elPing.textContent = 'ERR';
          setWarn(elPing, true);
        });
    }
    updatePing();
    setInterval(updatePing, 3000);

    function updateClock() {
      if (!elClock) return;
      var d = new Date();
      elClock.textContent = pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    }
    updateClock();
    setInterval(updateClock, 1000);

    function updateUptime() {
      if (!elUptime) return;
      var diff = Date.now() - START.getTime();
      var d = Math.floor(diff / 86400000);
      elUptime.textContent = d + 'd';
    }
    updateUptime();
    setInterval(updateUptime, 60000);

    if (elBrowser) {
      try {
        var ua = navigator.userAgent;
        var browser = '--';
        var os = '';
        if (ua.indexOf('Edg/') > -1) {
          var m = ua.match(/Edg\/(\d+)/);
          browser = 'Edg ' + (m ? m[1] : '');
        } else if (ua.indexOf('Chrome/') > -1) {
          var m = ua.match(/Chrome\/(\d+)/);
          browser = 'Ch ' + (m ? m[1] : '');
        } else if (ua.indexOf('Firefox/') > -1) {
          var m = ua.match(/Firefox\/(\d+)/);
          browser = 'FF ' + (m ? m[1] : '');
        } else if (ua.indexOf('Safari/') > -1 && ua.indexOf('Chrome/') === -1) {
          var m = ua.match(/Version\/(\d+)/);
          browser = 'Sf ' + (m ? m[1] : '');
        }
        if (ua.indexOf('Windows') > -1) os = 'Win';
        else if (ua.indexOf('Mac') > -1) os = 'Mac';
        else if (ua.indexOf('Linux') > -1 && ua.indexOf('Android') === -1) os = 'Lin';
        else if (ua.indexOf('Android') > -1) os = 'And';
        else if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) os = 'iOS';
        elBrowser.textContent = browser + '/' + os;
      } catch (e) { elBrowser.textContent = '--'; }
    }
  })();

})();
