//Mettre le code JavaScript lié à la page photographer.html
//Recuperate data from json file


function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price} = data;

    const picture = `assets/photographers/photographersIDPhotos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        const h2 = document.createElement('h2');
        h2.textContent = name;

        let locationDiv = document.createElement('div');
        const cityElement = document.createElement('p');
        cityElement.textContent = city;
        const countryElement = document.createElement('p');
        countryElement.textContent = country;
        const taglineElement = document.createElement('p');
        taglineElement.textContent = tagline;
        const priceElement = document.createElement('p');
        priceElement.textContent = `${price} €/jour`;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(locationDiv);
        locationDiv.appendChild(cityElement);
        locationDiv.appendChild(countryElement);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);
        return article;
    }
    return { name, picture, getUserCardDOM }
    
    }
    

console.log(photographerTemplate)

export default photographerTemplate

//Class constructor@