import openLightbox from '../utils/lightboxModal.js'
import { updateTotalLikes} from '../utils/likeUtils.js'

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
        this.DOMElement = null;
    }

    getMediasGallery(medias) {
        const mediaGallery = document.querySelector('.media-gallery');

        if (!mediaGallery) {
            console.error('Media gallery element not found');
            return;
        }

        const mediaItem = document.createElement('div');
        mediaItem.classList.add('media-item');

        const thumbnail = document.createElement('span');
        thumbnail.classList.add('thumbnail', 'pointer', 'selected');
        thumbnail.setAttribute('tabindex', 0);

        if (this.video) {
            const video = document.createElement('video');
            video.classList.add('media-video', 'media');
            video.src = `/assets/photographers/${this.photographerId}/${this.video}`;
            video.controls = true;
            video.autoplay = false;
            thumbnail.appendChild(video);
        } else {
            const image = document.createElement('img');
            image.classList.add('media-image', 'media');
            image.src = `/assets/photographers/${this.photographerId}/${this.image}`;
            thumbnail.appendChild(image);
        }

        const title = document.createElement('h2');
        title.classList.add('title', 'pointer');
        title.textContent = this.title;
        title.id = "filter-title";

        const pointerItems = [thumbnail, title];

        pointerItems.forEach(item => {
            const itemAction = () => {
                this.openLightbox({
                    id: this.id,
                    photographerId: this.photographerId,
                    video: this.video,
                    image: this.image,
                    title: this.title
                });
            }

            item.addEventListener('click', itemAction);
            item.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    itemAction();
                }    
            });
        });

        const likes = document.createElement('div');
        likes.classList.add('likes');

        let counter = document.createElement('p');
        counter.textContent = this.likes;
        counter.classList.add('likes');
        counter.tabIndex = 0;

        const like = document.createElement('img');
        like.src = `/assets/images/redHeartFilled.png`;
        like.classList.add('like-button', 'pointer');
        like.tabIndex = 0;

        like.addEventListener('click', (event) => {
            event.stopPropagation();
            this.toggleLike(like, medias, counter);
        });

        like.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.stopPropagation();
                this.toggleLike(like, medias, counter)
            }
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

        this.DOMElement = mediaItem;
    }

    toggleLike(like, medias, counter) {
        if (like.classList.contains('liked')) {
            this.likes --;
            like.classList.remove('liked');
        } else {
            this.likes++;
            like.classList.add('liked');
        }
        counter.textContent = this.likes;
        
        const mediaIndex = medias.findIndex(media => media.id === this.id);
        if (mediaIndex !== -1) {
            medias[mediaIndex].likes = this.likes
        }

        updateTotalLikes(medias);
        }
}

export default MediaTemplate;
