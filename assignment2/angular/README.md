# Angular Assignment - Registration & Signup Forms

## Project Structure

This is a simple Angular-style application with Registration Form, Signup Form, and Success Page components.

### Files:

- **index.html** - Main entry point of the application
- **app.js** - Main application file with routing logic
- **style.css** - Global styles for the application

### Components:

#### 1. Registration Component
- **registration.component.html** - Registration form template
- **registration.component.css** - Registration form styles
- **registration.component.js** - Registration form logic

**Features:**
- Full Name input
- Email input
- Phone Number input
- Address textarea
- Password and Confirm Password fields
- Form validation
- Data storage in localStorage

#### 2. Signup Component
- **signup.component.html** - Signup form template
- **signup.component.css** - Signup form styles
- **signup.component.js** - Signup form logic

**Features:**
- Full Name input
- Email input
- Username input
- Password and Confirm Password fields
- Terms and Conditions checkbox
- Form validation
- Data storage in localStorage

#### 3. Success Component
- **success.component.html** - Success page template
- **success.component.css** - Success page styles
- **success.component.js** - Success page logic

**Features:**
- Success message with animated icon
- Display of registered user information
- Next steps guidance
- Back to Home button

## How to Use

1. Open `index.html` in a web browser
2. You will see the Registration form by default
3. Fill in the required fields and click "Register"
4. Form validation will check:
   - Valid email format
   - Password match
   - Minimum password length (6 characters)
   - Required fields
5. Upon successful registration, you'll see the Success page
6. Click "Back to Home" to return to the registration form
7. Use "Signup here" link to switch to the Signup form
8. Similar validation applies to the Signup form

## Form Validation Rules

### Registration Form:
- All fields are required
- Email must be in valid format
- Password must match confirmation
- Password must be at least 6 characters

### Signup Form:
- All fields are required
- Email must be in valid format
- Username must be at least 3 characters
- Password must match confirmation
- Password must be at least 6 characters
- Must agree to terms and conditions

## Data Storage

User data is stored in browser's localStorage and can be accessed as:
- `localStorage.getItem('registeredUser')` - for registration
- `localStorage.getItem('signupUser')` - for signup

## Styling

- Modern gradient backgrounds
- Responsive design
- Mobile-friendly layout
- Smooth animations and transitions
- Color schemes:
  - Registration: Purple gradient (#667eea to #764ba2)
  - Signup: Pink gradient (#f093fb to #f5576c)
  - Success: Green gradient (#84fab0 to #8fd3f4)

## Browser Compatibility

Works on all modern browsers (Chrome, Firefox, Safari, Edge) that support:
- ES6 JavaScript
- localStorage API
- Fetch API
- CSS Flexbox

## Author

Created as an Angular-style assignment demonstrating modern web development practices.
