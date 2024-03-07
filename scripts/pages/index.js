    import photographerTemplate from'./photographer.js'

    export async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        try {
            const response = await fetch('data/photographers.json');
            const data = await response.json();
            return data 
        } catch(error) {
            console.error('Erreur lors du chargement des photographes :', error);
            return { photographers: [] }; // Retourne une liste vide en cas d'erreur
    }
    
        }
        console.log(getPhotographers)
        
        // et bien retourner le tableau photographers seulement une fois récupéré
        // return ({
        //     photographers: [...photographers, ...photographers, ...photographers]})

    

    export async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        
        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();

        //Add un event listener to each photographer section
            userCardDOM.addEventListener('click', () => {
                navigateToPhotographerPage(photographer);
            });

            photographersSection.appendChild(userCardDOM);
        });
    }

    console.log(displayData)

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }

    console.log(init);

    //Function to navigate to photographer page

    function navigateToPhotographerPage(photographer) {
        //Navigate to photographer.html with the phographer's ID
        window.location.href = `photographer.html?id=${photographer.id}`
    };

    init();
    
    
    
