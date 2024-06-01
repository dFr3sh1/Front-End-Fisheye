// selectedPhotographer.js
import MediaTemplate from "../templates/medias.js";
import displayHeaderPh from "../templates/banner.js";
import { getPhotographerById, getMediasByPhotographerId } from "../utils/getter.js";
import { filterByPopularity, filterByDate, filterByTitle } from "../utils/mediaFilter.js";
import { initializeContactForm, closeModal } from "../utils/contactForm.js";
import lightbox from "../utils/lightboxModal.js";

async function main() {
    try {
        const searchPhotographe = window.location.search;
        const id = Number(searchPhotographe.split("=")[1]);
        const photographer = await getPhotographerById(id);

        displayHeaderPh(photographer);

        // Fetch the media for the selected photographer
        let medias = await getMediasByPhotographerId(id);
        console.log(medias);

        // Display medias
        displayMedias(medias);

        // Filter media based on the selected option in the dropdown
        const filterDropdown = document.getElementById('filter');
        filterDropdown.addEventListener('change', function () {
            const selectedOption = this.value;
            if (selectedOption === 'popularity') {
                medias = filterByPopularity(medias);
            } else if (selectedOption === 'date') {
                medias = filterByDate(medias, 'recent');
            } else if (selectedOption === 'title') {
                // For title filter, retrieve the keyword from the input field
                const keyword = document.getElementById('filter-title').value;
                // Determine sorting order (alphabetical)
                const order = 'asc'; // or 'desc' for descending order
                medias = filterByTitle(medias, order);
            }

            // Display filtered media
            displayMedias(medias);
        });

        // Filter media by popularity by default
        filterDropdown.value = 'popularity';
        medias = filterByPopularity(medias);
        displayMedias(medias);

        // Calculate and display global sum of likes and price
        const likePriceDiv = document.getElementById('like-price');
        const likesSumElement = document.createElement('p');
        likesSumElement.id = 'total-likes';
        const totalLikes = getTotalLikes(medias);
        const heartIcon = document.createElement('img');
        heartIcon.src = `assets/images/blackHeartFilled.png`;
        const phPrice = document.createElement('p');
        phPrice.textContent = `${photographer.price} €/jour`;

        updateLikesSum(likesSumElement, totalLikes);
        likePriceDiv.appendChild(likesSumElement);
        likePriceDiv.appendChild(heartIcon);
        likePriceDiv.appendChild(phPrice);

        initializeContactForm();

        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');
        const closeBtn = document.getElementById('close-button');

        prevButton.addEventListener('click', () => lightbox.previous(medias));
        nextButton.addEventListener('click', () => lightbox.next(medias));
        closeBtn.addEventListener('click', () => lightbox.close())

    } catch (error) {
        console.error('Error:', error);
    }
}

function displayMedias(medias) {
    const mediaContainer = document.getElementById('medias-gallery');
    mediaContainer.innerHTML = ""; // Clear existing content

    medias.forEach((media) => {
        const mediaModel = new MediaTemplate(media, lightbox);        
        const mediaItem = mediaModel.getMediasGallery(medias); // Pass medias array here
        mediaContainer.appendChild(mediaItem);
    });

    updateTotalLikes(medias); // Pass the medias array here
}

function getTotalLikes(medias) {
    return medias.reduce((sum, media) => sum + media.likes, 0);
}

function updateLikesSum(likesSumElement, totalLikes) {
    likesSumElement.textContent = `${totalLikes}`;
}

export function updateTotalLikes(medias) {
    const totalLikes = getTotalLikes(medias);
    const likesSumElement = document.getElementById('total-likes');
    if (likesSumElement) {
        updateLikesSum(likesSumElement, totalLikes);
    }
}


main();
