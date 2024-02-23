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

  if (!selectedOption || selectedOption.value === 'Please select an email address.') {
    alert('Please choose an email address before adding the image.');
    return;
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

    const imageUrls = emailImageMap.get(selectedEmail) || [];
    const index = imageUrls.indexOf(imageUrl);
    if (index !== -1) {
      emailImageMap.get(selectedEmail).splice(index, 1);

      console.log(`Removed image URL: ${imageUrl}`);
    }
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

      const index = emailImageMap.get(selectedOption.value).indexOf(imageUrl);
      if (index !== -1) {
        emailImageMap.get(selectedOption.value).splice(index, 1);
        console.log(`Removed image URL: ${imageUrl}`);
      }
    });

    imageContainer.appendChild(imageElement);
    imageContainer.appendChild(deleteButton);
    
    emailContainer.appendChild(imageContainer);
  });

  document.getElementById('add-image-btn').addEventListener('click', function() {
     this.disabled = true;
  
     displayRandomImage();
   });
});

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
}
