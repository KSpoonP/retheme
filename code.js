(function() {

    var THEMES = {
        default:  { accent:'#e8ff47', accentText:'#000', panel:'#111',    bg:'#161616', border:'#2a2a2a', text:'#f0f0f0', sub:'#555',    navBg:'#0d0d0d', navBorder:'#2a2a2a', btnBg:'#e8ff47', btnText:'#000', link:'#e8ff47', linkHover:'#fff',    inputBg:'#1e1e1e', inputBorder:'#2a2a2a', cardBg:'#111',    cardBorder:'#2a2a2a', sideBg:'#0d0d0d' },
        midnight: { accent:'#a855f7', accentText:'#fff', panel:'#0e0b1a', bg:'#130d24', border:'#2d1f4e', text:'#e8d5ff', sub:'#5b3f8a', navBg:'#0a0814', navBorder:'#2d1f4e', btnBg:'#a855f7', btnText:'#fff', link:'#a855f7', linkHover:'#e8d5ff', inputBg:'#180f2e', inputBorder:'#2d1f4e', cardBg:'#0e0b1a', cardBorder:'#2d1f4e', sideBg:'#0a0814' },
        blood:    { accent:'#ff2233', accentText:'#fff', panel:'#110808', bg:'#180a0a', border:'#3a1010', text:'#ffd4d4', sub:'#6b2020', navBg:'#0d0606', navBorder:'#3a1010', btnBg:'#ff2233', btnText:'#fff', link:'#ff2233', linkHover:'#ffd4d4', inputBg:'#1a0909', inputBorder:'#3a1010', cardBg:'#110808', cardBorder:'#3a1010', sideBg:'#0d0606' },
        moon:     { accent:'#c8c8c8', accentText:'#000', panel:'#0f0f0f', bg:'#181818', border:'#2e2e2e', text:'#e8e8e8', sub:'#4a4a4a', navBg:'#0a0a0a', navBorder:'#2e2e2e', btnBg:'#c8c8c8', btnText:'#000', link:'#c8c8c8', linkHover:'#fff',    inputBg:'#1c1c1c', inputBorder:'#2e2e2e', cardBg:'#0f0f0f', cardBorder:'#2e2e2e', sideBg:'#0a0a0a' },
    };

    var currentTheme = (function(){ try { return localStorage.getItem('tb-theme') || 'default'; } catch(e){ return 'default'; } })();
    if (!THEMES[currentTheme]) currentTheme = 'default';
    try { localStorage.setItem('tb-retheme-active', '1'); } catch(e){}

    // ── Fonts ───────────────────────────────────────────────────
    if (!document.getElementById('tb-fonts')) {
        var fl = document.createElement('link');
        fl.id = 'tb-fonts'; fl.rel = 'stylesheet';
        fl.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&family=Bebas+Neue&display=swap';
        document.head.appendChild(fl);
    }

    // ── Favicon: >_ ────────────────────────────────────────────
    function replaceFavicon(key) {
        var color = THEMES[key].accent;
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'
                + '<rect width="32" height="32" fill="#0d0d0d"/>'
                + '<text x="1" y="25" font-family="monospace" font-size="20" font-weight="900" fill="' + color + '">&gt;_</text>'
                + '</svg>';
        document.querySelectorAll('link[rel*="icon"]').forEach(function(el) { el.remove(); });
        var lnk = document.createElement('link');
        lnk.rel = 'icon'; lnk.type = 'image/svg+xml';
        lnk.href = 'data:image/svg+xml;base64,' + btoa(svg);
        document.head.appendChild(lnk);
    }

    // ── Logo: inject >scratch_ text into li.logo a only ────────
    function replaceLogo(key) {
        var color = THEMES[key].accent;
        var existing = document.getElementById('tb-logo-text');
        if (existing) {
            existing.style.color = color;
            return;
        }
        var a = document.querySelector('li.logo a');
        if (!a) return;
        a.style.cssText += ';display:flex!important;align-items:center!important;text-decoration:none!important;padding:0 12px!important;';
        var span = document.createElement('span');
        span.id = 'tb-logo-text';
        span.textContent = '>scratch_';
        span.style.cssText = 'font-family:"IBM Plex Mono",monospace;font-size:1rem;font-weight:700;color:' + color + ';letter-spacing:-0.5px;line-height:1;white-space:nowrap;pointer-events:none;';
        a.appendChild(span);
    }

    // ── CSS ─────────────────────────────────────────────────────
    function buildCSS(k) {
        var t = THEMES[k];
        return `
        /* === TB RETHEME === */
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-track { background:${t.bg}; }
        ::-webkit-scrollbar-thumb { background:${t.border}; border-radius:2px; }
        * { scrollbar-color:${t.border} ${t.bg}; scrollbar-width:thin; }

        html, body {
            background:${t.bg} !important;
            color:${t.text} !important;
            font-family:'IBM Plex Mono',monospace !important;
        }

        /* ── Navbar ── */
        #navigation, #navigation ul, #navigation li,
        nav#nav, .inner nav {
            background:#0d0d0d !important;
            box-shadow:none !important;
        }
        #navigation {
            border-bottom:1px solid ${t.navBorder} !important;
        }
        #navigation ul li a, #navigation ul li span {
            color:${t.sub} !important;
            font-family:'IBM Plex Mono',monospace !important;
            font-size:0.72rem !important;
            letter-spacing:1.5px !important;
            text-transform:uppercase !important;
            text-decoration:none !important;
        }
        #navigation ul li a:hover, #navigation ul li a:hover span {
            color:${t.accent} !important;
        }
        /* Logo link */
        li.logo a {
            background:transparent !important;
        }
        /* Search */
        #navigation .search input {
            background:${t.inputBg} !important;
            border:1px solid ${t.inputBorder} !important;
            color:${t.text} !important;
            border-radius:2px !important;
            font-family:'IBM Plex Mono',monospace !important;
            font-size:0.7rem !important;
            box-shadow:none !important;
            outline:none !important;
        }
        #navigation .search input:focus { border-color:${t.accent} !important; }
        #navigation .search .btn-search {
            background:transparent !important;
            border:none !important;
            color:${t.sub} !important;
        }
        /* Dropdown */
        #navigation .dropdown, #navigation ul.dropdown {
            background:${t.panel} !important;
            border:1px solid ${t.border} !important;
            border-radius:2px !important;
            box-shadow:none !important;
        }
        #navigation .dropdown li a {
            color:${t.text} !important;
        }
        #navigation .dropdown li a:hover {
            background:${t.bg} !important;
            color:${t.accent} !important;
        }
        /* Avatar — lock it down, never touch it */
        img.avatar, .avatar-wrapper img {
            width:32px !important;
            height:32px !important;
            border-radius:50% !important;
            border:1px solid ${t.border} !important;
            object-fit:cover !important;
            opacity:1 !important;
            max-width:32px !important;
        }
        /* Message count badge */
        .message-count {
            background:${t.accent} !important;
            color:${t.accentText} !important;
            border-radius:2px !important;
            font-size:0.55rem !important;
            padding:1px 4px !important;
        }

        /* ── Page background ── */
        #view, .inner, #content, .content, main,
        [class*="page-wrapper"], [class*="outer"],
        .splash, [class*="home-page"] {
            background:${t.bg} !important;
            color:${t.text} !important;
        }

        /* ── White bar kill — targets scratch's #navigation wrapper ── */
        body > div:first-of-type,
        #navigation-outer, .navigation-outer,
        [id*="navigation"], [class*="navigation-wrapper"] {
            background:#0d0d0d !important;
            box-shadow:none !important;
        }

        /* ── Cards ── */
        .project-card, .studio-card, .card,
        [class*="project-card"], [class*="studio-card"],
        [class*="thumbnail-column"], [class*="grid-item"] {
            background:${t.cardBg} !important;
            border:1px solid ${t.cardBorder} !important;
            border-radius:2px !important;
            box-shadow:none !important;
            color:${t.text} !important;
        }
        .project-card:hover, .studio-card:hover {
            border-color:${t.accent} !important;
        }
        .project-title, [class*="project-title"],
        [class*="thumbnail-title"] {
            font-family:'IBM Plex Mono',monospace !important;
            font-size:0.65rem !important;
            letter-spacing:1px !important;
            color:${t.text} !important;
        }

        /* ── Sidebar ── */
        .sidebar, [class*="sidebar"], [class*="stats"],
        .box, [class*="box-head"], [class*="box"] {
            background:${t.sideBg} !important;
            border:1px solid ${t.border} !important;
            border-radius:2px !important;
            color:${t.text} !important;
        }

        /* ── Headings ── */
        h1, h2, h3, h4, h5, h6 {
            font-family:'Bebas Neue',sans-serif !important;
            color:${t.text} !important;
            letter-spacing:2px !important;
        }

        /* ── Buttons — all of them ── */
        button, .button, input[type="submit"], input[type="button"],
        a.button, [class*="action-button"], [class*="button-cta"],
        [class*="btn"] {
            font-family:'IBM Plex Mono',monospace !important;
            font-size:0.65rem !important;
            font-weight:700 !important;
            letter-spacing:2px !important;
            text-transform:uppercase !important;
            border-radius:2px !important;
            cursor:pointer !important;
            transition:filter 0.15s, background 0.15s, color 0.15s, border-color 0.15s !important;
            box-shadow:none !important;
            outline:none !important;
        }

        /* Primary / CTA buttons */
        .button.button-cta, [class*="button-cta"], [class*="cta"],
        .see-inside-button, [class*="see-inside"],
        .remix-button, [class*="remix"],
        .green-flag-button, [class*="green-flag"] {
            background:${t.accent} !important;
            color:${t.accentText} !important;
            border:none !important;
        }
        .button.button-cta:hover, [class*="button-cta"]:hover,
        .see-inside-button:hover, .remix-button:hover {
            filter:brightness(1.12) !important;
        }

        /* Action buttons (report, copy link, etc) */
        .action-button, [class*="action-button"],
        .report-button, .copy-link-button,
        [class*="report-button"], [class*="copy-link"] {
            background:transparent !important;
            color:${t.sub} !important;
            border:1px solid ${t.border} !important;
        }
        .action-button:hover, [class*="action-button"]:hover {
            border-color:${t.accent} !important;
            color:${t.accent} !important;
            background:transparent !important;
        }

        /* Generic outlined buttons */
        .button:not(.button-cta):not([class*="action-button"]):not([class*="cta"]) {
            background:transparent !important;
            color:${t.text} !important;
            border:1px solid ${t.border} !important;
        }
        .button:not(.button-cta):not([class*="action-button"]):hover {
            border-color:${t.accent} !important;
            color:${t.accent} !important;
        }

        /* Studio/project add buttons */
        .studio-adder-button, [class*="studio-adder"],
        .add-to-studio, [class*="add-to-studio"] {
            background:${t.accent} !important;
            color:${t.accentText} !important;
            border:none !important;
        }

        /* Follow / love / star buttons */
        .follow-button, [class*="follow-button"],
        .love-button, [class*="love-button"],
        .favorite-button, [class*="favorite-button"] {
            background:transparent !important;
            color:${t.sub} !important;
            border:1px solid ${t.border} !important;
        }
        .follow-button:hover, .love-button:hover, .favorite-button:hover,
        [class*="follow-button"]:hover, [class*="love-button"]:hover {
            border-color:${t.accent} !important;
            color:${t.accent} !important;
        }
        .follow-button.followed, [class*="follow-button"].followed,
        .love-button.loved, .favorite-button.favorited {
            background:${t.accent} !important;
            color:${t.accentText} !important;
            border-color:${t.accent} !important;
        }

        /* ── Cool factor ── */

        /* Scanline overlay on the whole page */
        body::before {
            content:'';
            position:fixed; inset:0; pointer-events:none; z-index:99997;
            background:repeating-linear-gradient(
                0deg, transparent, transparent 2px,
                rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px
            );
        }

        /* Accent glow on focused inputs */
        input:focus, textarea:focus {
            box-shadow:0 0 0 2px ${t.accent}22 !important;
        }

        /* Card hover glow */
        .project-card:hover, .studio-card:hover,
        [class*="project-card"]:hover, [class*="studio-card"]:hover {
            border-color:${t.accent} !important;
            box-shadow:0 0 12px ${t.accent}18 !important;
        }

        /* Nav link active accent underline */
        #navigation ul li.active a,
        #navigation ul li.selected a {
            color:${t.accent} !important;
            border-bottom:2px solid ${t.accent} !important;
        }

        /* Corner bracket on profile avatar */
        .avatar-wrapper {
            position:relative !important;
        }
        .avatar-wrapper::after {
            content:'';
            position:absolute; bottom:-2px; right:-2px;
            width:6px; height:6px;
            border-bottom:2px solid ${t.accent};
            border-right:2px solid ${t.accent};
            pointer-events:none;
        }

        /* Accent left-border on comments */
        .comment, [class*="comment"] {
            border-left:2px solid ${t.accent} !important;
        }

        /* Subtle top accent bar on cards */
        .project-card::before, [class*="project-card"]::before {
            content:'';
            display:block;
            height:2px;
            background:${t.accent};
            opacity:0;
            transition:opacity 0.15s;
        }
        .project-card:hover::before, [class*="project-card"]:hover::before {
            opacity:1;
        }

        /* Forum row hover */
        tr:hover td { background:${t.panel} !important; }

        /* Sidebar box header accent */
        .box .box-head, [class*="box-head"] {
            border-bottom:1px solid ${t.accent} !important;
            color:${t.accent} !important;
            font-family:'Bebas Neue',sans-serif !important;
            letter-spacing:2px !important;
            font-size:0.9rem !important;
        }

        /* Selection color */
        ::selection { background:${t.accent} !important; color:${t.accentText} !important; }

        /* ── Inputs ── */
        input, textarea, select {
            background:${t.inputBg} !important;
            border:1px solid ${t.inputBorder} !important;
            color:${t.text} !important;
            border-radius:2px !important;
            font-family:'IBM Plex Mono',monospace !important;
            box-shadow:none !important;
        }
        input:focus, textarea:focus { border-color:${t.accent} !important; outline:none !important; }
        ::placeholder { color:${t.sub} !important; }

        /* ── Footer ── */
        #footer, footer, .footer {
            background:${t.panel} !important;
            border-top:1px solid ${t.border} !important;
            color:${t.sub} !important;
            font-family:'IBM Plex Mono',monospace !important;
        }
        #footer a, footer a { color:${t.sub} !important; }
        #footer a:hover, footer a:hover { color:${t.accent} !important; }

        /* ── Comments ── */
        .comment, [class*="comment"] {
            background:${t.cardBg} !important;
            border:1px solid ${t.cardBorder} !important;
            border-radius:2px !important;
            color:${t.text} !important;
        }

        /* ── Forum ── */
        table { border-color:${t.border} !important; }
        tr, td, th {
            background:${t.cardBg} !important;
            border-color:${t.border} !important;
            color:${t.text} !important;
            font-family:'IBM Plex Mono',monospace !important;
        }
        tr:nth-child(even) td { background:${t.panel} !important; }

        /* ── Profile ── */
        [class*="profile-header"], [class*="user-header"] {
            background:${t.panel} !important;
            border-bottom:1px solid ${t.border} !important;
        }

        /* ── Watermark ── */
        #tb-watermark {
            position:fixed; bottom:12px; right:14px;
            font-family:'IBM Plex Mono',monospace;
            font-size:0.5rem; letter-spacing:2px; text-transform:uppercase;
            color:${t.sub}; z-index:99990; pointer-events:none; opacity:0.4;
        }

        /* ── Theme switcher ── */
        #tb-switcher {
            position:fixed; bottom:12px; left:14px; z-index:99995;
            display:flex; gap:5px; align-items:center;
        }
        #tb-switcher-toggle {
            background:${t.panel}; border:1px solid ${t.border}; color:${t.sub};
            font-family:'IBM Plex Mono',monospace; font-size:0.5rem;
            letter-spacing:2px; text-transform:uppercase;
            padding:5px 9px; cursor:pointer; border-radius:2px; transition:all 0.15s;
        }
        #tb-switcher-toggle:hover { border-color:${t.accent}; color:${t.accent}; }
        #tb-switcher-opts { display:none; gap:4px; }
        #tb-switcher-opts.open { display:flex; }
        .tb-sw-btn {
            background:${t.panel}; border:1px solid ${t.border}; color:${t.sub};
            font-family:'IBM Plex Mono',monospace; font-size:0.48rem;
            letter-spacing:1px; text-transform:uppercase;
            padding:5px 8px; cursor:pointer; border-radius:2px;
            transition:all 0.15s; display:flex; align-items:center; gap:5px;
        }
        .tb-sw-btn:hover { color:${t.text}; border-color:${t.sub}; }
        .tb-sw-btn.active { color:${t.accent}; border-color:${t.accent}; background:${t.bg}; }
        .tb-sw-dot { width:6px; height:6px; border-radius:1px; display:inline-block; }
        `;
    }

    // ── Inject style ────────────────────────────────────────────
    var styleEl = document.getElementById('tb-retheme-style');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'tb-retheme-style';
        document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = buildCSS(currentTheme);

    replaceFavicon(currentTheme);
    replaceLogo(currentTheme);

    // ── Watermark ───────────────────────────────────────────────
    if (!document.getElementById('tb-watermark')) {
        var wm = document.createElement('div');
        wm.id = 'tb-watermark';
        wm.textContent = '// tb-retheme active';
        document.body.appendChild(wm);
    }

    // ── Theme switcher UI ───────────────────────────────────────
    if (!document.getElementById('tb-switcher')) {
        var sw = document.createElement('div');
        sw.id = 'tb-switcher';
        sw.innerHTML = '<button id="tb-switcher-toggle">&gt;_ theme</button>'
            + '<div id="tb-switcher-opts">'
            + '<button class="tb-sw-btn" data-theme="default"><span class="tb-sw-dot" style="background:#e8ff47"></span>DEFAULT</button>'
            + '<button class="tb-sw-btn" data-theme="midnight"><span class="tb-sw-dot" style="background:#a855f7"></span>MIDNIGHT</button>'
            + '<button class="tb-sw-btn" data-theme="blood"><span class="tb-sw-dot" style="background:#ff2233"></span>BLOOD</button>'
            + '<button class="tb-sw-btn" data-theme="moon"><span class="tb-sw-dot" style="background:#c8c8c8"></span>MOON</button>'
            + '</div>';
        document.body.appendChild(sw);
    }

    function updateSwitcher(key) {
        document.querySelectorAll('.tb-sw-btn').forEach(function(btn) {
            btn.classList.toggle('active', btn.dataset.theme === key);
        });
    }
    updateSwitcher(currentTheme);

    document.getElementById('tb-switcher-toggle').onclick = function() {
        document.getElementById('tb-switcher-opts').classList.toggle('open');
    };
    document.querySelectorAll('.tb-sw-btn').forEach(function(btn) {
        btn.onclick = function() {
            var key = this.dataset.theme;
            currentTheme = key;
            try { localStorage.setItem('tb-theme', key); } catch(e){}
            styleEl.innerHTML = buildCSS(key);
            replaceFavicon(key);
            replaceLogo(key);
            updateSwitcher(key);
        };
    });

    // ── MutationObserver — logo only, once, then disconnect ─────
    var logoObserver = new MutationObserver(function() {
        if (document.querySelector('li.logo a') && !document.getElementById('tb-logo-text')) {
            replaceLogo(currentTheme);
        }
        if (document.getElementById('tb-logo-text')) {
            logoObserver.disconnect();
        }
    });
    logoObserver.observe(document.body, { childList:true, subtree:true });

    console.log('%c// >scratch_ retheme loaded', 'font-family:monospace;color:#e8ff47;background:#111;padding:2px 8px;');

})();
