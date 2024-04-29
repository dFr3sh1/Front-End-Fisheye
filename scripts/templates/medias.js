//Mettre le code Javascript lié à la page photographer.html
//Récupéerer data from json file

class MediaTemplate {
    constructor(data){
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.image = data.image;
        this.likes = data.likes;
        this.date =  data.likes;
        this.price = data.price;
    }    

    getMediasGallery() {
        const mediaGallery = document.querySelector(".media-gallery");

        const mediaItem = document.createElement('div');
        mediaItem.classList.add('media-item');

        const thumbnail = document.createElement('div');
        thumbnail.classList.add('thumbnail');
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = `/assets/photographers/${this.photographerId}/${this.image}`;
        thumbnail.appendChild(thumbnailImg);

        const title = document.createElement('h2')
        title.classList.add('title');
        title.textContent = this.title;
        
        const likes = document.createElement('div');
        likes.classList.add('likes');
        likes.innerHtml =  `
            <svg class="heart-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35L10.55 20.03C5.5 15.36 2 12.27 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.77-3.5 6.86-8.55 11.53L12 21.35z" fill="currentColor"/>
            </svg>
            ${this.likes}
        `;

        mediaItem.appendChild(thumbnail);
        mediaItem.appendChild(title);
        mediaItem.appendChild(likes);

        mediaGallery.appendChild(mediaItem);

        return mediaItem
            
    };
}

console.log(MediaTemplate);

export default MediaTemplate
