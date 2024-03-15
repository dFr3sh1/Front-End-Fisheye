import { displayData, getPhotographers } from "./index.js";


async function init() {
    try {
        const photographers = await getPhotographers();
        displayData(photographers);
    } catch (error) {
        console.error('Error initializing:', error);
    }
}

document.addEventListener("DOMContentLoaded", init);