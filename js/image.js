// Function to fetch and display a random image
function displayRandomImage() {
  fetch('https://picsum.photos/600/300')
    .then(response => response.blob())
    .then(images => {
      // Create URL for the image
      let imageLink = URL.createObjectURL(images);

      // Get the image container
      let container = document.getElementById('image-container');

      // Remove existing image if any
      let oldImage = document.getElementById('display-image');
      if (oldImage) {
        oldImage.remove();
      }
      // Create new image element
      let img = document.createElement('img');
      img.id = 'display-image';
      img.src = imageLink;
      img.alt = ' ';
      img.className = 'responsive-image'; 
      container.appendChild(img);

      // Re-enable the "Add Current Image" button
      document.getElementById('add-image-btn').disabled = false;
    })
    .catch(error => {
      console.log(error);
    });
}

// Display a random image when the page loads
displayRandomImage();

// Get the select list element
const selectList = document.getElementById('email-address-dropdown');

// Add event listener to the select element
selectList.addEventListener('change', function() {
  // Get the selected option
  const selectedOption = selectList.options[selectList.selectedIndex];
  
  // Change the current email text to the selected email address
  const currentEmailText = document.getElementById('current-email-text');
  currentEmailText.textContent = selectedOption.value;

  // Enable the "Add Current Image" button
  document.getElementById('add-image-btn').disabled = false;
});

// Add image to email
document.getElementById('add-image-btn').addEventListener('click', function() {
  // Check if an email address is selected
  const selectedOption = selectList.options[selectList.selectedIndex];
  if (!selectedOption || selectedOption.value === 'Please select an email address.') {
    alert('Please select an email address before adding the image.');
    return;
  }

  // Get the image source
  const displayedImage = document.getElementById('display-image');
  const imageUrl = displayedImage.src;

  // Get the selected email address
  const selectedEmail = selectedOption.value;

  // Create a new image element
  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;

  // Get the email container
  const emailContainer = document.getElementById('images-selected');

  // Append the image to the email container
  emailContainer.appendChild(imageElement);

  // Optionally, you can also associate the image with the selected email address in some data structure or database

  // Disable the "Add Current Image" button after adding the image
  this.disabled = true;
});
