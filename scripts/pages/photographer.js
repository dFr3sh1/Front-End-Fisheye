// selectedPhotographer.js
import PhotographerTemplate from "../templates/photographer.js";
import MediaTemplate from "../templates/medias.js";
import displayHeaderPh from "../templates/banner.js";
import { getPhotographers, getMedias }  from "../utils/getter.js";
import { filterByPopularity, filterByDate, filterByTitle } from "../utils/mediaFilter.js";

async function main() {
    try {
        const photographers = await getPhotographers();
        const searchPhotographe = window.location.search
        const id = Number(searchPhotographe.split("=")[1]);


        const selectedPhotographer = photographers.find((photographer) => photographer.id === id);
        if (!selectedPhotographer) {
            console.error('Photographer not found');
            return;
        }
        displayHeaderPh(selectedPhotographer);
        //To fetch the media for the selectedPhotographer
        const medias = await getMedias();

        //To filter medias belonging to the selectedPhotographer
        const selectedPhotographerMedias = medias.filter((media) => media.photographerId === id);

        //To display medias
        displayMedias(selectedPhotographerMedias);


        // Filter media based on the selected option in the dropdown
        const filterDropdown = document.getElementById('filter');
        filterDropdown.addEventListener('change', function() {
            const selectedOption = this.value;
            let filteredMedias;
            if (selectedOption === 'popularity') {
                filteredMedias = filterByPopularity(selectedPhotographerMedias);
            } else if (selectedOption === 'date') {
                filteredMedias = filterByDate(selectedPhotographerMedias, 'recent');
            } else if (selectedOption === 'title') {
                 // For title filter, retrieve the keyword from the input field
                const keyword = document.getElementById('filter-title').value;
                // Determine sorting order (alphabetical)
                const order = 'asc'; // or 'desc' for descending order
                filteredMedias = filterByTitle(selectedPhotographerMedias, order);
            }

            // Display filtered media
            displayMedias(filteredMedias);
        });

        // Filter media by popularity by default
        filterDropdown.value = 'popularity';
        const defaultFilteredMedias = filterByPopularity(selectedPhotographerMedias);
        displayMedias(defaultFilteredMedias);

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

main();
