// Success Component Logic
class SuccessComponent {
    constructor() {
        this.init();
    }

    init() {
        this.displayUserInfo();
    }

    displayUserInfo() {
        // Get data from localStorage (could be from registration or signup)
        const registeredUser = localStorage.getItem('registeredUser');
        const signupUser = localStorage.getItem('signupUser');
        
        const userData = registeredUser ? JSON.parse(registeredUser) : JSON.parse(signupUser);

        if (userData) {
            document.getElementById('successName').textContent = `Name: ${userData.name}`;
            document.getElementById('successEmail').textContent = `Email: ${userData.email}`;
        }
    }
}

// Initialize success component
if (document.querySelector('.success-wrapper')) {
    new SuccessComponent();
}
