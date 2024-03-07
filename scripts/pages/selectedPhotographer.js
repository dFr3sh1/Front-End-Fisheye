import photographerTemplate from'./photographer.js'
import { getPhotographers } from "./index.js";

const data = getPhotographers();
const id = 243

const selectedPhotographer = data.photographers.filter((photographer) => {
    if (id === photographer.id) {
        return true
    } else {
        return false
    }
});

const selectedPhotographerMedia = data.photographers.filter((media) => {
    if (id === media.photographerId) {
        return true
    } else {
        return false
    }
});

const displayHeaderPhotographer = photographerTemplate(selectedPhotographer[0]);

//Call the function getPhotographer from index.js



// Program the function that create the photographer-header*/

// function selectedPhotograhper(photographer) {
//     const photographerHeader = document.querySelector('photograph-header');
//     const dataPhotographer = getPhotographers(photographer);
//     const displayHeaderPhotographer = displayData(photographer);
    
//     function createHeaderPhotographer() {

//     }


// }

// console.log(selectedPhotograhper)
/*
- The function must recuperate the attributs from photographerTemplate
- The funtcion must fill these attributes from the function getPhotographers
- Program a function that select each photographer independently
- The function must display the information from the photographer selected
* */

// //Function to display the info from getPhotographers

// function displayPhotographerInfo(CallPhotographer) {
//     

// }

// console.log(displayPhotographerInfo)

// let photographerInfo = await getPhotographers()

// async function displayPhotograph(photographer) {
//     const photographersSection = document.querySelector(".photographer_header");
//     console.log(photographers)

//         const photographerModel = photographerTemplate(photographer);
//         const userCardDOM = photographerModel.getUserCardDOM();
// }

//query params for call each photographe independently, maybe using the id

//function search photographe



// Study the concepts of js objects
// concept of js functions


//const photographer = displayPhotograph()


// //Class constructor@

