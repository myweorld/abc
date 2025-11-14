// ==UserScript==
// @name         Agar.live Spectate System
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Advanced spectate system for agar.live
// @author       You
// @match        *://agar.live/*
// @match        *://*.agar.live/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    console.log('[Agar.live Spectate] Userscript loading...');

    // Wait for page to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        console.log('[Agar.live Spectate] Initializing...');

        // Inject CSS
        injectCSS();

        // Inject main script
        injectScript();
    }

    function injectCSS() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        // jsDelivr CDN - automatically serves from GitHub
        link.href = 'https://cdn.jsdelivr.net/gh/myweorld/abc@main/docs/assets/endymion.css?61d39546479e749e0e9d';
        document.head.appendChild(link);
    }

    function injectScript() {
        const script = document.createElement('script');
        // jsDelivr CDN - automatically serves from GitHub
        script.src = 'https://cdn.jsdelivr.net/gh/myweorld/abc@main/docs/AgarLive.pack.js?61d39546479e749e0e9d';

        script.onload = () => {
            console.log('[Agar.live Spectate] Main script loaded!');

            // Access the protocol instance
            if (window.agarLive) {
                console.log('[Agar.live Spectate] Protocol initialized:', window.agarLive);
            }
        };

        script.onerror = () => {
            console.error('[Agar.live Spectate] Failed to load main script');
        };

        document.head.appendChild(script);
    }

    // For testing with localhost (CORS bypass needed)
    function injectFromLocalhost() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'http://127.0.0.1:5500/dist/assets/endymion.css?61d39546479e749e0e9d';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = 'http://127.0.0.1:5500/dist/AgarLive.pack.js?61d39546479e749e0e9d';
        script.onload = () => console.log('[Agar.live Spectate] Loaded from localhost');
        script.onerror = () => console.error('[Agar.live Spectate] Failed to load from localhost');
        document.head.appendChild(script);
    }

    // Uncomment for localhost testing (requires CORS disabled browser)
    // injectFromLocalhost();

})();
