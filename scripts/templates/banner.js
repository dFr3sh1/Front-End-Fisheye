import PhotographerTemplate from "./photographer.js";
import initializeContactForm from "../utils/contactForm.js";


function displayHeaderPh(photographe) {
    const photographer = document.getElementById('photographer');    
    const photographerModel = new PhotographerTemplate(photographe);
    // Retrieve specific elements from the PhotographerTemplate instance
    const divHeader = document.createElement('div')
    divHeader.classList.add('divHeader')
    const h1 = document.createElement('h1');
    h1.textContent = photographerModel.name;
    const ph_country_div = document.createElement('div')
    ph_country_div.classList.add('ph-country-div')
    const city = photographerModel.getUserCardDOM().querySelector('.ph-city')
    city.textContent = photographerModel.city
    city.classList.add('h2photographeLocation')
    const country = photographerModel.getUserCardDOM().querySelector('.ph-country')
    country.textContent = photographerModel.country
    country.classList.add('h2photographeLocation')
    const tagline = document.createElement('p');
    tagline.textContent = photographerModel.tagline;
    tagline.classList.add('contactTagline')
    const contactBtn = document.createElement('button');
    contactBtn.classList.add('mainBtn', 'button', 'contact-btn')
    contactBtn.textContent = "Contactez-moi"
    const photographePortrait = photographerModel.getUserCardDOM().querySelector('.portrait-class');
    photographePortrait.classList.add('headerPortrait');
    const indexedClass = `portrait-id-${photographe.id}`;
    photographePortrait.classList.add(indexedClass);
    photographePortrait.setAttribute('aria-label', 'Photographer Portrait'); 

    // Ensure the retrieved elements exist before appending them
    if (divHeader || h1 || ph_country_div || city || country || tagline || contactBtn || photographePortrait) {
        // Append the retrieved elements to the new page
        photographer.appendChild(divHeader); //Append to the photographer div
        divHeader.appendChild(h1);
        divHeader.appendChild(ph_country_div); // Clone the elements to preserve attributes
        ph_country_div.appendChild(city);
        ph_country_div.appendChild(country);
        divHeader.appendChild(tagline); // Clone the elements to preserve attributes
        photographer.appendChild(contactBtn);
        photographer.appendChild(photographePortrait);
    } else {
        console.error("Title, country or tagline info not found.");
    }
    initializeContactForm(photographerModel.name);
    console.log(initializeContactForm);
}

export default displayHeaderPh;
