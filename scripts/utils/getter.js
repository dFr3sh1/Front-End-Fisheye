

export async function getPhotographers() {
    try {
        const response = await fetch('/data/photographers.json');
        const data = await response.json();
        return data.photographers; // Return only the photographers array
    } catch(error) {
        console.error('Error loading photographers:', error);
        return []; // Return an empty array in case of error
    }
}

export async function getMedias() {
    try {
        const response = await fetch('/data/photographers.json');
        const data = await response.json();
        return data.media; // Return only the photographers array
    } catch(error) {
        console.error('Error loading medias:', error);
        return []; // Return an empty array in case of error
    }
}

export async function getPhotographerById(id) {
    try {
        const response = await fetch('/data/photographers.json');
        const data = await response.json();
        const selected = data.photographers.find(p => p.id === id)
        return selected; // Return only the photographer
    } catch(error) {
        console.error('Error loading photographer:', error);
        return []; // Return an empty array in case of error
    }
}


export async function getMediasByPhotographerId(id) {
    try {
        const response = await fetch('/data/photographers.json');
        const data = await response.json();
        const selected = data.media.filter(media => media.photographerId === id)
        return selected; // Return only the medias from the photographer array
    } catch(error) {
        console.error('Error loading medias', error);
        return []; // Return an empty array in case of error
    }
}