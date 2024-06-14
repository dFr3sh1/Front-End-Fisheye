// index.js
import PhotographerTemplate from '../templates/photographer.js';
import {getPhotographers} from '../utils/getter.js'

export async function init() {
    try {
        const photographers = await getPhotographers();
        const photographersSection = document.querySelector(".photographer_section");
    
        photographers.forEach((photographer, index) => {
            const photographerModel = new PhotographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            userCardDOM.querySelector(".portrait-class").classList.add(`portrait-${index}`);
            userCardDOM.addEventListener("click", () => {
                navigateToPhotographerPage(photographer);
            })    
            photographersSection.appendChild(userCardDOM);
        });

    
    } catch (error) {
        console.error('Error initializing:', error);
    }

}
// Call init() when the DOM content is loaded
document.addEventListener("DOMContentLoaded", async () => {
    await init();
});



// export async function displayData(photographers) {
//     const photographersSection = document.querySelector(".photographer_section");

    
//     photographers.forEach((photographer) => {
//         const photographerModel = new PhotographerTemplate(photographer);
//         const userCardDOM = photographerModel.getUserCardDOM();
//         const portraitElements = document.querySelectorAll('.portrait-class');
    
//     portraitElements.forEach((element, id) => {
//         element.classList.add(`portrait-${index}`);
//     });


//         userCardDOM.addEventListener('click', () => {
//             navigateToPhotographerPage(photographer);
//         });

//         photographersSection.appendChild(userCardDOM);
//     });
// }



// function navigateToPhotographerPage(photographer) {
//     window.location.href = `photographer.html?id=${photographer.id}`;
// }


