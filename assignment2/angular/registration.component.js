// Registration Component Logic
class RegistrationComponent {
    constructor() {
        this.form = document.getElementById('registrationForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;

        // Validation
        if (!this.validateEmail(email)) {
            alert('Please enter a valid email address');
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

        // Save user data
        const userData = {
            name: name,
            email: email,
            phone: document.getElementById('regPhone').value,
            address: document.getElementById('regAddress').value,
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('registeredUser', JSON.stringify(userData));
        
        // Show success page
        showSuccessPage(userData);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Initialize registration component
if (document.getElementById('registrationForm')) {
    new RegistrationComponent();
}
