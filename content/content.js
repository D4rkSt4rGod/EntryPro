// content.js - SPA Compatible Version with Settings Support
console.log('[Entry Pro] SPA-compatible content.js loaded');

class EntryProSPAHandler {
    constructor() {
        this.injected = false;
        this.currentUrl = window.location.href;
        this.settings = null; // 설정 저장
        this.workspaceSelectors = [
            '#entry-playground',
            '.entryWorkspace',
            '.entry-playground',
            '[class*="entryWorkspace"]',
            '[id*="entryCanvas"]'
        ];
        this.init();
    }

    async init() {
        console.log('[Entry Pro] Initializing SPA handler');
        
        // Load settings first
        await this.loadSettings();
        
        // Initial check (only if autoInject is enabled)
        if (this.settings.autoInject) {
            this.checkAndInject();
        } else {
            console.log('[Entry Pro] Auto-inject is disabled in settings');
        }
        
        // Set up SPA detection methods
        this.setupHistoryListeners();
        this.setupMutationObserver();
        this.setupUrlChangeDetector();
        
        // Also listen for Entry-specific events if available
        this.setupEntryEventListeners();
        
        // Listen for settings changes
        this.setupSettingsListener();
    }

    async loadSettings() {
        return new Promise((resolve) => {
            chrome.storage.sync.get(['settings'], (result) => {
                this.settings = result.settings || {
                    autoInject: true,
                    notifications: false,
                    debugMode: false
                };
                console.log('[Entry Pro] Settings loaded:', this.settings);
                resolve();
            });
        });
    }

    setupSettingsListener() {
        // Listen for settings changes
        chrome.storage.onChanged.addListener((changes, namespace) => {
            if (changes.settings) {
                const oldSettings = this.settings;
                this.settings = changes.settings.newValue;
                
                console.log('[Entry Pro] Settings changed:', this.settings);
                
                // If autoInject was turned on and we're on a workspace page
                if (!oldSettings.autoInject && this.settings.autoInject && this.isEntryWorkspace()) {
                    console.log('[Entry Pro] Auto-inject enabled, injecting now...');
                    this.checkAndInject();
                }
            }
        });
    }

    isEntryWorkspace() {
        const url = window.location.href;
        const path = window.location.pathname;
        
        // Multiple ways to detect workspace
        if (path.startsWith('/ws/') && window.location.search.includes('mode=block')) {
            return true;
        }
        
        // Check for workspace elements
        for (const selector of this.workspaceSelectors) {
            if (document.querySelector(selector)) {
                return true;
            }
        }
        
        // Check for Entry workspace object
        if (window.Entry && window.Entry.playground) {
            return true;
        }
        
        return false;
    }

    waitForEntryRender(callback) {
        console.log('[Entry Pro] Waiting for Entry to fully render...');
        
        let attempts = 0;
        const maxAttempts = 50;
        
        const checkEntryReady = () => {
            attempts++;
            
            const entryReady = window.Entry && window.Entry.playground && window.Entry.playground.blockMenu;
            const hasEntryElements = document.querySelector('#entry-playground') || 
                                     document.querySelector('.entry-playground') ||
                                     document.querySelector('[class*="entryWorkspace"]');
            
            if (entryReady || hasEntryElements) {
                console.log(`[Entry Pro] Workspace ready detected (attempt ${attempts}/${maxAttempts})`);
                setTimeout(callback, 300);
                return;
            }
            
            if (attempts >= maxAttempts) {
                console.log(`[Entry Pro] Entry render timeout after ${maxAttempts} attempts`);
                callback();
                return;
            }
            
            setTimeout(checkEntryReady, 200);
        };
        
        setTimeout(checkEntryReady, 500);
    }

    injectEntryPro() {
        if (this.injected) {
            console.log('[Entry Pro] Already injected, skipping');
            return;
        }
        
        console.log('[Entry Pro] Injecting Entry Pro extension...');
        
        // Remove any existing injection script
        const oldScript = document.getElementById('entry-pro-inject-script');
        if (oldScript) oldScript.remove();
        
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('inject/inject.js');
        script.id = 'entry-pro-inject-script';
        
        script.onload = () => {
            console.log('[Entry Pro] inject.js loaded successfully');
            this.injected = true;
            this.setupInjectionCleanup();
            
            // Show notification if enabled
            if (this.settings.notifications) {
                this.showNotification('Entry Pro injected successfully!');
            }
        };
        
        script.onerror = (e) => {
            console.error('[Entry Pro] Failed to load inject.js:', e);
            this.injected = false;
        };
        
        (document.head || document.documentElement).appendChild(script);
    }

    showNotification(message) {
        // Simple notification (you can make this prettier)
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
            z-index: 10000;
            font-family: 'Segoe UI', sans-serif;
            font-size: 14px;
            font-weight: 600;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transition = 'opacity 0.3s';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    async checkAndInject() {
        // Reload settings to ensure we have the latest
        await this.loadSettings();
        
        // Check if auto-inject is enabled
        if (!this.settings.autoInject) {
            console.log('[Entry Pro] Auto-inject is disabled, skipping injection');
            return;
        }
        
        if (this.isEntryWorkspace()) {
            console.log('[Entry Pro] Workspace detected, waiting for render...');
            this.waitForEntryRender(() => {
                this.injectEntryPro();
            });
        } else {
            console.log('[Entry Pro] Not a workspace page');
            this.injected = false;
        }
    }

    setupHistoryListeners() {
        // Override history methods to detect SPA navigation
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        
        history.pushState = function(...args) {
            originalPushState.apply(this, args);
            window.dispatchEvent(new Event('pushstate'));
            window.dispatchEvent(new Event('locationchange'));
        };
        
        history.replaceState = function(...args) {
            originalReplaceState.apply(this, args);
            window.dispatchEvent(new Event('replacestate'));
            window.dispatchEvent(new Event('locationchange'));
        };
        
        // Listen to popstate (back/forward navigation)
        window.addEventListener('popstate', () => {
            window.dispatchEvent(new Event('locationchange'));
        });
        
        // Listen to our custom locationchange event
        window.addEventListener('locationchange', () => {
            console.log('[Entry Pro] SPA navigation detected');
            setTimeout(() => this.handleSPANavigation(), 500);
        });
    }

    setupMutationObserver() {
        // Watch for DOM changes that might indicate SPA navigation
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    // Check if workspace elements were added
                    for (const node of mutation.addedNodes) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            for (const selector of this.workspaceSelectors) {
                                if (node.matches && node.matches(selector) || 
                                    node.querySelector && node.querySelector(selector)) {
                                    console.log('[Entry Pro] Workspace elements added via SPA');
                                    setTimeout(() => this.handleSPANavigation(), 1000);
                                    return;
                                }
                            }
                        }
                    }
                }
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        this.mutationObserver = observer;
    }

    setupUrlChangeDetector() {
        // Periodic URL check as fallback
        setInterval(() => {
            if (window.location.href !== this.currentUrl) {
                console.log('[Entry Pro] URL changed:', window.location.href);
                this.currentUrl = window.location.href;
                this.handleSPANavigation();
            }
        }, 1000);
    }

    setupEntryEventListeners() {
        // Try to listen to Entry's internal events if available
        if (window.Entry && Entry.addEventListener) {
            Entry.addEventListener('workspaceLoad', () => {
                console.log('[Entry Pro] Entry workspaceLoad event');
                setTimeout(() => this.checkAndInject(), 1000);
            });
            
            Entry.addEventListener('pageChanged', () => {
                console.log('[Entry Pro] Entry pageChanged event');
                setTimeout(() => this.checkAndInject(), 1000);
            });
        }
        
        // Also listen for window message events (Entry might use postMessage)
        window.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'entry-page-change') {
                console.log('[Entry Pro] Received Entry page change message');
                setTimeout(() => this.checkAndInject(), 1000);
            }
        });
    }

    async handleSPANavigation() {
        console.log('[Entry Pro] Handling SPA navigation...');
        
        // Reset injection flag
        this.injected = false;
        
        // Wait a bit for the new page to load, then check
        setTimeout(() => {
            this.checkAndInject();
        }, 1000);
    }

    setupInjectionCleanup() {
        // Clean up when leaving the page
        window.addEventListener('beforeunload', () => {
            this.injected = false;
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('[Entry Pro] DOMContentLoaded - Starting SPA handler');
        window.entryProHandler = new EntryProSPAHandler();
    });
} else {
    console.log('[Entry Pro] DOM already loaded - Starting SPA handler');
    window.entryProHandler = new EntryProSPAHandler();
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('[Entry Pro] Received message:', request);
    
    if (request.action === 'manualInject') {
        // Manual injection
        if (window.entryProHandler) {
            if (!window.entryProHandler.injected) {
                window.entryProHandler.waitForEntryRender(() => {
                    window.entryProHandler.injectEntryPro();
                });
            }
        } else {
            // Handler not initialized, create it
            window.entryProHandler = new EntryProSPAHandler();
            setTimeout(() => {
                window.entryProHandler.waitForEntryRender(() => {
                    window.entryProHandler.injectEntryPro();
                });
            }, 500);
        }
    }
    
    if (request.action === 'removeScript') {
        // Remove injection
        const script = document.getElementById('entry-pro-inject-script');
        if (script) {
            script.remove();
            if (window.entryProHandler) {
                window.entryProHandler.injected = false;
            }
        }
    }
    
    if (request.action === 'checkStatus') {
        // Check injection status - just log it
        const isInjected = window.entryProHandler?.injected || false;
        console.log('[Entry Pro] Status check - Injected:', isInjected);
    }
});

// Global helper for debugging
window.debugEntryProSPA = function() {
    console.log('=== Entry Pro SPA Debug Info ===');
    console.log('Current URL:', window.location.href);
    console.log('Is workspace:', window.entryProHandler?.isEntryWorkspace());
    console.log('Injected:', window.entryProHandler?.injected);
    console.log('Settings:', window.entryProHandler?.settings);
    console.log('Entry object:', !!window.Entry);
    console.log('=== End Debug Info ===');
};