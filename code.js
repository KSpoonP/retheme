(function() {

    var THEMES = {
        default: {
            accent: '#e8ff47', accentText: '#000',
            panel: '#111', bg: '#161616', border: '#2a2a2a',
            text: '#f0f0f0', sub: '#555', progress: '#e8ff47',
            navBg: '#111', navBorder: '#2a2a2a',
            btnBg: '#e8ff47', btnText: '#000',
            link: '#e8ff47', linkHover: '#fff',
            inputBg: '#1e1e1e', inputBorder: '#2a2a2a',
            cardBg: '#161616', cardBorder: '#2a2a2a',
            sideBg: '#111',
        },
        midnight: {
            accent: '#a855f7', accentText: '#fff',
            panel: '#0e0b1a', bg: '#130d24', border: '#2d1f4e',
            text: '#e8d5ff', sub: '#5b3f8a', progress: '#a855f7',
            navBg: '#0e0b1a', navBorder: '#2d1f4e',
            btnBg: '#a855f7', btnText: '#fff',
            link: '#a855f7', linkHover: '#e8d5ff',
            inputBg: '#180f2e', inputBorder: '#2d1f4e',
            cardBg: '#130d24', cardBorder: '#2d1f4e',
            sideBg: '#0e0b1a',
        },
        blood: {
            accent: '#ff2233', accentText: '#fff',
            panel: '#110808', bg: '#180a0a', border: '#3a1010',
            text: '#ffd4d4', sub: '#6b2020', progress: '#ff2233',
            navBg: '#110808', navBorder: '#3a1010',
            btnBg: '#ff2233', btnText: '#fff',
            link: '#ff2233', linkHover: '#ffd4d4',
            inputBg: '#1a0909', inputBorder: '#3a1010',
            cardBg: '#180a0a', cardBorder: '#3a1010',
            sideBg: '#110808',
        },
        moon: {
            accent: '#c8c8c8', accentText: '#000',
            panel: '#0f0f0f', bg: '#181818', border: '#2e2e2e',
            text: '#e8e8e8', sub: '#4a4a4a', progress: '#c8c8c8',
            navBg: '#0f0f0f', navBorder: '#2e2e2e',
            btnBg: '#c8c8c8', btnText: '#000',
            link: '#c8c8c8', linkHover: '#fff',
            inputBg: '#1c1c1c', inputBorder: '#2e2e2e',
            cardBg: '#181818', cardBorder: '#2e2e2e',
            sideBg: '#0f0f0f',
        }
    };

    var savedTheme = (function(){ try { return localStorage.getItem('tb-theme') || 'default'; } catch(e){ return 'default'; } })();
    var currentTheme = THEMES[savedTheme] ? savedTheme : 'default';
    var t = THEMES[currentTheme];

    // ── Inject Google Fonts ─────────────────────────────────────
    if (!document.getElementById('tb-fonts')) {
        var fontLink = document.createElement('link');
        fontLink.id = 'tb-fonts';
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&family=Bebas+Neue&display=swap';
        document.head.appendChild(fontLink);
    }

    // ── Logo SVG (>_ terminal style) ────────────────────────────
    function buildLogoSVG(color) {
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 32" width="80" height="32">
            <text x="2" y="26" font-family="'IBM Plex Mono', monospace" font-size="28" font-weight="700" fill="${color}">&#62;_</text>
        </svg>`;
    }

    // ── Main CSS ────────────────────────────────────────────────
    function buildCSS(k) {
        var t = THEMES[k];
        return `
        /* === TB RETHEME === */
        * { scrollbar-color: ${t.border} ${t.bg}; scrollbar-width: thin; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${t.bg}; }
        ::-webkit-scrollbar-thumb { background: ${t.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${t.sub}; }

        body, html {
            background: ${t.bg} !important;
            color: ${t.text} !important;
            font-family: 'IBM Plex Mono', monospace !important;
        }

        /* ── Navbar ── */
        #navigation, .navigation, nav#nav, .nav-desktop, [class*="nav-desktop"],
        header, .header, #header, .top-bar, [class*="top-bar"],
        .NavBar, [class*="NavBar"], [class*="navbar"], [class*="Navbar"] {
            background: ${t.navBg} !important;
            border-bottom: 1px solid ${t.navBorder} !important;
            box-shadow: none !important;
        }
        #navigation *, .navigation *, nav#nav *, .NavBar *,
        [class*="NavBar"] *, [class*="navbar"] * {
            font-family: 'IBM Plex Mono', monospace !important;
        }

        /* Nav links */
        #navigation a, .navigation a, nav a, .NavBar a,
        [class*="NavBar"] a, [class*="navbar"] a,
        [class*="nav-item"], [class*="NavItem"] {
            color: ${t.sub} !important;
            text-decoration: none !important;
            letter-spacing: 1px !important;
            font-size: 0.75rem !important;
            text-transform: uppercase !important;
            transition: color 0.15s !important;
        }
        #navigation a:hover, .navigation a:hover, nav a:hover,
        .NavBar a:hover, [class*="NavBar"] a:hover {
            color: ${t.accent} !important;
        }

        /* Nav search */
        #navigation input[type="text"], .navigation input[type="text"],
        input[type="search"], [class*="search-input"], [class*="SearchInput"] {
            background: ${t.inputBg} !important;
            border: 1px solid ${t.inputBorder} !important;
            color: ${t.text} !important;
            border-radius: 2px !important;
            font-family: 'IBM Plex Mono', monospace !important;
            font-size: 0.7rem !important;
            letter-spacing: 1px !important;
            outline: none !important;
            box-shadow: none !important;
        }
        input[type="search"]:focus, [class*="search-input"]:focus {
            border-color: ${t.accent} !important;
        }

        /* Nav buttons / join / sign in */
        [class*="join-button"], [class*="JoinButton"],
        [class*="login-button"], [class*="LoginButton"],
        .nav-join, .nav-login, button.join, button.login,
        [class*="nav-create"] {
            background: ${t.btnBg} !important;
            color: ${t.btnText} !important;
            border: none !important;
            border-radius: 2px !important;
            font-family: 'IBM Plex Mono', monospace !important;
            font-size: 0.7rem !important;
            font-weight: 700 !important;
            letter-spacing: 2px !important;
            text-transform: uppercase !important;
            cursor: pointer !important;
        }

        /* ── Page / Site Background ── */
        #main-content, .main-content, #content, .content,
        .outer, [class*="outer"], .inner, [class*="inner"],
        [class*="page-wrapper"], [class*="PageWrapper"],
        [class*="site-wrapper"], .wrapper,
        .splash, [class*="splash"],
        [class*="home-page"], [class*="HomePage"],
        [class*="studio"], [class*="Studio"] {
            background: ${t.bg} !important;
            color: ${t.text} !important;
        }

        /* ── Cards / Tiles / Boxes ── */
        .project-card, [class*="project-card"],
        .studio-card, [class*="studio-card"],
        .card, [class*="Card"],
        .box, [class*="box"],
        .tile, [class*="tile"],
        [class*="thumbnail-column"],
        [class*="preview"], [class*="Preview"],
        [class*="carousel-item"], [class*="CarouselItem"],
        [class*="grid-item"], [class*="GridItem"] {
            background: ${t.cardBg} !important;
            border: 1px solid ${t.cardBorder} !important;
            border-radius: 2px !important;
            box-shadow: none !important;
            color: ${t.text} !important;
        }
        .project-card:hover, [class*="project-card"]:hover,
        .card:hover, [class*="Card"]:hover {
            border-color: ${t.accent} !important;
            box-shadow: none !important;
        }
        [class*="thumbnail-title"], [class*="ThumbnailTitle"],
        [class*="card-title"], [class*="CardTitle"],
        .project-title, [class*="project-title"] {
            font-family: 'IBM Plex Mono', monospace !important;
            font-size: 0.65rem !important;
            letter-spacing: 1px !important;
            text-transform: uppercase !important;
            color: ${t.text} !important;
        }

        /* ── Sidebar ── */
        .sidebar, [class*="sidebar"], [class*="Sidebar"],
        .side-bar, [class*="side-bar"],
        [class*="stats"], [class*="Stats"],
        .profile-details, [class*="profile-details"],
        [class*="about-me"], [class*="AboutMe"] {
            background: ${t.sideBg} !important;
            border: 1px solid ${t.border} !important;
            border-radius: 2px !important;
            color: ${t.text} !important;
        }

        /* ── Banners / Hero ── */
        .banner, [class*="banner"], [class*="Banner"],
        .hero, [class*="hero"], [class*="Hero"],
        [class*="featured"], [class*="Featured"],
        .intro-banner, [class*="intro-banner"] {
            background: ${t.panel} !important;
            border-bottom: 1px solid ${t.border} !important;
            color: ${t.text} !important;
        }

        /* ── Section Headers ── */
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Bebas Neue', sans-serif !important;
            color: ${t.text} !important;
            letter-spacing: 2px !important;
        }
        [class*="section-header"], [class*="SectionHeader"],
        [class*="category-header"], [class*="CategoryHeader"] {
            font-family: 'Bebas Neue', sans-serif !important;
            color: ${t.text} !important;
            letter-spacing: 3px !important;
            text-transform: uppercase !important;
            border-bottom: 1px solid ${t.border} !important;
        }

        /* ── Buttons (global) ── */
        button, .button, [class*="button"], [class*="Button"],
        input[type="submit"], input[type="button"] {
            font-family: 'IBM Plex Mono', monospace !important;
            border-radius: 2px !important;
            letter-spacing: 1px !important;
            text-transform: uppercase !important;
            transition: filter 0.15s, border-color 0.15s, color 0.15s !important;
        }
        button.btn-primary, [class*="btn-primary"],
        [class*="primary-button"], [class*="PrimaryButton"],
        [class*="action-button"], [class*="ActionButton"] {
            background: ${t.btnBg} !important;
            color: ${t.btnText} !important;
            border: none !important;
        }
        button.btn-primary:hover, [class*="btn-primary"]:hover {
            filter: brightness(1.1) !important;
        }
        button.btn-secondary, [class*="btn-secondary"],
        [class*="secondary-button"], [class*="SecondaryButton"] {
            background: transparent !important;
            color: ${t.accent} !important;
            border: 1px solid ${t.accent} !important;
        }

        /* ── Links ── */
        a { color: ${t.link} !important; text-decoration: none !important; }
        a:hover { color: ${t.linkHover} !important; }

        /* ── Inputs / Textareas ── */
        input, textarea, select,
        [class*="input"], [class*="Input"],
        [class*="textarea"], [class*="Textarea"] {
            background: ${t.inputBg} !important;
            border: 1px solid ${t.inputBorder} !important;
            color: ${t.text} !important;
            border-radius: 2px !important;
            font-family: 'IBM Plex Mono', monospace !important;
            box-shadow: none !important;
            outline: none !important;
        }
        input:focus, textarea:focus, select:focus,
        [class*="input"]:focus {
            border-color: ${t.accent} !important;
        }
        ::placeholder { color: ${t.sub} !important; }

        /* ── Footer ── */
        footer, #footer, .footer, [class*="footer"], [class*="Footer"] {
            background: ${t.panel} !important;
            border-top: 1px solid ${t.border} !important;
            color: ${t.sub} !important;
            font-family: 'IBM Plex Mono', monospace !important;
            font-size: 0.65rem !important;
            letter-spacing: 1px !important;
        }
        footer a, #footer a, .footer a,
        [class*="footer"] a, [class*="Footer"] a {
            color: ${t.sub} !important;
        }
        footer a:hover, #footer a:hover {
            color: ${t.accent} !important;
        }

        /* ── Project Page / Editor ── */
        [class*="stage-wrapper"], [class*="StageWrapper"],
        [class*="stage-header"], [class*="StageHeader"],
        [class*="controls"], [class*="Controls"],
        [class*="menu-bar"], [class*="MenuBar"],
        .gui, [class*="gui"], [class*="Gui"] {
            background: ${t.panel} !important;
            border-color: ${t.border} !important;
            color: ${t.text} !important;
        }
        [class*="green-flag"], [class*="GreenFlag"],
        [class*="stop-all"], [class*="StopAll"] {
            filter: grayscale(0.5) brightness(0.9) !important;
        }
        [class*="blocks-wrapper"], [class*="BlocksWrapper"],
        [class*="scratch-blocks"], [class*="scratchBlocks"] {
            background: ${t.bg} !important;
        }

        /* ── Comments / Posts ── */
        .comment, [class*="comment"], [class*="Comment"],
        .post, [class*="post"], [class*="Post"],
        [class*="reply"], [class*="Reply"] {
            background: ${t.cardBg} !important;
            border: 1px solid ${t.cardBorder} !important;
            border-radius: 2px !important;
            color: ${t.text} !important;
        }

        /* ── Forums ── */
        .forum, [class*="forum"], [class*="Forum"],
        .topic, [class*="topic"], [class*="Topic"],
        table, .table, [class*="table"], [class*="Table"] {
            background: ${t.cardBg} !important;
            border-color: ${t.border} !important;
            color: ${t.text} !important;
        }
        tr, td, th {
            background: ${t.cardBg} !important;
            border-color: ${t.border} !important;
            color: ${t.text} !important;
            font-family: 'IBM Plex Mono', monospace !important;
        }
        tr:nth-child(even), [class*="row-even"] {
            background: ${t.panel} !important;
        }
        tr:hover, [class*="row"]:hover {
            background: ${t.panel} !important;
            border-color: ${t.accent} !important;
        }

        /* ── Profile page ── */
        [class*="profile-header"], [class*="ProfileHeader"],
        [class*="user-header"], [class*="UserHeader"] {
            background: ${t.panel} !important;
            border-bottom: 1px solid ${t.border} !important;
        }
        [class*="avatar"], [class*="Avatar"] {
            border: 2px solid ${t.accent} !important;
            border-radius: 2px !important;
        }

        /* ── Modals ── */
        [class*="modal"], [class*="Modal"],
        .modal-backdrop, [class*="modal-backdrop"],
        [class*="overlay"], [class*="Overlay"] {
            background: ${t.panel} !important;
            border: 1px solid ${t.border} !important;
            border-radius: 4px !important;
            color: ${t.text} !important;
        }

        /* ── Scratch Orange override ── */
        [style*="background-color: rgb(255, 140, 26)"],
        [style*="background-color:#ff8c1a"],
        [style*="background: rgb(255, 140, 26)"],
        [style*="background:#ff8c1a"],
        [style*="background-color: #ff8c1a"] {
            background-color: ${t.accent} !important;
            color: ${t.accentText} !important;
        }
        [style*="color: rgb(255, 140, 26)"],
        [style*="color:#ff8c1a"],
        [style*="color: #ff8c1a"] {
            color: ${t.accent} !important;
        }

        /* ── Notification / alert badges ── */
        [class*="badge"], [class*="Badge"],
        [class*="notification"], [class*="Notification"],
        [class*="alert"], [class*="Alert"] {
            background: ${t.accent} !important;
            color: ${t.accentText} !important;
            border-radius: 2px !important;
            font-family: 'IBM Plex Mono', monospace !important;
            font-size: 0.6rem !important;
            letter-spacing: 1px !important;
        }

        /* ── Scratch cat hide ── */
        [class*="scratch-cat"], img[src*="cat"], img[src*="scratch-logo"],
        img[alt="Scratch"] { opacity: 0 !important; }

        /* ── Tab bars ── */
        [class*="tab"], [class*="Tab"] {
            font-family: 'IBM Plex Mono', monospace !important;
            background: ${t.bg} !important;
            color: ${t.sub} !important;
            border-color: ${t.border} !important;
            letter-spacing: 1px !important;
            text-transform: uppercase !important;
            font-size: 0.65rem !important;
        }
        [class*="tab-active"], [class*="TabActive"],
        [class*="tab"].active, [class*="Tab"].active {
            background: ${t.panel} !important;
            color: ${t.accent} !important;
            border-bottom-color: ${t.accent} !important;
        }

        /* ── TB Watermark ── */
        #tb-watermark {
            position: fixed; bottom: 12px; right: 14px;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 0.55rem; letter-spacing: 2px; text-transform: uppercase;
            color: ${t.sub}; z-index: 99990; pointer-events: none;
            opacity: 0.6;
        }
        `;
    }

    // ── Inject / update style ───────────────────────────────────
    var styleEl = document.getElementById('tb-retheme-style');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'tb-retheme-style';
        document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = buildCSS(currentTheme);

    // ── Replace logos ───────────────────────────────────────────
    function replaceLogo(themeKey) {
        var t = THEMES[themeKey];
        var svgDataUrl = 'data:image/svg+xml;base64,' + btoa(buildLogoSVG(t.accent));

        // Find all Scratch logo images and swap them
        var selectors = [
            'img[src*="scratch_logo"]',
            'img[src*="logo"]',
            'img[alt="Scratch"]',
            'img[alt="scratch"]',
            '[class*="logo"] img',
            '[class*="Logo"] img',
            '[id*="logo"] img',
            'a.logo img',
            '.navlogo img',
            '[class*="nav-logo"] img',
            '[class*="NavLogo"] img',
        ];

        selectors.forEach(function(sel) {
            try {
                document.querySelectorAll(sel).forEach(function(img) {
                    img.src = svgDataUrl;
                    img.style.cssText = 'width:80px;height:32px;object-fit:contain;opacity:1!important;';
                });
            } catch(e){}
        });

        // Also handle SVG logos / text logos in nav
        var logoContainers = document.querySelectorAll(
            '[class*="logo"]:not(img), [class*="Logo"]:not(img), [id*="logo"]:not(img)'
        );
        logoContainers.forEach(function(el) {
            // Only replace if it contains an img or is the nav logo
            var imgs = el.querySelectorAll('img');
            if (imgs.length > 0) {
                imgs.forEach(function(img) {
                    img.src = svgDataUrl;
                    img.style.cssText = 'width:80px;height:32px;object-fit:contain;opacity:1!important;';
                });
            }
        });
    }
    replaceLogo(currentTheme);

    // ── Watermark ───────────────────────────────────────────────
    if (!document.getElementById('tb-watermark')) {
        var wm = document.createElement('div');
        wm.id = 'tb-watermark';
        wm.textContent = '// tb-retheme active';
        document.body.appendChild(wm);
    }

    // ── Theme Switcher UI ───────────────────────────────────────
    var switcherStyleEl = document.getElementById('tb-switcher-style');
    if (!switcherStyleEl) {
        switcherStyleEl = document.createElement('style');
        switcherStyleEl.id = 'tb-switcher-style';
        document.head.appendChild(switcherStyleEl);
    }

    function buildSwitcherCSS(k) {
        var t = THEMES[k];
        return `
        #tb-switcher {
            position: fixed; bottom: 12px; left: 14px; z-index: 99995;
            display: flex; gap: 5px; align-items: center;
        }
        #tb-switcher-toggle {
            background: ${t.panel}; border: 1px solid ${t.border};
            color: ${t.sub}; font-family: 'IBM Plex Mono', monospace;
            font-size: 0.55rem; letter-spacing: 2px; text-transform: uppercase;
            padding: 5px 9px; cursor: pointer; border-radius: 2px;
            transition: all 0.15s;
        }
        #tb-switcher-toggle:hover { border-color: ${t.accent}; color: ${t.accent}; }
        #tb-switcher-opts {
            display: none; gap: 4px;
        }
        #tb-switcher-opts.open { display: flex; }
        .tb-sw-btn {
            background: ${t.panel}; border: 1px solid ${t.border};
            color: ${t.sub}; font-family: 'IBM Plex Mono', monospace;
            font-size: 0.5rem; letter-spacing: 1px; text-transform: uppercase;
            padding: 5px 8px; cursor: pointer; border-radius: 2px;
            transition: all 0.15s; display: flex; align-items: center; gap: 5px;
        }
        .tb-sw-btn:hover { color: ${t.text}; border-color: ${t.sub}; }
        .tb-sw-btn.active { color: ${t.accent}; border-color: ${t.accent}; background: ${t.bg}; }
        .tb-sw-dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
        `;
    }
    switcherStyleEl.innerHTML = buildSwitcherCSS(currentTheme);

    if (!document.getElementById('tb-switcher')) {
        var switcher = document.createElement('div');
        switcher.id = 'tb-switcher';
        switcher.innerHTML = `
            <button id="tb-switcher-toggle">⚙ THEME</button>
            <div id="tb-switcher-opts">
                <button class="tb-sw-btn" data-theme="default"><span class="tb-sw-dot" style="background:#e8ff47"></span>DEFAULT</button>
                <button class="tb-sw-btn" data-theme="midnight"><span class="tb-sw-dot" style="background:#a855f7"></span>MIDNIGHT</button>
                <button class="tb-sw-btn" data-theme="blood"><span class="tb-sw-dot" style="background:#ff2233"></span>BLOOD</button>
                <button class="tb-sw-btn" data-theme="moon"><span class="tb-sw-dot" style="background:#c8c8c8"></span>MOON</button>
            </div>
        `;
        document.body.appendChild(switcher);
    }

    function updateSwitcherActive(key) {
        document.querySelectorAll('.tb-sw-btn').forEach(function(btn) {
            btn.classList.toggle('active', btn.dataset.theme === key);
        });
    }
    updateSwitcherActive(currentTheme);

    document.getElementById('tb-switcher-toggle').onclick = function() {
        document.getElementById('tb-switcher-opts').classList.toggle('open');
    };

    document.querySelectorAll('.tb-sw-btn').forEach(function(btn) {
        btn.onclick = function() {
            var key = this.dataset.theme;
            currentTheme = key;
            try { localStorage.setItem('tb-theme', key); } catch(e){}
            styleEl.innerHTML = buildCSS(key);
            switcherStyleEl.innerHTML = buildSwitcherCSS(key);
            replaceLogo(key);
            updateSwitcherActive(key);
        };
    });

    // ── MutationObserver: re-apply logo on dynamic DOM changes ──
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(m) {
            if (m.addedNodes.length) replaceLogo(currentTheme);
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    console.log('%c// tb-retheme loaded', 'font-family:monospace;color:#e8ff47;background:#111;padding:2px 6px;');

})();
