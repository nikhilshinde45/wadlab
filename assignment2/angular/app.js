// Main Application Logic - Simple Routing

let currentPage = 'registration';

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    showPage(currentPage);
});

// Load and display a page
function showPage(pageName) {
    const app = document.getElementById('app');
    currentPage = pageName;

    // Load registration page
    if (pageName === 'registration') {
        loadRegistrationPage();
    } 
    // Load signup page
    else if (pageName === 'signup') {
        loadSignupPage();
    } 
    // Load success page
    else if (pageName === 'success') {
        loadSuccessPage();
    }
}

// Load Registration Page
function loadRegistrationPage() {
    const app = document.getElementById('app');
    
    fetch('registration.component.html')
        .then(response => response.text())
        .then(html => {
            app.innerHTML = `<div class="registration-form">${html}</div>`;
            
            // Load styles
            loadCSS('registration.component.css');
            
            // Load scripts
            loadScript('registration.component.js');
        })
        .catch(error => console.error('Error loading registration:', error));
}

// Load Signup Page
function loadSignupPage() {
    const app = document.getElementById('app');
    
    fetch('signup.component.html')
        .then(response => response.text())
        .then(html => {
            app.innerHTML = `<div class="signup-form">${html}</div>`;
            
            // Load styles
            loadCSS('signup.component.css');
            
            // Load scripts
            loadScript('signup.component.js');
        })
        .catch(error => console.error('Error loading signup:', error));
}

// Load Success Page
function loadSuccessPage(userData = null) {
    const app = document.getElementById('app');
    
    fetch('success.component.html')
        .then(response => response.text())
        .then(html => {
            app.innerHTML = `<div class="success-page">${html}</div>`;
            
            // Load styles
            loadCSS('success.component.css');
            
            // Load scripts
            loadScript('success.component.js');
        })
        .catch(error => console.error('Error loading success:', error));
}

// Show success page
function showSuccessPage(userData) {
    currentPage = 'success';
    loadSuccessPage(userData);
}

// Switch to registration page
function switchToRegistration() {
    showPage('registration');
}

// Switch to signup page
function switchToSignup() {
    showPage('signup');
}

// Go back to registration page
function goBack() {
    showPage('registration');
}

// Utility function to load CSS dynamically
function loadCSS(href) {
    // Remove existing stylesheets
    const existingStyles = document.querySelectorAll('link[rel="stylesheet"]');
    existingStyles.forEach(style => {
        if (style.href.includes('registration.component.css') || 
            style.href.includes('signup.component.css') || 
            style.href.includes('success.component.css')) {
            style.remove();
        }
    });

    // Add new stylesheet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

// Utility function to load scripts dynamically
function loadScript(src) {
    // Remove existing component scripts
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
        if (script.src.includes('registration.component.js') || 
            script.src.includes('signup.component.js') || 
            script.src.includes('success.component.js')) {
            script.remove();
        }
    });

    // Add new script
    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
}
