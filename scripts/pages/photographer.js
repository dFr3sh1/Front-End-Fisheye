import displayHeaderPh from "../templates/banner.js";
import { getPhotographerById, getMediasByPhotographerId } from "../utils/getter.js";
import { filterByPopularity, filterByDate, filterByTitle } from "../utils/mediaFilter.js";
import { initializeContactForm } from "../utils/contactForm.js";
import lightbox from "../utils/lightboxModal.js";
import { displayMedias, sortMedias } from "../utils/mediaDisplay.js";
import { getTotalLikes, updateLikesSum } from "../utils/likeUtils.js";
import { handleKeydown, handleDropdownKeydown } from "../utils/keyboardNavigation.js";

async function main() {
    try {
        const searchPhotographe = window.location.search;
        const id = Number(searchPhotographe.split("=")[1]);
        const photographer = await getPhotographerById(id);

        displayHeaderPh(photographer);

        // Fetch the media for the selected photographer
        let medias = await getMediasByPhotographerId(id);

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
                const order = 'asc'; // or 'desc' for descending order
                medias = filterByTitle(medias, order);
            }

            // Display filtered media
            sortMedias(medias, allMediasElements);
        });

        filterDropdown.addEventListener('keydown', function (event) {
            handleDropdownKeydown(event, filterDropdown);
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
        closeBtn.addEventListener('click', () => lightbox.close());

        document.addEventListener('keydown', (event) => handleKeydown(event, medias));

    } catch (error) {
        console.error('Error:', error);
    }
}

main();
