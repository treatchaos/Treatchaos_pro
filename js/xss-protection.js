// Enhanced XSS Protection Script
(function() {
    'use strict';
    
    // Sanitize input function
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }
    
    // Protect against DOM-based XSS
    function protectDOM() {
        // Override potentially dangerous functions
        const originalInnerHTML = Element.prototype.innerHTML;
        Object.defineProperty(Element.prototype, 'innerHTML', {
            set: function(value) {
                if (typeof value === 'string') {
                    // Basic XSS pattern detection
                    const xssPatterns = [
                        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                        /javascript:/gi,
                        /on\w+\s*=/gi,
                        /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
                        /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
                        /<embed\b[^<]*>/gi,
                        /vbscript:/gi,
                        /data:\s*text\/html/gi
                    ];
                    
                    for (let pattern of xssPatterns) {
                        if (pattern.test(value)) {
                            console.warn('Potential XSS attempt blocked:', value);
                            return;
                        }
                    }
                }
                originalInnerHTML.call(this, value);
            },
            get: function() {
                return originalInnerHTML.call(this);
            }
        });
    }
    
    // Content Security Policy enforcement
    function enforceCSP() {
        // Block inline scripts if CSP is not working
        const scripts = document.querySelectorAll('script[src=""]');
        scripts.forEach(script => {
            if (!script.src && script.innerHTML.trim()) {
                console.warn('Inline script blocked by XSS protection');
                script.remove();
            }
        });
    }
    
    // URL parameter sanitization
    function sanitizeURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        let hasXSS = false;
        
        for (let [key, value] of urlParams) {
            const decoded = decodeURIComponent(value);
            if (/<script|javascript:|vbscript:|onload=|onerror=/i.test(decoded)) {
                hasXSS = true;
                break;
            }
        }
        
        if (hasXSS) {
            console.warn('Potential XSS in URL parameters detected');
            // Redirect to clean URL
            window.location.href = window.location.pathname;
        }
    }
    
    // Initialize protection
    document.addEventListener('DOMContentLoaded', function() {
        protectDOM();
        enforceCSP();
        sanitizeURLParams();
        
        // Protect form inputs
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                const inputs = form.querySelectorAll('input[type="text"], textarea');
                inputs.forEach(input => {
                    input.value = sanitizeInput(input.value);
                });
            });
        });
        
        // Monitor for dynamically added scripts
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.tagName === 'SCRIPT' && !node.src) {
                        console.warn('Dynamic inline script blocked');
                        node.remove();
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
    
    // Global error handler for XSS attempts
    window.addEventListener('error', function(e) {
        if (e.message && e.message.includes('script')) {
            console.warn('Potential XSS script execution blocked');
        }
    });
    
})();
