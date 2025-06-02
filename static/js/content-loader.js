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

    // Update WhatsApp button
    document.querySelectorAll('[data-whatsapp]').forEach(element => {
        const property = element.getAttribute('data-whatsapp');
        const value = siteContent.whatsapp[property];
        if (value) {
            if (property === 'url') {
                element.href = value;
            } else {
                element.textContent = value;
            }
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

    // Update contact information
    document.querySelectorAll('[data-contact]').forEach(element => {
        const contactPath = element.getAttribute('data-contact');
        const contactItems = getNestedValue(siteContent, contactPath);
        if (contactItems && Array.isArray(contactItems)) {
            element.innerHTML = contactItems.map(item => `
                <li>
                    <i class="fas ${item.icon}"></i>
                    <span class="contact-text">${item.text}</span>
                </li>
            `).join('');
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