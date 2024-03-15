// index.js

import photographerTemplate from './photographer.js';


export async function getPhotographers() {
    try {
        const response = await fetch('data/photographers.json');
        const data = await response.json();
        return data.photographers; // Return only the photographers array
    } catch(error) {
        console.error('Error loading photographers:', error);
        return []; // Return an empty array in case of error
    }
}

export async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();

        userCardDOM.addEventListener('click', () => {
            navigateToPhotographerPage(photographer);
        });

        photographersSection.appendChild(userCardDOM);
    });
}



function navigateToPhotographerPage(photographer) {
    window.location.href = `photographer.html?id=${photographer.id}`;
}


