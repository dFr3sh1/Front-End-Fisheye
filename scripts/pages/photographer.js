//Mettre le code JavaScript lié à la page photographer.html
//Recuperate data from json file


function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price} = data;

    const picture = `assets/photographers/photographersIDPhotos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        //img.setAttribute("src", picture);
        img.classList.add('portrait-class');
        img.style.backgroundImage = `url(assets/photographers/photographersIDPhotos/${portrait})`;
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.classList.add('ph-name');
        const ph_div_info = document.createElement('div');
        ph_div_info.classList.add('ph-div-info');
        let locationDiv = document.createElement('div');
        locationDiv.classList.add('ph-country-div')
        const cityElement = document.createElement('p');
        cityElement.textContent = city;
        cityElement.classList.add('ph-city');
        const countryElement = document.createElement('p');
        countryElement.textContent = country;
        countryElement.classList.add('ph-country');
        const taglineElement = document.createElement('p');
        taglineElement.textContent = tagline;
        const priceElement = document.createElement('p');
        priceElement.textContent = `${price} €/jour` ?? ('Le photographe négocie son prix selon travail');
        priceElement.classList.add('priceText');

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(ph_div_info)
        ph_div_info.appendChild(locationDiv);
        locationDiv.appendChild(cityElement);
        locationDiv.appendChild(countryElement);
        ph_div_info.appendChild(taglineElement);
        ph_div_info.appendChild(priceElement);


        return article;
    }

    return { name, picture, getUserCardDOM }
    
    }
    

console.log(photographerTemplate)

export default photographerTemplate

