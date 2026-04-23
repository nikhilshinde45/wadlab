// Signup Component Logic
class SignupComponent {
    constructor() {
        this.form = document.getElementById('signupForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const username = document.getElementById('signupUsername').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        const agree = document.getElementById('signupAgree').checked;

        // Validation
        if (!this.validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (username.length < 3) {
            alert('Username must be at least 3 characters long');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

        if (!agree) {
            alert('Please agree to the terms and conditions');
            return;
        }

        // Save user data
        const userData = {
            name: name,
            email: email,
            username: username,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('signupUser', JSON.stringify(userData));
        
        // Show success page
        showSuccessPage(userData);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Initialize signup component
if (document.getElementById('signupForm')) {
    new SignupComponent();
}
