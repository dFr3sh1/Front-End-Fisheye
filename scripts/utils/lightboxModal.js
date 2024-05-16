import MediaTemplate from "../templates/medias.js";
import { getMediasByPhotographerId } from '../utils/getter.js';

export default async function openLightbox(photographerId, title) {
    // Fetch the medias array using photographerId
    const medias = await getMediasByPhotographerId(photographerId);
    
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');
    
    // Clear existing content
    //lightboxContent.innerHTML = '';

    // Find the index of the media with the matching title
    const index = medias.findIndex(media => media.title === title);
    if (index === -1) {
        // Media not found, handle error or return
        return;
    }

    // Initially hide lightbox
    lightbox.style.display = 'none';

    // Call the element in the DOM
    const image = document.getElementById('lightbox-image');
    image.src = `/assets/photographers/${photographerId}/${medias[index].image}`;
    image.alt = medias[index].title;
    image.setAttribute('role', 'image');
    image.setAttribute('aria-label', 'image closeup view');
    image.setAttribute('aria-describedby', 'image-description');
    console.log(image)

    // Create title element
    const titleMedia = document.getElementById('image-description');
    titleMedia.textContent = medias[index].title;
    //titleMedia.id = 'image-description';
    titleMedia.setAttribute('role', 'text');
    titleMedia.style.position = 'absolute';

    // Show lightbox
    lightbox.style.display = 'flex';
    lightbox.style.height = '83vh';
    const lightboxImageContainer = document.getElementById('lightbox-image-container');
    lightboxImageContainer.style.display = 'flex';
    lightboxImageContainer.style.height = '83vh';
    const imageDescriptionDiv = document.getElementById('image-description-div');
    
    //imageDescriptionDiv.classList.add('image-description-div');

    imageDescriptionDiv.appendChild(titleMedia);
    lightboxImageContainer.appendChild(imageDescriptionDiv);
    

    // Show/hide previous and next buttons
    const closeBtn = document.getElementById('close-button');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    console.log(prevButton)
    console.log(nextButton)
    closeBtn.style.display = index === 0 ? 'none' : 'flex';
    prevButton.style.display = index === 0 ? 'none' : 'flex';
    nextButton.style.display = index === medias.length - 1 ? 'none' : 'flex';
    

    // Close lightbox when clicking outside the content or pressing Escape key
    lightbox.onclick = function(event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    };

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeLightbox();
        }
    });

    // Handle keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft' && index > 0) {
            openLightbox(photographerId, medias[index - 1].title); // Update with previous title
        } else if (event.key === 'ArrowRight' && index < medias.length - 1) {
            openLightbox(photographerId, medias[index + 1].title); // Update with next title
        }
    });

    // Handle click events for previous and next buttons
    prevButton.onclick = function() {
        if (index > 0) {
            openLightbox(photographerId, medias[index - 1].title); // Update with previous title
        }
    };
    nextButton.onclick = function() {
        if (index < medias.length - 1) {
            openLightbox(photographerId, medias[index + 1].title); // Update with next title
        }
    };
}

// Function to close the lightbox
export function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    const mediaGallery = document.getElementById('medias-gallery');
    mediaGallery.classList.remove('.opacity')
}