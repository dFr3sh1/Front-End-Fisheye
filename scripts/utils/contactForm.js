let isInitialized = false

export function initializeContactForm(photographerName) {
    if (isInitialized) {
        return; // Prevent re-initialization
    }
    isInitialized = true;
    const contactBtn = document.querySelector('.contact-btn');
    const modal = document.getElementById("contact_modal");
    const formTitle = document.getElementById('form-title');
    const mediaGallery = document.getElementById('medias-gallery')
    const closeBtn = document.querySelector('.close-btn');
    const thanksForContacting = document.getElementById('thanks-for-contacting');
    const closeThanksBtn = document.getElementById('close-thanks');

    formTitle.innerHTML = `Contactez-moi <br>${photographerName}`;

    contactBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
        //document.body.style.position = 'fixed';
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
        thanksForContacting.style.display = 'flex';
        modal.style.display = 'none';
        // mediaGallery.style.display = 'none';
        modal.setAttribute('aria-hidden', 'false');
        closeThanksBtn.focus();
        //To reset the form
        // Reset form input fields
        const form = document.getElementById('contact-form');
        const inputs = form.getElementsByTagName('input');
        const textarea = form.getElementsByTagName('textarea')[0];

        for (let input of inputs) {
            input.value = ''; // Clear input field value
        }
        textarea.value = ''; // Clear textarea value
    });

    closeThanksBtn.addEventListener('click', function() {
        thanksForContacting.style.display = 'none';
        //document.body.classList.remove('no-scroll');
        mediaGallery.style.display = 'grid'
        contactBtn.focus();
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && thanksForContacting.style.display === 'block') {
            thanksForContacting.style.display = 'none';
            //document.body.classList.remove('no-scroll');
            mediaGallery.style.display = 'grid'
            contactBtn.focus();
        }
    });
}

export function closeModal() {
    const modal = document.getElementById("contact_modal");
    const contactBtn = document.querySelector('.contact-btn');

    modal.style.display = "none";
    //document.body.classList.remove('no-scroll');
    modal.setAttribute('aria-hidden', 'true');
    contactBtn.focus();
}

export default initializeContactForm