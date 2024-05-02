//Mettre le code Javascript lié à la page photographer.html
//Récupéerer data from json file

class MediaTemplate {
    constructor(data){
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.image = data.image;
        this.video = data.video;
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
            
        //Conditional to check if it is video or image

        if (this.video) {
            //To create video element
            const video = document.createElement('video');
            video.classList.add('media-video');
            video.src = `/assets/photographers/${this.photographerId}/${this.video}`;
            video.controls = true;
            video.autoplay = false;

            thumbnail.appendChild(video);
            
        } else {
            const image = document.createElement('img');
            image.classList.add('media-mage');
            image.src =  `/assets/photographers/${this.photographerId}/${this.image}`;

            thumbnail.appendChild(image)

        }



        const title = document.createElement('h2')
        title.classList.add('title');
        title.textContent = this.title;
        
        const likes = document.createElement('div');
        likes.classList.add('likes');
        const like = document.createElement('img');
        like.src = `/assets/images/redHeartFilled.png`;
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
