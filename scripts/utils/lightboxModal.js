import MediaTemplate from "../templates/medias.js";
import { getMediasByPhotographerId } from '../utils/getter.js';

let currentIndex = -1;
let medias = [];  // Declare medias globally to use in event listeners

export default async function openLightbox(photographerId, title) {
    // Fetch the medias array using photographerId
    if (!medias.length) {
        medias = await getMediasByPhotographerId(photographerId);
    }

    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');

    // Clear existing content
    lightboxContent.innerHTML = '';

    // Find the index of the media with the matching title
    const index = medias.findIndex(media => media.title === title);
    if (index === -1) {
        // Media not found, handle error or return
        return;
    }

    currentIndex = index; // Set the current index

    // Verify if media is image or video to create the right HTML element
    let mediaElement;
    if (medias[index].image) {
        mediaElement = document.createElement('img');
        mediaElement.src = `/assets/photographers/${photographerId}/${medias[index].image}`;
        console.log(`Displaying image: ${mediaElement.src}`);
    } else if (medias[index].video) {
        mediaElement = document.createElement('video');
        mediaElement.src = `/assets/photographers/${photographerId}/${medias[index].video}`;
        mediaElement.controls = true;
        console.log(`Displaying video: ${mediaElement.src}`);
    } else {
        console.error('Media type not recognized');
        return;
    }
    mediaElement.alt = medias[index].title;
    mediaElement.setAttribute('role', 'media');
    mediaElement.setAttribute('aria-label', 'media closeup view');
    mediaElement.setAttribute('aria-describedby', 'image-description');
    mediaElement.classList.add('lightbox-media', 'shadow');
    console.log(mediaElement);

    // Create title element
    const titleMedia = document.createElement('h3');
    titleMedia.id = 'image-description';
    titleMedia.classList.add('lightbox-title');
    titleMedia.textContent = medias[index].title;
    titleMedia.setAttribute('role', 'text');
    console.log(titleMedia);

    // Show lightbox
    lightbox.style.display = 'flex';
    lightbox.style.height = '83vh';
    const lightboxImageContainer = document.createElement('div');
    lightboxImageContainer.id = 'lightbox-image-container';
    lightboxImageContainer.classList.add('lightbox-image-container');
    lightboxImageContainer.style.display = 'flex';
    lightboxImageContainer.style.height = '83vh';
    const imageDescriptionDiv = document.createElement('div');
    imageDescriptionDiv.id = 'image-description-div';
    imageDescriptionDiv.classList.add('image-description-div');

    // Show/hide close, previous, and next buttons
    const prevButton = document.createElement('button');
    prevButton.id = 'prev-button';
    prevButton.classList.add('lightbox-button', 'isDisplayed');
    const prevButtonImage = document.createElement('img');
    prevButtonImage.src = `./assets/icons/precedent-btn.png`;
    prevButton.appendChild(prevButtonImage);

    const nextButton = document.createElement('button');
    nextButton.id = 'next-button';
    nextButton.classList.add('lightbox-button', 'isDisplayed');
    const nextButtonImage = document.createElement('img');
    nextButtonImage.src = `./assets/icons/next-btn.png`;
    nextButton.appendChild(nextButtonImage);

    const closeBtn = document.createElement('button');
    closeBtn.id = 'close-button';
    closeBtn.classList.add('lightbox-button', 'isDisplayed');
    const closeButtonImage = document.createElement('img');
    closeButtonImage.src = `./assets/icons/close-lightbox-btn.png`;
    closeBtn.appendChild(closeButtonImage);

    console.log(prevButton);
    console.log(nextButton);
    console.log(closeBtn);

    prevButton.style.display = index === 0 ? 'none' : 'flex';
    nextButton.style.display = index === medias.length - 1 ? 'none' : 'flex';
    closeBtn.style.display = index === medias.length - 1 ? 'none' : 'flex';

    imageDescriptionDiv.appendChild(titleMedia);
    lightboxImageContainer.appendChild(mediaElement);
    lightboxImageContainer.appendChild(imageDescriptionDiv);
    lightboxContent.appendChild(lightboxImageContainer);
    lightboxContent.appendChild(prevButton);
    lightboxContent.appendChild(nextButton);
    lightboxContent.appendChild(closeBtn);

    // Close lightbox when clicking outside the content or pressing Escape key
    lightbox.onclick = function(event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    };

    // Handle click events for previous and next buttons
    prevButton.onclick = function() {
        if (currentIndex > 0) {
            openLightbox(photographerId, medias[currentIndex - 1].title); // Update with previous title
        }
    };
    nextButton.onclick = function() {
        if (currentIndex < medias.length - 1) {
            openLightbox(photographerId, medias[currentIndex + 1].title); // Update with next title
        }
    };

    // Ensure only one event listener for keyboard navigation
    document.removeEventListener('keydown', handleKeydown);
    document.addEventListener('keydown', handleKeydown);

    // Close lightbox when clicking on the close button
    closeBtn.onclick = function() {
        closeLightbox();
    };
}

// Keyboard navigation handler function
function handleKeydown(event) {
    const photographerId = sessionStorage.getItem('photographerId');
    if (event.key === 'ArrowLeft' && currentIndex > 0) {
        openLightbox(photographerId, medias[currentIndex - 1].title); // Update with previous title
    } else if (event.key === 'ArrowRight' && currentIndex < medias.length - 1) {
        openLightbox(photographerId, medias[currentIndex + 1].title); // Update with next title
    } else if (event.key === 'Escape') {
        closeLightbox();
    }
}

// Function to close the lightbox
export function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    const mediaGallery = document.getElementById('medias-gallery');
    mediaGallery.classList.remove('opacity');
    // Remove event listener when lightbox is closed
    document.removeEventListener('keydown', handleKeydown);
}

// Function to fetch and store medias array and photographerId
export async function initializeLightbox(photographerId) {
    medias = await getMediasByPhotographerId(photographerId);
    sessionStorage.setItem('medias', JSON.stringify(medias));
    sessionStorage.setItem('photographerId', photographerId);
}
