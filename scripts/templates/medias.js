import openLightbox from '../utils/lightboxModal.js'
import {updateTotalLikes} from '../pages/photographer.js'

class MediaTemplate {
    constructor(data, lightbox) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.image = data.image;
        this.video = data.video;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
        this.openLightbox = lightbox.open;
    }

    getMediasGallery(medias) {
        const mediaGallery = document.querySelector(".media-gallery");

        if (!mediaGallery) {
            console.error('Media gallery element not found');
            return;
        }

        const mediaItem = document.createElement('div');
        mediaItem.setAttribute('tabindex', 0);
        mediaItem.classList.add('media-item');
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail', 'pointer');

        if (this.video) {
            const video = document.createElement('video');
            video.classList.add('media-video');
            video.src = `/assets/photographers/${this.photographerId}/${this.video}`;
            video.controls = true;
            video.autoplay = false;
            thumbnail.appendChild(video);
        } else {
            const image = document.createElement('img');
            image.classList.add('media-image');
            image.src = `/assets/photographers/${this.photographerId}/${this.image}`;
            thumbnail.appendChild(image);
        }

        const title = document.createElement('h2');
        title.classList.add('title', 'pointer');
        title.textContent = this.title;
        title.id = "filter-title";

        const pointerItems = [thumbnail, title];

        pointerItems.forEach(item => {
            item.addEventListener('click', () => {
                this.openLightbox({
                    id: this.id,
                    photographerId: this.photographerId,
                    video: this.video,
                    image: this.image,
                    title: this.title
                });
            });
        });

        const likes = document.createElement('div');
        likes.classList.add('likes');
        let counter = document.createElement('p');
        counter.textContent = this.likes;
        counter.classList.add('likes');
        const like = document.createElement('img');
        like.src = `/assets/images/redHeartFilled.png`;
        like.classList.add('like-button', 'pointer');
        like.addEventListener('click', (event) => {
            event.stopPropagation();
            if (like.classList.contains('liked')) {
                this.likes--;
                like.classList.remove('liked');
            } else {
                this.likes++;
                like.classList.add('liked');
            }
            counter.textContent = this.likes;

            const mediaIndex = medias.findIndex(media => media.id === this.id);
            if (mediaIndex !== -1) {
                medias[mediaIndex].likes = this.likes;
            }


            updateTotalLikes(medias); // Ensure this updates the total likes globally with medias array
        });

        likes.appendChild(counter);
        likes.appendChild(like);

        const mediaInfo = document.createElement('div');
        mediaInfo.classList.add('media-info');
        mediaInfo.appendChild(title);
        mediaInfo.appendChild(likes);
        mediaItem.appendChild(thumbnail);
        mediaItem.appendChild(mediaInfo);

        mediaGallery.appendChild(mediaItem);

        return mediaItem;
    }
}

export default MediaTemplate;
