

export async function getPhotographers() {
    try {
        const response = await fetch('data/photographers.json');
        const data = await response.json();
        return data.photographers; // Return only the photographers array
    } catch(error) {
        console.error('Error loading photographers:', error);
        return []; // Return an empty array in case of error
    }
}

export async function getMedias() {
    try {
        const response = await fetch('data/photographers.json');
        const data = await response.json();
        return data.media; // Return only the photographers array
    } catch(error) {
        console.error('Error loading medias:', error);
        return []; // Return an empty array in case of error
    }
}

