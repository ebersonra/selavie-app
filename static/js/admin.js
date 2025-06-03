// Função para atualizar uma seção específica do conteúdo
async function updateContent(section, newContent) {
    try {
        const response = await fetch('/.netlify/functions/update-content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                section: section,
                content: newContent
            })
        });

        if (!response.ok) {
            throw new Error('Falha ao atualizar conteúdo');
        }

        const result = await response.json();
        console.log('Conteúdo atualizado com sucesso:', result);
        
        // Atualiza a página com o novo conteúdo
        updatePageContent();
    } catch (error) {
        console.error('Erro ao atualizar conteúdo:', error);
    }
}

// Exemplos de uso:

// 1. Atualizar título da hero
async function updateHeroTitle(newTitle) {
    await updateContent('hero', {
        title: newTitle
    });
}

// 2. Atualizar um depoimento específico
async function updateTestimonial(index, newTestimonial) {
    const testimonials = await getCurrentContent('testimonials');
    testimonials.items[index] = newTestimonial;
    await updateContent('testimonials', testimonials);
}

// 3. Atualizar informações de contato
async function updateContactInfo(newAddress, newPhone, newEmail) {
    await updateContent('footer', {
        columns: {
            contact: {
                items: [
                    {
                        icon: "fa-map-marker-alt",
                        text: newAddress,
                        url: `https://maps.google.com/?q=${encodeURIComponent(newAddress)}`
                    },
                    {
                        icon: "fa-phone",
                        text: newPhone,
                        url: `tel:${newPhone.replace(/\D/g, '')}`
                    },
                    {
                        icon: "fa-envelope",
                        text: newEmail,
                        url: `mailto:${newEmail}`
                    }
                ]
            }
        }
    });
}

// 4. Atualizar links de redes sociais
async function updateSocialLinks(links) {
    await updateContent('footer', {
        social: links
    });
}

// Função para atualizar seção de serviços
async function updateServicesSection(servicesData) {
    try {
        const response = await fetch('/.netlify/functions/update-content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${(await supabaseClient.auth.getSession()).data.session.access_token}`
            },
            body: JSON.stringify({
                section: 'services',
                content: servicesData
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update services section');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating services:', error);
        throw error;
    }
}

// Função para atualizar seção de depoimentos
async function updateTestimonialsSection(testimonialsData) {
    try {
        const response = await fetch('/.netlify/functions/update-content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${(await supabaseClient.auth.getSession()).data.session.access_token}`
            },
            body: JSON.stringify({
                section: 'testimonials',
                content: testimonialsData
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update testimonials section');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating testimonials:', error);
        throw error;
    }
}

// Exemplo de uso:
/*
updateHeroTitle("Novo título da Hero Section");

updateTestimonial(0, {
    text: "Novo depoimento aqui",
    author: "João S.",
    role: "Paciente recuperado"
});

updateContactInfo(
    "Nova Av. Principal, 456 - São Paulo, SP",
    "(11) 98765-4321",
    "novo@institutoselavie.com.br"
);

updateSocialLinks({
    facebook: "https://facebook.com/institutoselavie",
    instagram: "https://instagram.com/institutoselavie",
    youtube: "https://youtube.com/institutoselavie",
    linkedin: "https://linkedin.com/company/institutoselavie"
});
*/ 