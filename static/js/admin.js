// Função para atualizar uma seção específica do conteúdo
async function updateContent(section, newContent) {
    try {
        // Obter o token de autenticação
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
            throw new Error('Usuário não autenticado');
        }

        const response = await fetch('/.netlify/functions/update-content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`
            },
            body: JSON.stringify({
                section: section,
                content: newContent
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Falha ao atualizar conteúdo');
        }

        const result = await response.json();
        console.log('Conteúdo atualizado com sucesso:', result);
        return result;
    } catch (error) {
        console.error('Erro ao atualizar conteúdo:', error);
        throw error;
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
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
            throw new Error('Usuário não autenticado');
        }

        // Primeiro, buscar o conteúdo atual do footer
        const response = await fetch('/.netlify/functions/get-content', {
            headers: {
                'Authorization': `Bearer ${session.access_token}`
            }
        });

        if (!response.ok) {
            throw new Error('Falha ao buscar conteúdo atual');
        }

        const data = await response.json();
        const currentFooter = data.footer;

        // Atualizar apenas a seção de contato mantendo o resto do footer intacto
        const updatedFooter = {
            ...currentFooter,
            columns: {
                ...currentFooter.columns,
                contact: {
                    ...currentFooter.columns.contact,
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
        };

        await updateContent('footer', updatedFooter);
    } catch (error) {
        console.error('Erro ao atualizar informações de contato:', error);
        throw error;
    }
}

// 4. Atualizar links de redes sociais
async function updateSocialLinks(links) {
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
            throw new Error('Usuário não autenticado');
        }

        // Primeiro, buscar o conteúdo atual do footer
        const response = await fetch('/.netlify/functions/get-content', {
            headers: {
                'Authorization': `Bearer ${session.access_token}`
            }
        });

        if (!response.ok) {
            throw new Error('Falha ao buscar conteúdo atual');
        }

        const data = await response.json();
        const currentFooter = data.footer;

        // Atualizar apenas a seção social mantendo o resto do footer intacto
        const updatedFooter = {
            ...currentFooter,
            social: links
        };

        await updateContent('footer', updatedFooter);
    } catch (error) {
        console.error('Erro ao atualizar redes sociais:', error);
        throw error;
    }
}

// Função para atualizar seção de serviços
async function updateServicesSection(servicesData) {
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
            throw new Error('Usuário não autenticado');
        }

        const response = await fetch('/.netlify/functions/update-content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`
            },
            body: JSON.stringify({
                section: 'services',
                content: servicesData
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Falha ao atualizar seção de serviços');
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
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
            throw new Error('Usuário não autenticado');
        }

        const response = await fetch('/.netlify/functions/update-content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`
            },
            body: JSON.stringify({
                section: 'testimonials',
                content: testimonialsData
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Falha ao atualizar seção de depoimentos');
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