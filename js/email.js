// Email Validation and Dropdown
const addEmailBtn = document.getElementById('add-email-btn');

addEmailBtn.addEventListener('click', function() {
  const emailInput = document.getElementById('email-textfield');

   // Validate email (format: xxx@xxx.xxx)
   const email = emailInput.value;
   const emailRegex = /^[^\s@]+([-][^\s@]+)?@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return;
  }

  alert('Email added successfully');

  const selectList = document.getElementById('email-address-dropdown');
  const option = document.createElement('option');
  option.value = email;
  option.text = email;

  selectList.appendChild(option);

  emailInput.value = '';
});
