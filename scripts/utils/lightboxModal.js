

export async function openLightbox(imageSrc, title) {
    const lightbox = document.getElementById('lightbox');
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    //To create an image element for the lightbox
    const lightboxImage = document.createElement('img');
    lightboxImage.src = imageSrc;
    lightboxImage.alt = title; 

    //To create a button to close the lightbox
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.src = `./assets/icons/close-lightbox-btn.png`
    closeButton.setAttribute('aria-label', 'Fermer');
    closeButton.addEventListener('click', closeLightbox);

    imageContainer.appendChild(lightboxImage);
    imageContainer.appendChild(closeButton);

    //To clear any existing element in lightbox element and append the imageContainer to the lightbox
    lightbox.innerHTML = '';
    lightbox.appendChild(imageContainer);

    //To show the ligtbox
    lightbox.style.display = 'flex';
}

export async function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

export default openLightbox