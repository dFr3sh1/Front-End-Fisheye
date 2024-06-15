import MediaTemplate from "../templates/medias.js";
import lightbox from "../utils/lightboxModal.js";
import { updateTotalLikes } from "./likeUtils.js";

export function displayMedias(medias) {
    const mediaContainer = document.getElementById('medias-gallery');

    let allMediasElements = [];

    medias.forEach((media) => {
        const mediaModel = new MediaTemplate(media, lightbox);        
        mediaModel.getMediasGallery(medias); // Pass medias array here
        let mediaItem = mediaModel.DOMElement;
        allMediasElements.push(mediaModel);
        mediaContainer.appendChild(mediaItem);
    });

    updateTotalLikes(medias); // Pass the medias array here
    return allMediasElements;
}

export function sortMedias(medias, allMediasElements) {
    const mediaContainer = document.getElementById('medias-gallery');
    mediaContainer.innerHTML = "";

    medias.forEach(media => {
        allMediasElements.forEach(am => {
            if (media.id === am.id) {
                mediaContainer.appendChild(am.DOMElement);
            }
        });
    });
}