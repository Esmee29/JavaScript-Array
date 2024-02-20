// Email Validation and Dropdown
// Change the image when the button is clicked
document.getElementById('generate-image').addEventListener('click', displayRandomImage);

// Email button
const addEmailBtn = document.getElementById('add-email-btn');

// Add event listener to the button
addEmailBtn.addEventListener('click', function() {
  // Get the email input element
  const emailInput = document.getElementById('email-textfield');

   // Validate email (format: xxx@xxx.xxx)
   const email = emailInput.value;
   const emailRegex = /^[^\s@]+([-][^\s@]+)?@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return;
  }

  // If the email is valid, display success message
  alert('Email added successfully');

  // Get the select list element
  const selectList = document.getElementById('email-address-dropdown');

  // Create a new option element
  const option = document.createElement('option');
  option.value = email;
  option.text = email;

  // Add the new option to the select list
  selectList.appendChild(option);

  // Clear the email input field
  emailInput.value = '';
});