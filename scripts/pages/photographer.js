// selectedPhotographer.js
import PhotographerTemplate from "../templates/photographer.js";
import MediaTemplate from "../templates/medias.js";
import displayHeaderPh from "../templates/banner.js";
import { getPhotographers, getMedias }  from "../utils/getter.js";

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

        //console.log(selectedPhotographer);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayMedias(medias) {
    const mediaContainer = document.getElementById('medias-gallery');

    medias.forEach(media => {
        const mediaModel = new MediaTemplate(media);     
        
        const mediaItem = mediaModel.getMediasGallery();
        

        mediaContainer.appendChild(mediaItem)
    });
}

main();
