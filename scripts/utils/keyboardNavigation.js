import lightbox from "../utils/lightboxModal.js";

export function handleKeydown(event, medias) {
    if (event.key === "Escape") {
        lightbox.close();
    } else if (event.key === "ArrowRight") {
        lightbox.next(medias);
    } else if (event.key === "ArrowLeft") {
        lightbox.previous(medias);
    }
}

export function handleDropdownKeydown(event, dropdown) {
    if (event.key === "ArrowDown") {
        event.preventDefault();
        const nextOption = dropdown.options[dropdown.selectedIndex + 1];
        console.log('Next option; ', nextOption)
        if (nextOption) {
            dropdown.value = nextOption.value;
            dropdown.dispatchEvent(new Event('change'));
        }
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        const previousOption = dropdown.options[dropdown.selectedIndex - 1];
        console.log('Previous Option: ', previousOption)
        if (previousOption) {
            dropdown.value = previousOption.value;
            dropdown.dispatchEvent(new Event('change'));
        }
    }
}
