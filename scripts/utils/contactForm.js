let isInitialized = false;

export function initializeContactForm(photographerName) {
    if (isInitialized) {
        return; // Prevent re-initialization
    }
    isInitialized = true;
    
    const contactBtn = document.querySelector('.contact-btn');
    const modal = document.getElementById("contact_modal");
    const formTitle = document.getElementById('form-title');
    const mediaGallery = document.getElementById('medias-gallery');
    const closeBtn = document.querySelector('.close-btn');
    const thanksForContacting = document.getElementById('thanks-for-contacting');
    const closeThanksBtn = document.getElementById('close-thanks');

    // Access the paragraph with the class 'thanks-modal' inside thanksForContacting
    const thanksModalP = thanksForContacting.querySelector('.thanks-modal');

    // Get the first name of the photographer
    const photographerFirstName = photographerName.split(' ')[0];

    formTitle.innerHTML = `Contactez-moi <br>${photographerName}`;

    contactBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        closeBtn.focus();
    });

    closeBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Retrieve and log form values
        const form = event.target;  // Reference to the form
        const formData = new FormData(form);  // Get form data
        const formEntries = Object.fromEntries(formData.entries());  // Convert to an object
        console.log('Form Data:', formEntries);  // Log form data

        // Update the thanks-modal p element content
        thanksModalP.textContent = `Merci de m'avoir contacté. Je vous répondrai au plus vite, \n ${photographerFirstName}.`;

        thanksForContacting.style.display = 'flex';
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'false');
        closeThanksBtn.focus();

        // Reset form input fields
        form.reset();  // Reset the form
    });

    closeThanksBtn.addEventListener('click', function() {
        thanksForContacting.style.display = 'none';
        //document.body.classList.remove('no-scroll');
        mediaGallery.style.display = 'grid';
        contactBtn.focus();
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && thanksForContacting.style.display === 'block') {
            thanksForContacting.style.display = 'none';
            mediaGallery.style.display = 'grid';
            contactBtn.focus();
        }
    });
}

export function closeModal() {
    const modal = document.getElementById("contact_modal");
    const contactBtn = document.querySelector('.contact-btn');

    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    contactBtn.focus();
}

export default initializeContactForm;