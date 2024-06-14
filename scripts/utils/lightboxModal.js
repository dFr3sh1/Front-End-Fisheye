
function open(media) {
    
    // Open the lightbox
    const lightbox = document.querySelector('#lightbox')
    lightbox.classList.add('lightbox-active')
    lightbox.setAttribute('data-id', media.id)

    // Display media in the lightbox
    changeMedia(media)

}

function changeMedia(media) {
    const image = document.querySelector('#lightbox-media')
    const video = document.querySelector('#lightbox-video')

    if (media.image) {
        image.src = `./assets/photographers/${media.photographerId}/${media.image}`;
        image.alt = media.title;
        image.classList.add('lightbox-media-active')
        video.classList.remove('lightbox-media-active')
    } else if (media.video) {
        video.src = `./assets/photographers/${media.photographerId}/${media.video}`;
        video.controls = true;
        video.classList.add('lightbox-media-active')
        image.classList.remove('lightbox-media-active')
    } else {
        console.error('Media type not recognized');
    }
}

function previous(medias) {
    const lightbox = document.querySelector('#lightbox')
    const idMedia = Number(lightbox.getAttribute('data-id'))
    const key = medias.findIndex(media => media.id === idMedia)

    const newKey = key - 1 < 0 ? medias.length -1 : key - 1;
    changeMedia(medias[newKey]);
    lightbox.setAttribute('data-id', medias[newKey].id);  
}

function next(medias) {
    const lightbox = document.querySelector('#lightbox')
    const idMedia = Number(lightbox.getAttribute('data-id'))
    const key = medias.findIndex(media => media.id === idMedia)

    const newKey = key +1 === medias.length ? 0 : key + 1;
    changeMedia(medias[newKey]);
    lightbox.setAttribute('data-id', medias[newKey].id)
}

function close() {
    const lightbox = document.querySelector('#lightbox')
    lightbox.classList.remove('lightbox-active')
}

export default {open, previous, next, close}


// Keyboard navigation handler function
// ETAPE 1 : Assigner les valeurs a la lightbox (src, alt, titre, idmedia)
// ETAPE 2 : Afficher la lighbox (notamment avec un jeu de class css)
// ETAPE 3 : Créer dans ce fichier des fonctions a exporter pour fermer, next et prev la lighbox
// NEXT et PREV recevrons les medias en paramètre
// ETAPE 4 : Mettre un listener pour chacun des button directement dans photographer.js et appeler les functions créée  plus haut en mettant en parametre la variable medias
