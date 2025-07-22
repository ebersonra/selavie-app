// Fetch content from database
async function fetchContent() {
    try {
        const response = await fetch('/.netlify/functions/get-content');

        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        Object.assign(siteContent, data);
        updatePageContent();
    } catch (error) {
        console.error('Error fetching content:', error);
        // Use fallback content from config.js if fetch fails
        updatePageContent();
    }
}

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

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

    // Update navigation links
    document.querySelectorAll('[data-href]').forEach(element => {
        const hrefPath = element.getAttribute('data-href');
        const href = getNestedValue(siteContent, hrefPath);
        if (href) {
            element.href = href;
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

// Novo: Checa o modo coming soon antes de buscar conteúdo
async function checkComingSoonAndFetchContent() {
    try {
        const response = await fetch('/.netlify/functions/get-site-parameters');
        if (!response.ok) {
            throw new Error('Erro ao buscar parâmetros do site');
        }
        const params = await response.json();
        if (params && params.coming_soon === 'true') {
            window.location.href = '/coming-soon.html';
            return;
        }
        fetchContent();
    } catch (err) {
        console.error('Erro ao consultar parâmetros globais:', err);
        fetchContent();
    }
}

// Substitua o evento DOMContentLoaded:
document.addEventListener('DOMContentLoaded', checkComingSoonAndFetchContent); 