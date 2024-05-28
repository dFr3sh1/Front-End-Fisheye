
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

// Function to fetch and store medias array and photographerId
// async function initializeAndRenderGallery(photographerId) {
//     console.log('Fetching medias for photographerId:', photographerId); // Debug log
    
//     const medias = await getMediasByPhotographerId(photographerId);
//     console.log('Fetched medias:', medias); // Debug log
    
//     if (!medias || medias.length === 0) {
//         console.error('No medias found');
//         return;
//     }
    
//     medias.forEach(mediaData => {
//         const mediaTemplate = new MediaTemplate(mediaData, medias);
//         mediaTemplate.getMediasGallery();
//     });
// }





// Keyboard navigation handler function
// ETAPE 1 : Assigner les valeurs a la lightbox (src, alt, titre, idmedia)
// ETAPE 2 : Afficher la lighbox (notamment avec un jeu de class css)
// ETAPE 3 : Créer dans ce fichier des fonctions a exporter pour fermer, next et prev la lighbox
// NEXT et PREV recevrons les medias en paramètre
// ETAPE 4 : Mettre un listener pour chacun des button directement dans photographer.js et appeler les functions créée  plus haut en mettant en parametre la variable medias

// Close lightbox when clicking outside the content or pressing Escape key
// lightbox.onclick = function(event) {
//     if (event.target === lightbox) {
//         closeLightbox();
//     }
// };

// Attach event listeners for navigation
// prevButton.onclick = () => prevMedia(photographerId, currentIndex, medias);
// nextButton.onclick = () => nextMedia(photographerId, currentIndex, medias);
// closeBtn.onclick = closeLightbox;

// Ensure only one event listener for keyboard navigation
// document.removeEventListener('keydown', handleKeydown);
// document.addEventListener('keydown', (event) => handleKeydown(event, photographerId, currentIndex, medias));


        // prevButton.style.display = index === -1 ? 'none' : 'flex';
        // nextButton.style.display = index === medias.length - 1 ? 'none' : 'flex';
        // closeBtn.style.display = index === -1 ? 'none' : 'flex';
    // function handleKeydown(event) {
    //     // Retrieve photographerId from session storage
    //     const photographerId = sessionStorage.getItem('photographerId');

    //     // Check if photographerId is valid
    //     if (!photographerId) {
    //         console.error('Photographer ID is undefined or null');
    //         return;
    //     }

    //     // Handle keyboard navigation
    //     if (event.key === 'ArrowLeft' && currentIndex > 0) {
    //         openLightbox(photographerId, medias[currentIndex - 1].title); // Update with previous title
    //     } else if (event.key === 'ArrowRight' && currentIndex < medias.length - 1) {
    //         openLightbox(photographerId, medias[currentIndex + 1].title); // Update with next title
    //     } else if (event.key === 'Escape') {
    //         closeLightbox();
    //     }
    // }

