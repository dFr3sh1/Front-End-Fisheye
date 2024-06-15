export function getTotalLikes(medias) {
    return medias.reduce((sum, media) => sum + media.likes, 0);
}

export function updateLikesSum(likesSumElement, totalLikes) {
    likesSumElement.textContent = `${totalLikes}`;
}

export function updateTotalLikes(medias) {
    const totalLikes = getTotalLikes(medias);
    const likesSumElement = document.getElementById('total-likes');
    if (likesSumElement) {
        updateLikesSum(likesSumElement, totalLikes);
    }
}