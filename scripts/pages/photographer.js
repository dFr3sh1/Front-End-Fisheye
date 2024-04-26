// selectedPhotographer.js
import PhotographerTemplate from "../templates/photographer.js";
import { getPhotographers }  from "../utils/getter.js";

async function main() {
    try {
        const photographers = await getPhotographers();
        const searchPhotographe = window.location.search
        const id = searchPhotographe.split("=")[1]


        console.log(id);

        console.log(searchPhotographe)

        const selectedPhotographer = photographers.find((photographer) => photographer.id === Number(id));
        if (!selectedPhotographer) {
            console.error('Photographer not found');
            return;
        }
        
        const selectedPhotographerMedia = photographers.filter((media) => media.photographerId === id);
        const displayHeaderPhotographer = displayHeaderPh(selectedPhotographer);

        console.log(selectedPhotographer);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayHeaderPh(photographe) {
    const photographer = document.getElementById('photographer');    
    const photographerModel = new PhotographerTemplate(photographe);
    const userCardDOM = photographerModel.getUserCardDOM();

    photographer.appendChild(userCardDOM)

}


main();
