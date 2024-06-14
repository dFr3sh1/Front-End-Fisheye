//Function to filter medias by popularity
export function filterByPopularity(medias) {
    // Sort the medias in place based on likes
    medias.sort((a, b) => b.likes - a.likes);

    return medias
}

//Function to filter medias by date
export function filterByDate(medias, sortBy) {
    if (sortBy === 'recent') {
        //Sort the medias in place based on date (recent first)
        return medias.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'oldest') {
        //Sort the medias in place based on date (oldest first)
        return medias.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return medias
}

//Function to filter media by title
// Not used in this implementation
export function filterByTitle(medias, order) {
    if (!medias || medias.length === 0) {
        return [];
    }
    
    const sortedMedia = [...medias];
    
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

// Function to update the like counter
// export function updateLikeCounter(mediaId, newLikes) {
//     const mediaItem = document.getElementById(`media-item-${mediaId}`);
//     if (mediaItem) {
//         const counter = mediaItem.querySelector('.likes p');
//         if (counter) {
//             counter.textContent = newLikes; // Update likes count
//         }
//     }
// }
