const form = document.getElementById("galleryForm");
const images = [];
let currentIndex = 0;

form.addEventListener("submit", function(event) {
  event.preventDefault();
  
  const imageUrl = event.target.elements["imageUrl"].value;
  const imageDescr = event.target.elements["imageDescr"].value;

  const newImg = document.createElement("img");
  const newImgDescr = document.createElement("p");
  const newImgBtn = document.createElement("button");
  
  newImg.src = imageUrl;
  newImgDescr.textContent = imageDescr;
  newImgBtn.textContent = "Delete";

  newImg.width = 400;
  newImg.height = 300;
  const imgContainer = document.createElement("div");


  images.push(newImg.src);

  function openLightbox(index) {
    currentIndex = index;
    const modal = document.getElementById('lightbox');
    const modalImg = document.getElementById("lightboxImg");

    modal.style.display = "block";
    modalImg.src = images[currentIndex];
  }

 
  newImg.addEventListener("click", function() {
    openLightbox(images.indexOf(newImg.src)); 
  });

 
  newImgBtn.addEventListener("click", function() {
    const indexToRemove = images.indexOf(newImg.src);
    imgContainer.remove();
    images.splice(indexToRemove, 1);

   
    if (currentIndex >= indexToRemove) {
      currentIndex = Math.max(0, currentIndex - 1);
    }
  });

  imgContainer.appendChild(newImg);
  imgContainer.appendChild(newImgDescr);
  imgContainer.appendChild(newImgBtn);

  const mainContainer = document.getElementById("img-container");
  mainContainer.appendChild(imgContainer);


  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", function() {
    document.getElementById("lightbox").style.display = "none";
  });

 
  document.querySelector(".next").addEventListener("click", function() {
    if (images.length > 0) {
      currentIndex = (currentIndex + 1) % images.length;
      openLightbox(currentIndex);
    }
  });


  document.querySelector(".prev").addEventListener("click", function() {
    if (images.length > 0) {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      openLightbox(currentIndex);
    }
  });
});


