// Function to fetch and display a random image
function displayRandomImage() {
  fetch('https://picsum.photos/600/300')
    .then(response => response.blob())
    .then(images => {
      let imageLink = URL.createObjectURL(images);
      let container = document.getElementById('image-container');

      let oldImage = document.getElementById('display-image');
      if (oldImage) {
        oldImage.remove();
      }
      let img = document.createElement('img');
      img.id = 'display-image';
      img.src = imageLink;
      img.alt = ' ';
      img.className = 'responsive-image'; 
      container.appendChild(img);

      document.getElementById('add-image-btn').disabled = false;

      // Logging selected email address and image link in the console
      const selectList = document.getElementById('email-address-dropdown');
      const selectedOption = selectList.options[selectList.selectedIndex];
      const selectedEmail = selectedOption.value;
      if (selectedEmail !== 'Please select an email address.') {
        console.log('Selected Email:', selectedEmail);
        console.log('Image Link:', imageLink);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

// Display a random image when the page loads
displayRandomImage();

// Change the image when the button is clicked
document.getElementById('generate-image').addEventListener('click', displayRandomImage);

// Selecting an email address and associating an image with it
document.getElementById('add-image-btn').addEventListener('click', function() {
  const selectList = document.getElementById('email-address-dropdown');
  const selectedOption = selectList.options[selectList.selectedIndex];
  const assignedImageText = document.getElementById('assigned-image-text'); // Select the element to display error message

  if (!selectedOption || selectedOption.value === 'Please select an email address.') {
    assignedImageText.textContent = 'Please choose an email address before adding the image.'; // Set error message
    assignedImageText.classList.add('no-email'); // Add class 'no-email'
    return;
  } else {
    assignedImageText.textContent = `Images assigned to email: ${selectedOption.value}`; // Set message with selected email
    assignedImageText.classList.remove('no-email'); // Remove class 'no-email'
  }

  const displayedImage = document.getElementById('display-image');
  const imageUrl = displayedImage.src;

  const selectedEmail = selectedOption.value;
  
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('email-image');

  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  imageElement.classList.add('gallery-image');

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('image-delete');

  deleteButton.addEventListener('click', function() {
    imageContainer.remove();
    deleteImageCombined(imageUrl, selectedEmail);
    document.getElementById('add-image-btn').disabled = false; // Enable the button after image deletion
  });

  imageContainer.appendChild(imageElement);
  imageContainer.appendChild(deleteButton);

  // Adding the image container to the email container
  const emailContainer = document.getElementById('images-selected');
  emailContainer.appendChild(imageContainer);

  if (!emailImageMap.has(selectedEmail)) {
    emailImageMap.set(selectedEmail, []);
  }
  emailImageMap.get(selectedEmail).push(imageUrl);

  this.disabled = true;

  // Disable the button after image addition
  document.getElementById('add-image-btn').disabled = true;
});


// Remove no-email class when an email is selected from the dropdown
document.getElementById('email-address-dropdown').addEventListener('change', function() {
  const assignedImageText = document.getElementById('assigned-image-text');
  assignedImageText.classList.remove('no-email');
});
// Assigning images to multiple email addresses
let emailImageMap = new Map();
document.getElementById('email-address-dropdown').addEventListener('change', function() {
  const selectedOption = this.options[this.selectedIndex];
  const currentEmailText = document.getElementById('current-email-text');
  currentEmailText.textContent = selectedOption.value;

  const assignedImageText = document.getElementById('assigned-image-text');
  assignedImageText.textContent = `Assigned to: ${selectedOption.value}`;

  const addImageButton = document.getElementById('add-image-btn');
  addImageButton.disabled = false;

  const emailContainer = document.getElementById('images-selected');
  while (emailContainer.firstChild) {
    emailContainer.removeChild(emailContainer.firstChild);
  }

  const images = emailImageMap.get(selectedOption.value) || [];
  images.forEach(imageUrl => {
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.classList.add('gallery-image');
    
    // Deleting an image from the gallery
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('email-image');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('image-delete');

    deleteButton.addEventListener('click', function() {
      imageContainer.remove();
      deleteImageCombined(imageUrl, selectedOption.value);
    });

    imageContainer.appendChild(imageElement);
    imageContainer.appendChild(deleteButton);
    
    emailContainer.appendChild(imageContainer);
  });

  
});

// Combined function to delete an image
function deleteImageCombined(imageUrl, email) {
  const imageContainers = document.querySelectorAll('.email-image');
  imageContainers.forEach(container => {
    const image = container.querySelector('.gallery-image');
    if (image && image.src === imageUrl) {
      container.remove();
    }
  });

  const imageUrls = emailImageMap.get(email) || [];
  const index = imageUrls.indexOf(imageUrl);
  if (index !== -1) {
    emailImageMap.get(email).splice(index, 1);
    console.log(`Removed image URL: ${imageUrl}`);
  }

  // Check if there are no more images associated with this email
  if ((emailImageMap.get(email) || []).length === 0) {
    console.log(`No more images associated with email ${email}. Enabling add-image-btn.`);
    document.getElementById('add-image-btn').disabled = false;
  }
}
