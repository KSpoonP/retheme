(function() {

    var THEMES = {
        default:  { accent:'#e8ff47', accentText:'#000', panel:'#111',    bg:'#161616', border:'#2a2a2a', text:'#f0f0f0', sub:'#555',    navBg:'#0d0d0d', navBorder:'#2a2a2a', btnBg:'#e8ff47', btnText:'#000', link:'#e8ff47', linkHover:'#fff',    inputBg:'#1e1e1e', inputBorder:'#2a2a2a', cardBg:'#111',    cardBorder:'#2a2a2a', sideBg:'#0d0d0d' },
        midnight: { accent:'#a855f7', accentText:'#fff', panel:'#0e0b1a', bg:'#130d24', border:'#2d1f4e', text:'#e8d5ff', sub:'#5b3f8a', navBg:'#0a0814', navBorder:'#2d1f4e', btnBg:'#a855f7', btnText:'#fff', link:'#a855f7', linkHover:'#e8d5ff', inputBg:'#180f2e', inputBorder:'#2d1f4e', cardBg:'#0e0b1a', cardBorder:'#2d1f4e', sideBg:'#0a0814' },
        blood:    { accent:'#ff2233', accentText:'#fff', panel:'#110808', bg:'#180a0a', border:'#3a1010', text:'#ffd4d4', sub:'#6b2020', navBg:'#0d0606', navBorder:'#3a1010', btnBg:'#ff2233', btnText:'#fff', link:'#ff2233', linkHover:'#ffd4d4', inputBg:'#1a0909', inputBorder:'#3a1010', cardBg:'#110808', cardBorder:'#3a1010', sideBg:'#0d0606' },
        moon:     { accent:'#c8c8c8', accentText:'#000', panel:'#0f0f0f', bg:'#181818', border:'#2e2e2e', text:'#e8e8e8', sub:'#4a4a4a', navBg:'#0a0a0a', navBorder:'#2e2e2e', btnBg:'#c8c8c8', btnText:'#000', link:'#c8c8c8', linkHover:'#fff',    inputBg:'#1c1c1c', inputBorder:'#2e2e2e', cardBg:'#0f0f0f', cardBorder:'#2e2e2e', sideBg:'#0a0a0a' },
    };

    var currentTheme = (function(){ try { return localStorage.getItem('tb-theme') || 'default'; } catch(e){ return 'default'; } })();
    if (!THEMES[currentTheme]) currentTheme = 'default';

    // ── Mark active for persistence ─────────────────────────────
    try { localStorage.setItem('tb-retheme-active', '1'); } catch(e){}

    // ── Intercept all link clicks to re-inject on next page ────
    document.addEventListener('click', function(e) {
        var a = e.target.closest('a[href]');
        if (!a) return;
        var href = a.getAttribute('href');
        if (!href || href.startsWith('javascript') || href.startsWith('#') || href.startsWith('mailto')) return;
        try { localStorage.setItem('tb-retheme-active', '1'); } catch(e){}
    }, true);

    // ── Auto re-inject if flag is set (called on every page load) ─
    // This script is the bookmarklet — persistence is handled by injecting
    // a tiny script tag into every page via the flag + a loader snippet
    // stored in sessionStorage that re-runs the bookmarklet src
    try {
        if (!sessionStorage.getItem('tb-loader-injected')) {
            sessionStorage.setItem('tb-loader-injected', '1');
            // Patch every link on the page to carry the retheme script forward
            function patchLinks() {
                document.querySelectorAll('a[href]').forEach(function(a) {
                    if (a.__tbPatched) return;
                    a.__tbPatched = true;
                    a.addEventListener('click', function() {
                        try { localStorage.setItem('tb-retheme-active', '1'); } catch(e){}
                    });
                });
            }
            patchLinks();
            // Re-patch on DOM changes for dynamic links
            new MutationObserver(patchLinks).observe(document.body, { childList:true, subtree:true });
        }
    } catch(e){}

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
        var url = 'data:image/svg+xml;base64,' + btoa(svg);
        document.querySelectorAll('link[rel*="icon"]').forEach(function(el) { el.remove(); });
        var lnk = document.createElement('link');
        lnk.rel = 'icon'; lnk.type = 'image/svg+xml'; lnk.href = url;
        document.head.appendChild(lnk);
    }

    // ── Logo: >scratch_ ────────────────────────────────────────
    function buildLogoSVG(key) {
        var color = THEMES[key].accent;
        return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 36" width="160" height="36">'
             + '<rect width="160" height="36" fill="none"/>'
             + '<text x="2" y="28" font-family="monospace" font-size="22" font-weight="900" fill="' + color + '">&gt;scratch_</text>'
             + '</svg>';
    }

    function replaceLogo(key) {
        var svgUrl = 'data:image/svg+xml;base64,' + btoa(buildLogoSVG(key));

        // Swap any img that looks like the Scratch logo
        document.querySelectorAll('img').forEach(function(img) {
            var src = (img.getAttribute('src') || '').toLowerCase();
            var alt = (img.getAttribute('alt') || '').toLowerCase();
            if (src.indexOf('logo') !== -1 || src.indexOf('scratch') !== -1 || alt === 'scratch' || alt.indexOf('logo') !== -1) {
                img.src = svgUrl;
                img.removeAttribute('srcset');
                img.style.cssText += ';width:160px!important;height:36px!important;object-fit:contain!important;opacity:1!important;max-width:none!important;';
            }
        });

        // Hide any inline SVG scratch logos and inject ours
        document.querySelectorAll('[class*="logo"] svg, [class*="Logo"] svg, [class*="brand"] svg').forEach(function(svg) {
            if (svg.__tbReplaced) return;
            svg.__tbReplaced = true;
            svg.style.display = 'none';
            var img = document.createElement('img');
            img.src = svgUrl;
            img.style.cssText = 'width:160px;height:36px;object-fit:contain;display:inline-block;vertical-align:middle;';
            svg.parentNode.insertBefore(img, svg);
        });
    }

    // ── CSS ─────────────────────────────────────────────────────
    function buildCSS(k) {
        var t = THEMES[k];
        return `
        /* === TB RETHEME === */
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-track { background:${t.bg}; }
        ::-webkit-scrollbar-thumb { background:${t.border}; border-radius:2px; }

        html, body { background:${t.bg} !important; color:${t.text} !important; font-family:'IBM Plex Mono',monospace !important; }

        /* Kill whites — every div/section/span that isn't an image */
        div, section, aside, main, article, span, li, ul, ol, form, label, p {
            background-color: transparent !important;
        }

        /* Explicit backgrounds for key structural elements */
        header, nav,
        [class*="NavBar"], [class*="navbar"], [class*="Navbar"],
        [class*="nav-desktop"], [class*="top-bar"], [class*="TopBar"],
        [class*="menu-bar"], [class*="MenuBar"],
        [class*="menu-bar-wrapper"], [class*="MenuBarWrapper"],
        [class*="navbar-wrapper"], [class*="NavbarWrapper"] {
            background:${t.navBg} !important;
            border-bottom:1px solid ${t.navBorder} !important;
            box-shadow:none !important;
        }
        header *, nav *, [class*="NavBar"] *, [class*="navbar"] *,
        [class*="menu-bar"] *, [class*="MenuBar"] * {
            font-family:'IBM Plex Mono',monospace !important;
        }

        /* Page base */
        #main-content, .main-content, #content, .content,
        [class*="page-wrapper"], [class*="PageWrapper"],
        [class*="outer"], [class*="inner"], .wrapper, .splash,
        [class*="home-page"], [class*="HomePage"] {
            background:${t.bg} !important;
            color:${t.text} !important;
        }

        /* Cards */
        .card, [class*="Card"], [class*="project-card"],
        [class*="studio-card"], [class*="tile"], [class*="Tile"],
        [class*="grid-item"], [class*="GridItem"],
        [class*="carousel-item"], [class*="CarouselItem"],
        [class*="thumbnail-column"], [class*="preview"], [class*="Preview"] {
            background:${t.cardBg} !important;
            border:1px solid ${t.cardBorder} !important;
            border-radius:2px !important;
            box-shadow:none !important;
            color:${t.text} !important;
        }
        .card:hover, [class*="Card"]:hover, [class*="project-card"]:hover {
            border-color:${t.accent} !important;
        }

        /* Sidebar */
        .sidebar, [class*="sidebar"], [class*="Sidebar"],
        [class*="stats"], [class*="Stats"],
        [class*="profile-details"], [class*="about-me"] {
            background:${t.sideBg} !important;
            border:1px solid ${t.border} !important;
            border-radius:2px !important;
        }

        /* Banners / hero */
        .banner, [class*="banner"], [class*="Banner"],
        .hero, [class*="hero"], [class*="Hero"],
        [class*="featured"], [class*="Featured"] {
            background:${t.panel} !important;
            border-bottom:1px solid ${t.border} !important;
        }

        /* Typography */
        h1, h2, h3, h4, h5, h6 {
            font-family:'Bebas Neue',sans-serif !important;
            color:${t.text} !important;
            letter-spacing:2px !important;
        }

        /* Buttons */
        button, .button, [class*="button"], [class*="Button"],
        input[type="submit"], input[type="button"] {
            font-family:'IBM Plex Mono',monospace !important;
            border-radius:2px !important;
            letter-spacing:1px !important;
            text-transform:uppercase !important;
        }
        [class*="btn-primary"], [class*="PrimaryButton"], [class*="ActionButton"],
        [class*="join-button"], [class*="JoinButton"] {
            background:${t.btnBg} !important;
            color:${t.btnText} !important;
            border:none !important;
        }
        [class*="btn-secondary"], [class*="SecondaryButton"] {
            background:transparent !important;
            color:${t.accent} !important;
            border:1px solid ${t.accent} !important;
        }

        /* Links */
        a { color:${t.link} !important; text-decoration:none !important; }
        a:hover { color:${t.linkHover} !important; }

        /* Inputs */
        input, textarea, select {
            background:${t.inputBg} !important;
            border:1px solid ${t.inputBorder} !important;
            color:${t.text} !important;
            border-radius:2px !important;
            font-family:'IBM Plex Mono',monospace !important;
            box-shadow:none !important;
            outline:none !important;
        }
        input:focus, textarea:focus, select:focus { border-color:${t.accent} !important; }
        ::placeholder { color:${t.sub} !important; }

        /* Footer */
        footer, #footer, .footer, [class*="footer"], [class*="Footer"] {
            background:${t.panel} !important;
            border-top:1px solid ${t.border} !important;
            color:${t.sub} !important;
            font-family:'IBM Plex Mono',monospace !important;
            font-size:0.65rem !important;
        }
        footer a, [class*="footer"] a { color:${t.sub} !important; }
        footer a:hover, [class*="footer"] a:hover { color:${t.accent} !important; }

        /* Editor / stage */
        [class*="stage-wrapper"], [class*="StageWrapper"],
        [class*="stage-header"], [class*="StageHeader"],
        [class*="menu-bar"], [class*="MenuBar"],
        .gui, [class*="gui"] {
            background:${t.panel} !important;
            border-color:${t.border} !important;
        }
        [class*="blocks-wrapper"], [class*="scratch-blocks"] { background:${t.bg} !important; }

        /* Comments / forum */
        .comment, [class*="comment"], [class*="Comment"],
        .post, [class*="post"], .topic, [class*="topic"],
        table, tr, td, th {
            background:${t.cardBg} !important;
            border-color:${t.border} !important;
            color:${t.text} !important;
            font-family:'IBM Plex Mono',monospace !important;
        }
        tr:nth-child(even) { background:${t.panel} !important; }

        /* Profile */
        [class*="profile-header"], [class*="ProfileHeader"],
        [class*="user-header"], [class*="UserHeader"] {
            background:${t.panel} !important;
            border-bottom:1px solid ${t.border} !important;
        }
        [class*="avatar"], [class*="Avatar"] {
            border:2px solid ${t.accent} !important;
            border-radius:2px !important;
        }

        /* Modals */
        [class*="modal"], [class*="Modal"] {
            background:${t.panel} !important;
            border:1px solid ${t.border} !important;
            border-radius:4px !important;
            color:${t.text} !important;
        }

        /* Tabs */
        [class*="tab"], [class*="Tab"] {
            font-family:'IBM Plex Mono',monospace !important;
            background:${t.bg} !important;
            color:${t.sub} !important;
            border-color:${t.border} !important;
            letter-spacing:1px !important;
            text-transform:uppercase !important;
            font-size:0.65rem !important;
        }
        [class*="tab-active"], [class*="TabActive"],
        [class*="tab"].active, [class*="Tab"].active {
            background:${t.panel} !important;
            color:${t.accent} !important;
            border-bottom-color:${t.accent} !important;
        }

        /* Badges */
        [class*="badge"], [class*="Badge"],
        [class*="notification"], [class*="Notification"] {
            background:${t.accent} !important;
            color:${t.accentText} !important;
            border-radius:2px !important;
            font-family:'IBM Plex Mono',monospace !important;
            font-size:0.6rem !important;
        }

        /* Scratch orange nuke */
        [style*="background: rgb(255, 140, 26)"],
        [style*="background:rgb(255, 140, 26)"],
        [style*="background-color: rgb(255, 140, 26)"],
        [style*="background-color:rgb(255,140,26)"] {
            background:${t.navBg} !important;
        }
        [style*="color: rgb(255, 140, 26)"],
        [style*="color:rgb(255, 140, 26)"] { color:${t.accent} !important; }

        /* Watermark */
        #tb-watermark {
            position:fixed; bottom:12px; right:14px;
            font-family:'IBM Plex Mono',monospace;
            font-size:0.52rem; letter-spacing:2px; text-transform:uppercase;
            color:${t.sub}; z-index:99990; pointer-events:none; opacity:0.5;
        }

        /* Theme switcher */
        #tb-switcher {
            position:fixed; bottom:12px; left:14px; z-index:99995;
            display:flex; gap:5px; align-items:center;
        }
        #tb-switcher-toggle {
            background:${t.panel}; border:1px solid ${t.border}; color:${t.sub};
            font-family:'IBM Plex Mono',monospace; font-size:0.52rem;
            letter-spacing:2px; text-transform:uppercase;
            padding:5px 9px; cursor:pointer; border-radius:2px; transition:all 0.15s;
        }
        #tb-switcher-toggle:hover { border-color:${t.accent}; color:${t.accent}; }
        #tb-switcher-opts { display:none; gap:4px; }
        #tb-switcher-opts.open { display:flex; }
        .tb-sw-btn {
            background:${t.panel}; border:1px solid ${t.border}; color:${t.sub};
            font-family:'IBM Plex Mono',monospace; font-size:0.5rem;
            letter-spacing:1px; text-transform:uppercase;
            padding:5px 8px; cursor:pointer; border-radius:2px;
            transition:all 0.15s; display:flex; align-items:center; gap:5px;
        }
        .tb-sw-btn:hover { color:${t.text}; border-color:${t.sub}; }
        .tb-sw-btn.active { color:${t.accent}; border-color:${t.accent}; background:${t.bg}; }
        .tb-sw-dot { width:7px; height:7px; border-radius:1px; display:inline-block; }
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
        sw.innerHTML = '<button id="tb-switcher-toggle">&gt;_ THEME</button>'
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

    // ── MutationObserver: re-apply logo on React re-renders ─────
    new MutationObserver(function(mutations) {
        var shouldReplace = false;
        mutations.forEach(function(m) { if (m.addedNodes.length) shouldReplace = true; });
        if (shouldReplace) replaceLogo(currentTheme);
    }).observe(document.body, { childList:true, subtree:true });

    console.log('%c// >scratch_ retheme loaded', 'font-family:monospace;color:#e8ff47;background:#111;padding:2px 8px;');

})();
