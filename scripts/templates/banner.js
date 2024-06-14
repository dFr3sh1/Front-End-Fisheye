import PhotographerTemplate from "./photographer.js";
import { initializeContactForm } from "../utils/contactForm.js";

function displayHeaderPh(photographe) {
    const photographer = document.getElementById('photographer');    
    const photographerModel = new PhotographerTemplate(photographe);
    
    const divHeader = document.createElement('div');
    divHeader.classList.add('divHeader');
    
    const h1 = document.createElement('h1');
    h1.textContent = photographerModel.name;
    
    const ph_country_div = document.createElement('div');
    ph_country_div.classList.add('ph-country-div');
    
    const city = document.createElement('p');
    city.textContent = photographerModel.city;
    city.classList.add('h2photographeLocation');
    
    const country = document.createElement('p');
    country.textContent = photographerModel.country;
    country.classList.add('h2photographeLocation');
    
    const tagline = document.createElement('p');
    tagline.textContent = photographerModel.tagline;
    tagline.classList.add('contactTagline');
    
    const contactBtn = document.createElement('button');
    contactBtn.classList.add('mainBtn', 'button', 'contact-btn');
    contactBtn.textContent = "Contactez-moi";
    
    const photographePortrait = document.createElement('img');
    photographePortrait.classList.add('portrait-class', 'headerPortrait');
    photographePortrait.src = `assets/photographers/photographersIDPhotos/${photographe.portrait}`;
    photographePortrait.alt = `Portrait de ${photographe.name}`;
    
    divHeader.appendChild(h1);
    divHeader.appendChild(ph_country_div);
    ph_country_div.appendChild(city);
    ph_country_div.appendChild(country);
    divHeader.appendChild(tagline);
    photographer.appendChild(divHeader);
    photographer.appendChild(contactBtn);
    photographer.appendChild(photographePortrait);
    
    initializeContactForm(photographerModel.name);
}

export default displayHeaderPh;