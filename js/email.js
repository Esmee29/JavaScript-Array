// Email Validation and Dropdown
const addEmailBtn = document.getElementById('add-email-btn');
const emailInput = document.getElementById('email-textfield');
const emailValidationMsg = document.getElementById('email-validation-msg');

addEmailBtn.addEventListener('click', function() {
    // Remove any existing message classes
    emailValidationMsg.classList.remove('error-message', 'success-message');
    emailValidationMsg.textContent = '';

    // Validate email (format: xxx@xxx.xxx)
    const email = emailInput.value;
    const emailRegex = /^[^\s@]+([-][^\s@]+)?@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        emailValidationMsg.textContent = 'Please enter a valid email address';
        emailValidationMsg.classList.add('error-message');
        emailValidationMsg.style.display = 'block'; // Display the error message
    } else {
        emailValidationMsg.textContent = 'Email added successfully: ' + email;
        emailValidationMsg.classList.add('success-message');
        emailValidationMsg.style.display = 'block'; // Display the success message

        const selectList = document.getElementById('email-address-dropdown');
        const option = document.createElement('option');
        option.value = email;
        option.text = email;

        selectList.appendChild(option);

        // Clear the input field after successful addition
        emailInput.value = '';
    }
});