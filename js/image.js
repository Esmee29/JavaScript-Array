// Function to fetch and display a random image
function displayRandomImage() {
  fetch('https://picsum.photos/600/300')
    .then(response => response.blob())
    .then(images => {
      let imageLink = URL.createObjectURL(images);
      let container = document.getElementById('image-container');

      // Remove existing image 
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
    })
    .catch(error => {
      console.log(error);
    });
}
// Display a random image when the page loads
displayRandomImage();
// Change the image when the button is clicked
document.getElementById('generate-image').addEventListener('click', displayRandomImage);

// Selecting an email address and assigning an image to it
const selectList = document.getElementById('email-address-dropdown');
selectList.addEventListener('change', function() {
  const selectedOption = selectList.options[selectList.selectedIndex];
  
  const currentEmailText = document.getElementById('current-email-text');
  currentEmailText.textContent = selectedOption.value;

  const addImageButton = document.getElementById('add-image-btn');
  addImageButton.disabled = false;
});

document.getElementById('add-image-btn').addEventListener('click', function() {
  const selectList = document.getElementById('email-address-dropdown');
  const selectedOption = selectList.options[selectList.selectedIndex];
  
  if (!selectedOption || selectedOption.value === 'Please select an email address.') {
    alert('Please select an email address before adding the image.');
    return;
  }
  
  const displayedImage = document.getElementById('display-image');
  const imageUrl = displayedImage.src;

  const selectedEmail = selectedOption.value;
  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  imageElement.classList.add('gallery-image'); //assigned image class

  const emailContainer = document.getElementById('images-selected');
  emailContainer.appendChild(imageElement);
  
  this.disabled = true;
});
