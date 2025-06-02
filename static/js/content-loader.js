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

    // Update footer links
    document.querySelectorAll('[data-links]').forEach(element => {
        const linksPath = element.getAttribute('data-links');
        const links = getNestedValue(siteContent, linksPath);
        if (links && Array.isArray(links)) {
            element.innerHTML = links.map(link => 
                `<li><a href="${link.url}">${link.text}</a></li>`
            ).join('');
        }
    });

    // Update social media links
    document.querySelectorAll('[data-social]').forEach(element => {
        const socialNetwork = element.getAttribute('data-social');
        const url = siteContent.footer.social[socialNetwork];
        if (url) {
            element.href = url;
        }
    });

    // Add arrow to service links
    document.querySelectorAll('.service-link').forEach(link => {
        if (!link.querySelector('span')) {
            const span = document.createElement('span');
            span.innerHTML = ' &rarr;';
            link.appendChild(span);
        }
    });
}

// Call the function when the DOM is loaded
document.addEventListener('DOMContentLoaded', updatePageContent); 