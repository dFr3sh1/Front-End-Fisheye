// selectedPhotographer.js
import MediaTemplate from "../templates/medias.js";
import displayHeaderPh from "../templates/banner.js";
import { getPhotographerById, getMediasByPhotographerId } from "../utils/getter.js";
import { filterByPopularity, filterByDate, filterByTitle } from "../utils/mediaFilter.js";
import { initializeContactForm } from "../utils/contactForm.js";
import lightbox from "../utils/lightboxModal.js";

async function main() {
    try {
        const searchPhotographe = window.location.search;
        const id = Number(searchPhotographe.split("=")[1]);
        const photographer = await getPhotographerById(id);

        displayHeaderPh(photographer);

        // Fetch the media for the selected photographer
        // const originalMedias = await getMediasByPhotographerId(id);
        let medias = await getMediasByPhotographerId(id);
        // console.log(medias);

        // Display medias
        let allMediasElements = displayMedias(medias);

        // Filter media based on the selected option in the dropdown
        const filterDropdown = document.getElementById('filter');
        filterDropdown.addEventListener('change', function () {
            const selectedOption = this.value;
            if (selectedOption === 'popularity') {
                medias = filterByPopularity(medias);
            } else if (selectedOption === 'date') {
                medias = filterByDate(medias, 'recent');
            } else if (selectedOption === 'title') {
                // const keyword = document.getElementById('filter-title').value;
                const order = 'asc'; // or 'desc' for descending order
                medias = filterByTitle(medias, order);
            }

            // Display filtered media
            sortMedias(medias, allMediasElements);
        });

        // Filter media by popularity by default
        filterDropdown.value = 'popularity';
        medias = filterByPopularity(medias);
        sortMedias(medias, allMediasElements);

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

        initializeContactForm(photographer.name);

        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');
        const closeBtn = document.getElementById('close-button');

        prevButton.addEventListener('click', () => lightbox.previous(medias));
        nextButton.addEventListener('click', () => lightbox.next(medias));
        closeBtn.addEventListener('click', () => lightbox.close())

        document.addEventListener('keydown', (event) => handleKeydown(event, medias));

    } catch (error) {
        console.error('Error:', error);
    }
}

function displayMedias(medias) {
    const mediaContainer = document.getElementById('medias-gallery');

    let allMediasElements = []

    medias.forEach((media) => {
        const mediaModel = new MediaTemplate(media, lightbox);        
        mediaModel.getMediasGallery(medias); // Pass medias array here
        let mediaItem = mediaModel.DOMElement
        allMediasElements.push(mediaModel)
        mediaContainer.appendChild(mediaItem);
    });

    updateTotalLikes(medias); // Pass the medias array here
    return allMediasElements
}

function sortMedias(medias, allMediasElements) {
    const mediaContainer = document.getElementById('medias-gallery');
    mediaContainer.innerHTML = ""

    medias.forEach(media => {
        allMediasElements.forEach(am => {
            if(media.id === am.id) {
                mediaContainer.appendChild(am.DOMElement)
            }
        })
    })

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
