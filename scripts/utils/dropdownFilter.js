export function initializeDropdownFilter() {
    document.addEventListener('DOMContentLoaded', () => {
        const filterDropdown = document.getElementById('dropdownButton');
        const dropdownMenu = document.getElementById('dropdownMenu');
        const options = dropdownMenu.querySelectorAll('li');
    
        filterDropdown.addEventListener('click', function () {
            const isExpanded = filterDropdown.getAttribute('aria-expanded') === 'true';
            filterDropdown.setAttribute('aria-expanded', !isExpanded);
            dropdownMenu.style.display = !isExpanded ? 'block' : 'none';
        });
    
        options.forEach(option => {
            option.addEventListener('click', function () {
                filterDropdown.textContent = this.textContent;
                filterDropdown.setAttribute('aria-expanded', 'false');
                dropdownMenu.style.display = 'none';
            });
        });
    
        // Close dropdown if clicked outside
        document.addEventListener('click', function(event) {
            if (!filterDropdown.contains(event.target) && !dropdownMenu.contains(event.target)) {
                filterDropdown.setAttribute('aria-expanded', 'false');
                dropdownMenu.style.display = 'none';
            }
        });
    });
}