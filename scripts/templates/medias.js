//Mettre le code Javascript lié à la page photographer.html
//Récupéerer data from json file
import {getPhotographers, getMedias} from '../utils/getter.js';
import openLightbox from '../utils/lightboxModal.js';

class MediaTemplate {
    constructor(data){
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.image = data.image;
        this.video = data.video;
        this.likes = data.likes;
        this.date =  data.date;
        this.price = data.price;
    }    

    getMediasGallery() {
        const mediaGallery = document.querySelector(".media-gallery");

        const mediaItem = document.createElement('div');
        mediaItem.classList.add('media-item');
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail');
        const date = this.date

        // Conditional to check if it is video or image
        if (this.video) {
            // Create video element
            const video = document.createElement('video');
            video.classList.add('media-video');
            video.src = `/assets/photographers/${this.photographerId}/${this.video}`;
            video.controls = true;
            video.autoplay = false;

            thumbnail.appendChild(video);
            
        } else {
            // Create image element
            const image = document.createElement('img');
            image.classList.add('media-image');
            image.src =  `/assets/photographers/${this.photographerId}/${this.image}`;

            // Add event listener to open the lightbox once clicked the image
            image.addEventListener('click', () => {
                openLightbox(this.photographerId, this.title);
            });

            thumbnail.appendChild(image)
        }

        const title = document.createElement('h2')
        title.classList.add('title');
        title.textContent = this.title;
        title.id = "filter-title";
        
        const likes = document.createElement('div');
        likes.classList.add('likes');
        let counter = document.createElement('p')
        counter.textContent = this.likes
        const like = document.createElement('img');
        like.src = `/assets/images/redHeartFilled.png`;
        like.addEventListener('click', () => {
            if (like.classList.contains('liked')) {
                this.likes--;
                like.classList.remove('liked');
            } else {
                this.likes ++ ;
                like.classList.add('liked')
            }
            //To update the counter
            counter.textContent = this.likes  
        });

        likes.appendChild(counter)
        likes.appendChild(like);

        const mediaInfo = document.createElement('div');
        mediaInfo.classList.add('media-info');

        mediaInfo.appendChild(title);
        mediaInfo.appendChild(likes);
        mediaItem.appendChild(thumbnail);
        mediaItem.appendChild(mediaInfo);
        

        mediaGallery.appendChild(mediaItem);

        return mediaItem
            
    };
    
}

console.log(MediaTemplate);

export default MediaTemplate
