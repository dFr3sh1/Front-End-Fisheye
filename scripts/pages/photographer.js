// selectedPhotographer.js
import PhotographerTemplate from "../templates/photographer.js";
import MediaTemplate from "../templates/medias.js";
import displayHeaderPh from "../templates/banner.js";
import { getPhotographerById, getMediasByPhotographerId }  from "../utils/getter.js";
import { filterByPopularity, filterByDate, filterByTitle } from "../utils/mediaFilter.js";
import { initializeContactForm, closeModal } from "../utils/contactForm.js";

async function main() {
    try {
        
        const searchPhotographe = window.location.search;
        const id = Number(searchPhotographe.split("=")[1]);
        const photographer = await getPhotographerById(id);

        displayHeaderPh(photographer);
        //To fetch the media for the selectedPhotographer
        const medias = await getMediasByPhotographerId(id);
        console.log(medias)

        //To display medias
        displayMedias(medias);


        // Filter media based on the selected option in the dropdown
        const filterDropdown = document.getElementById('filter');
        filterDropdown.addEventListener('change', function() {
            const selectedOption = this.value;
            let filteredMedias;
            if (selectedOption === 'popularity') {
                filteredMedias = filterByPopularity(medias);
            } else if (selectedOption === 'date') {
                filteredMedias = filterByDate(medias, 'recent');
            } else if (selectedOption === 'title') {
                 // For title filter, retrieve the keyword from the input field
                const keyword = document.getElementById('filter-title').value;
                // Determine sorting order (alphabetical)
                const order = 'asc'; // or 'desc' for descending order
                filteredMedias = filterByTitle(medias, order);
            }

            // Display filtered media
            displayMedias(filteredMedias);
        });

        // Filter media by popularity by default
        filterDropdown.value = 'popularity';
        const defaultFilteredMedias = filterByPopularity(medias);
        displayMedias(defaultFilteredMedias);

        // Calculate and display global sum of likes and price
        const likePriceDiv = document.getElementById('like-price');
        const likesSumElement = document.createElement('p');
        const totalLikes = getTotalLikes(medias);
        const heartIcon = document.createElement('img');
        heartIcon.src = `assets/images/blackHeartFilled.png`;
        const phPrice = document.createElement('p');
        phPrice.textContent = `${photographer.price} €/jour`;
        updateLikesSum(likesSumElement, totalLikes);
        likePriceDiv.appendChild(likesSumElement);
        likePriceDiv.appendChild(heartIcon);
        likePriceDiv.appendChild(phPrice);

        initializeContactForm()
        //console.log(selectedPhotographer);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayMedias(medias) {
    const mediaContainer = document.getElementById('medias-gallery');
    mediaContainer.innerHTML = ""; // Clear existing content

    medias.forEach(media => {
        const mediaModel = new MediaTemplate(media);     
        
        const mediaItem = mediaModel.getMediasGallery();

        mediaContainer.appendChild(mediaItem)
    });
}

function getTotalLikes(medias) {
    return medias.reduce((sum, media) => sum + media.likes, 0);
}

function updateLikesSum(likesSumElement, totalLikes) {
    likesSumElement.textContent = `${totalLikes}`;
    console.log(updateLikesSum)
}

main();
