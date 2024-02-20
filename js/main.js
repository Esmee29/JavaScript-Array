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
    })
    .catch(error => {
      console.log(error);
    });
}
// Display a random image when the page loads
displayRandomImage();

// Change the image when the button is clicked
document.getElementById('generate-image').addEventListener('click', displayRandomImage);