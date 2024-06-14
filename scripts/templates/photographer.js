//Mettre le code JavaScript lié à la page photographer.html
//Recuperate data from json file
//import {getPhotographers, getMedias} from '../utils/getter.js'

class PhotographerTemplate {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.portrait = data.portrait;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
    }

    getUserCardDOM() {
        const article = document.createElement('article');

        const a = document.createElement('a');
        a.classList.add('a-link');
        a.href = `photographer.html?id=${this.id}`;

        const divLink = document.createElement('div');
        divLink.id = 'divLink';

        const img = document.createElement('img');
        img.classList.add('portrait-class');
        img.style.backgroundImage = `url(assets/photographers/photographersIDPhotos/${this.portrait})`;
        img.alt = `Portrait de ${this.name}`;
        
        const h2 = document.createElement('h2');
        h2.textContent = this.name;
        h2.classList.add('ph-name');

        const ph_div_info = document.createElement('div');
        ph_div_info.classList.add('ph-div-info');

        const locationDiv = document.createElement('div');
        locationDiv.classList.add('ph-country-div');

        const cityElement = document.createElement('p');
        cityElement.textContent = this.city;
        cityElement.classList.add('ph-city');

        const countryElement = document.createElement('p');
        countryElement.textContent = this.country;
        countryElement.classList.add('ph-country');

        const taglineElement = document.createElement('p');
        taglineElement.textContent = this.tagline;

        const priceElement = document.createElement('p');
        priceElement.textContent = `${this.price} €/jour` ?? ('Le photographe négocie son prix selon travail');
        priceElement.classList.add('priceText');

        article.appendChild(a);
        a.appendChild(divLink);
        divLink.appendChild(img);
        divLink.appendChild(h2);

        article.appendChild(ph_div_info);
        ph_div_info.appendChild(locationDiv);
        locationDiv.appendChild(cityElement);
        locationDiv.appendChild(countryElement);
        ph_div_info.appendChild(taglineElement);
        ph_div_info.appendChild(priceElement);

        return article;

    }
}

export default PhotographerTemplate