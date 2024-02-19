document.getElementById('generate-image').addEventListener('click', function() {
  fetch('https://picsum.photos/600/300')
    .then(response => response.blob())
    .then(images => {
      // Create URL for the image
      let outside = URL.createObjectURL(images);

      // Get the image container
      let container = document.getElementById('image-container');

      // Change the class of the container
      container.className = 'image';

      // Remove existing image if any
      let oldImage = document.getElementById('display-image');
      if (oldImage) {
        oldImage.remove();
      }

      // Create new image element
      let img = document.createElement('img');
      img.id = 'display-image';
      img.src = outside;
      img.alt = 'Random Image';
      img.className = 'responsive-image'; // Add this line

      // Append the image to the container
      container.appendChild(img);
    })
    .catch(e => {
      console.log(e);
    });
});