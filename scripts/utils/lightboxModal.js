
function open(media) {
    
    // Ouvrir la ligthbox
    let lightbox = document.querySelector('#lightbox')
    lightbox.classList.add('lightbox-active')
    lightbox.setAttribute('data-id', media.id)

    // Afficher le media dans la lightbox
    changeMedia(media)

}

function changeMedia(media) {
    let image = document.querySelector('#lightbox-media')
    let video = document.querySelector('#lightbox-video')

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
        return;
    }
}

function previous(medias) {
    
    let lightbox = document.querySelector('#lightbox')
    let idMedia = Number(lightbox.getAttribute('data-id'))
    let key = medias.findIndex(media => media.id === idMedia)

    let newKey = key

    if(key - 1 < 0) {
        newKey = medias.length - 1
        changeMedia(medias[newKey])
    } else {
        newKey = key - 1
        changeMedia(medias[newKey])
    }

    lightbox.setAttribute('data-id', medias[newKey].id)
    
}

function next(medias) {
    let lightbox = document.querySelector('#lightbox')
    let idMedia = Number(lightbox.getAttribute('data-id'))
    let key = medias.findIndex(media => media.id === idMedia)

    let newKey = key

    if(key + 1 === medias.length ) {
        newKey = 0
        changeMedia(medias[newKey])
    } else {
        newKey = key + 1
        changeMedia(medias[newKey])
    }

    lightbox.setAttribute('data-id', medias[newKey].id)
}

function close() {
    let lightbox = document.querySelector('#lightbox')
    lightbox.classList.remove('lightbox-active')
}

export default {open, previous, next, close}


// Keyboard navigation handler function
// ETAPE 1 : Assigner les valeurs a la lightbox (src, alt, titre, idmedia)
// ETAPE 2 : Afficher la lighbox (notamment avec un jeu de class css)
// ETAPE 3 : Créer dans ce fichier des fonctions a exporter pour fermer, next et prev la lighbox
// NEXT et PREV recevrons les medias en paramètre
// ETAPE 4 : Mettre un listener pour chacun des button directement dans photographer.js et appeler les functions créée  plus haut en mettant en parametre la variable medias
