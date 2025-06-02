function updatePageContent() {
    // Helper function to get nested object value from string path
    function getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }

    // Update all elements with data-content attribute
    document.querySelectorAll('[data-content]').forEach(element => {
        const contentPath = element.getAttribute('data-content');
        const content = getNestedValue(siteContent, contentPath);
        if (content) {
            element.textContent = content;
        }
    });

    // Add arrow to service links
    document.querySelectorAll('.service-link').forEach(link => {
        const span = document.createElement('span');
        span.innerHTML = ' &rarr;';
        link.appendChild(span);
    });
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', updatePageContent); 