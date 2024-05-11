//Function to filter medias by popularity
export function filterByPopularity(media) {
    // Create a copy of the media array before sorting
    const mediaCopy = [...media];
    return mediaCopy.sort((a, b) => b.likes - a.likes);
}

//Function to filter medias by date
export function filterByDate(media, sortBy) {
    if (sortBy === 'recent') {
        return media.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'oldest') {
        return media.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
}

//Function to filter media by title
// Not used in this implementation
export function filterByTitle(media, order) {
    if (!media || media.length === 0) {
        return [];
    }
    
    const sortedMedia = [...media];
    
    sortedMedia.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        if (titleA < titleB) {
            return order === 'asc' ? -1 : 1;
        }
        if (titleA > titleB) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    });

    return sortedMedia;
}

//Function to update likes
// Function to update the like counter
export function updateLikeCounter(mediaId, newLikes) {
    const mediaItem = document.getElementById(`media-item-${mediaId}`);
    if (mediaItem) {
        const counter = mediaItem.querySelector('.likes p');
        if (counter) {
            counter.textContent = newLikes; // Update likes count
        }
    }
}
