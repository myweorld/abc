// ==UserScript==
// @name         HSLO Endymion - Agar.live Edition
// @description  HSLO Endymion for Agar.live (Protocol 4) - Fullmap & Visual Effects
// @version      11.0
// @author       Adapted for Agar.live Protocol 4
// @match        *://agar.live/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @updateURL    https://myweorld.github.io/abc/userscript.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

// Agar.live Protocol 4 Edition
// Features: Fullmap, Visual Effects, Multibox, Complete UI
// Bot integration: Removed (will be re-added in future)

// Block all Agar.live scripts from loading
let scriptBlocker = null;

function blockAgarLiveScripts() {
    scriptBlocker = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === 'SCRIPT' && !node.src.includes('myweorld.github.io') && !node.src.includes('jquery')) {
                    node.remove();
                    console.log('[HSLO] Blocked Agar.live script:', node.src || 'inline');
                }
            });
        });
    });

    if (document.documentElement) {
        scriptBlocker.observe(document.documentElement, { childList: true, subtree: true });
    }
}

// Start blocking immediately
blockAgarLiveScripts();

const HSLO = new class {
    constructor() {
        this.method = 'GET';
        this.URL = 'https://myweorld.github.io/abc/index.html';
        this.HTML = ``;
        this.date = Date.now();
    }

    load() {
        // Stop Agar.live page loading
        window.stop();

        // Clear the page immediately
        setTimeout(() => {
            this.setMessage();
            this.fetch();
        }, 10);
    }

    setMessage() {
        document.open();
        document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>HSLO Endymion - Loading...</title>
            </head>
            <body style="margin: 0; padding: 0;">
                <div style="width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center; background: #111; color: #fff; font-family: 'Ubuntu', sans-serif;">
                    <div style="text-align: center;">
                        <h1 style="font-size: 48px; margin: 0; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">HSLO Endymion</h1>
                        <h2 style="font-size: 24px; color: #888; margin: 10px 0;">Agar.live Edition</h2>
                        <p style="font-size: 18px; margin-top: 20px; color: #aaa;">Loading Protocol 4...</p>
                        <div style="margin-top: 30px;">
                            <div style="width: 300px; height: 4px; background: #333; border-radius: 2px; overflow: hidden; margin: 0 auto;">
                                <div style="width: 0%; height: 100%; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); animation: loading 1.5s ease-in-out infinite;"></div>
                            </div>
                        </div>
                        <p style="font-size: 14px; margin-top: 30px; color: #555;">
                            ✓ Fullmap &nbsp; ✓ Visual Effects &nbsp; ✓ Multibox &nbsp; ✓ Complete UI
                        </p>
                    </div>
                </div>
                <style>
                    @keyframes loading {
                        0% { width: 0%; margin-left: 0%; }
                        50% { width: 50%; margin-left: 25%; }
                        100% { width: 0%; margin-left: 100%; }
                    }
                </style>
            </body>
            </html>
        `);
        document.close();
    }

    fetch() {
        const request = new XMLHttpRequest();
        request.open(this.method, this.URL + "?date=" + this.date, true);
        request.onload = () => {
            this.HTML = request.responseText;

            // Verify HTML was fetched successfully
            if (!this.HTML || this.HTML.length < 100) {
                console.error('[HSLO] Failed to fetch HTML - empty or invalid response');
                this.showError('Invalid HTML response from server');
                return;
            }

            console.log('[HSLO] HTML fetched successfully, length:', this.HTML.length);
            this.write();
        };
        request.onerror = () => {
            document.open();
            document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>HSLO Endymion - Error</title>
                </head>
                <body style="margin: 0; padding: 0;">
                    <div style='width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center; background: #111; color: #fff; font-family: "Ubuntu", sans-serif; flex-direction: column;'>
                        <h1 style='font-size: 48px; color: #f44336; margin: 0;'>⚠ Connection Error</h1>
                        <p style='font-size: 24px; color: #888; margin-top: 20px;'>Failed to fetch HSLO Endymion files</p>
                        <p style='font-size: 18px; color: #666; margin-top: 10px;'>Please check your internet connection or try again later</p>
                        <button onclick='location.reload()' style='margin-top: 30px; padding: 15px 40px; font-size: 18px; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 5px; cursor: pointer; transition: transform 0.2s;' onmouseover='this.style.transform="scale(1.05)"' onmouseout='this.style.transform="scale(1)"'>
                            🔄 Retry
                        </button>
                    </div>
                </body>
                </html>
            `);
            document.close();
        }
        request.send();
    }

    showError(message) {
        document.open();
        document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>HSLO Endymion - Error</title>
            </head>
            <body style="margin: 0; padding: 0;">
                <div style='width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center; background: #111; color: #fff; font-family: "Ubuntu", sans-serif; flex-direction: column;'>
                    <h1 style='font-size: 48px; color: #f44336; margin: 0;'>⚠ Error</h1>
                    <p style='font-size: 24px; color: #888; margin-top: 20px;'>${message}</p>
                    <p style='font-size: 18px; color: #666; margin-top: 10px;'>Check console for details</p>
                    <button onclick='location.reload()' style='margin-top: 30px; padding: 15px 40px; font-size: 18px; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 5px; cursor: pointer; transition: transform 0.2s;' onmouseover='this.style.transform="scale(1.05)"' onmouseout='this.style.transform="scale(1)"'>
                        🔄 Retry
                    </button>
                </div>
            </body>
            </html>
        `);
        document.close();
    }

    write() {
        // Stop blocking scripts - allow HSLO scripts to load
        if (scriptBlocker) {
            scriptBlocker.disconnect();
            console.log('[HSLO] Script blocker disabled - loading HSLO Endymion');
        }

        document.open();
        document.write(this.HTML);
        document.close();
    }
}
HSLO.load();
