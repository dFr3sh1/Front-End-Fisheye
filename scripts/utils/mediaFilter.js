//Function to filter medias by popularity
export function filterByPopularity(medias) {
    // Sort the medias in place based on likes
    return medias.sort((a, b) => b.likes - a.likes);
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
export function filterByTitle(medias, order) {
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