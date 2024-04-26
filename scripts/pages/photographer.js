// selectedPhotographer.js
import PhotographerTemplate from "../templates/photographer.js";
import { getPhotographers }  from "../utils/getter.js";

async function main() {
    try {
        const photographers = await getPhotographers();
        const searchPhotographe = window.location.search
        const id = searchPhotographe.split("=")[1]


        // console.log(id);
        // console.log(searchPhotographe)

        const selectedPhotographer = photographers.find((photographer) => photographer.id === Number(id));
        if (!selectedPhotographer) {
            console.error('Photographer not found');
            return;
        }
        displayHeaderPh(selectedPhotographer);
        //const selectedPhotographerMedia = photographers.filter((media) => media.photographerId === id);
        //const displayHeaderPhotographer = displayHeaderPh(selectedPhotographer);

        console.log(selectedPhotographer);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayHeaderPh(photographe) {
    const photographer = document.getElementById('photographer');    
    const photographerModel = new PhotographerTemplate(photographe);
    // Retrieve specific elements from the PhotographerTemplate instance
    const divHeader = document.createElement('div')
    divHeader.classList.add('divHeader')
    const h1 = document.createElement('h1');
    h1.textContent = photographerModel.name;
    const ph_country_div = photographerModel.getUserCardDOM().querySelector('.ph-country-div');
    const tagline = document.createElement('p');
    tagline.textContent = photographerModel.tagline;
    const contactBtn = document.createElement('button');
    contactBtn.classList.add('contactBtn')
    contactBtn.textContent = "Contactez-moi"
    const photographePortrait = photographerModel.getUserCardDOM().querySelector('.portrait-class');
    photographePortrait.classList.add('headerPortrait');
    const indexedClass = `portrait-id-${photographe.id}`;
    photographePortrait.classList.add(indexedClass);

    

    // Ensure the retrieved elements exist before appending them
    if (divHeader || h1 || ph_country_div || tagline || contactBtn || photographePortrait) {
        // Append the retrieved elements to the new page
        photographer.appendChild(divHeader); // Clone the elements to preserve attributes
        divHeader.appendChild(h1);
        divHeader.appendChild(ph_country_div); // Clone the elements to preserve attributes
        divHeader.appendChild(tagline); // Clone the elements to preserve attributes
        photographer.appendChild(contactBtn);
        photographer.appendChild(photographePortrait);
    } else {
        console.error("Title, country or tagline info not found.");
    }
}

main();
