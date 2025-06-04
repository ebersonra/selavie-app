// Carregar conteúdo atual
async function loadCurrentContent() {
    try {
        // Aguardar a inicialização do Supabase se necessário
        if (typeof window.waitForSupabase === 'function') {
            await window.waitForSupabase();
        }

        // Verificar se o cliente está inicializado e autenticado
        if (!supabaseClient) {
            console.error('Supabase client not initialized');
            return;
        }

        // Verificar sessão
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
            window.location.href = '/login.html';
            return;
        }

        // Buscar a última versão do conteúdo
        const { data, error } = await supabaseClient
            .from('site_content')
            .select('*')
            .order('version', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            throw error;
        }

        if (!data) {
            throw new Error('Nenhum conteúdo encontrado');
        }

        // Preencher Hero
        document.getElementById('heroTitle').value = data.hero.title;
        document.getElementById('heroSubtitle').value = data.hero.subtitle;
        document.getElementById('heroDescription').value = data.hero.description;
        document.getElementById('heroButton').value = data.hero.ctaButton;

        // Preencher About
        document.getElementById('aboutTitle').value = data.about.title;
        document.getElementById('aboutParagraph1').value = data.about.paragraph1;
        document.getElementById('aboutParagraph2').value = data.about.paragraph2;

        // Preencher Serviços
        document.getElementById('servicesTitle').value = data.services.title;
        document.getElementById('servicesDescription').value = data.services.description;
        
        // Preencher os itens de serviço
        data.services.items.forEach((service, index) => {
            document.getElementById(`serviceTitle${index}`).value = service.title;
            document.getElementById(`serviceDescription${index}`).value = service.description;
            document.getElementById(`serviceLink${index}`).value = service.link;
        });

        // Preencher Depoimentos
        document.getElementById('testimonialsTitle').value = data.testimonials.title;
        document.getElementById('testimonialsDescription').value = data.testimonials.description;
        
        // Preencher os itens de depoimento
        data.testimonials.items.forEach((testimonial, index) => {
            document.getElementById(`testimonialText${index}`).value = testimonial.text;
            document.getElementById(`testimonialAuthor${index}`).value = testimonial.author;
            document.getElementById(`testimonialRole${index}`).value = testimonial.role;
        });

        // Preencher Contato
        const contactSection = data.footer.columns.contact;
        if (contactSection) {
            document.getElementById('contactTitle').value = contactSection.title;
            contactSection.items.forEach(item => {
                if (item.icon === 'fa-map-marker-alt') {
                    document.getElementById('contactAddress').value = item.text;
                    document.getElementById('contactAddressIcon').value = item.icon;
                } else if (item.icon === 'fa-phone') {
                    document.getElementById('contactPhone').value = item.text;
                    document.getElementById('contactPhoneIcon').value = item.icon;
                } else if (item.icon === 'fa-envelope') {
                    document.getElementById('contactEmail').value = item.text;
                    document.getElementById('contactEmailIcon').value = item.icon;
                } else if (item.icon === 'fa-clock') {
                    document.getElementById('contactHours').value = item.text;
                    document.getElementById('contactHoursIcon').value = item.icon;
                }
            });
        }

        // Preencher Redes Sociais
        const social = data.footer.social;
        document.getElementById('socialFacebook').value = social.facebook;
        document.getElementById('socialInstagram').value = social.instagram;
        document.getElementById('socialYoutube').value = social.youtube;
        document.getElementById('socialLinkedin').value = social.linkedin;

    } catch (error) {
        console.error('Erro ao carregar conteúdo:', error);
        showSaveStatus(false, 'Erro ao carregar conteúdo');
        
        if (error.status === 401) {
            window.location.href = '/login.html';
        }
    }
}

// Função auxiliar para atualizar conteúdo
async function updateContent(section, newContent) {
    try {
        // Obter o token de autenticação
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
            throw new Error('Usuário não autenticado');
        }

        // Buscar o conteúdo atual mais recente
        const { data: currentData, error: fetchError } = await supabaseClient
            .from('site_content')
            .select('*')
            .order('version', { ascending: false })
            .limit(1)
            .single();

        if (fetchError) throw fetchError;

        // Preparar o conteúdo atualizado
        let newData = { ...currentData };
        delete newData.id; // Remove o id para que um novo seja gerado
        delete newData.created_at; // Remove created_at para que seja gerado um novo
        delete newData.updated_at; // Remove updated_at para que seja gerado um novo

        // Para outras seções, atualizar diretamente
        newData[section] = newContent;
        
        // Incrementar a versão
        newData.version = currentData.version + 1;

        // Inserir como um novo registro
        const { data: resp, error: insertError } = await supabaseClient
            .from('site_content')
            .insert([newData])
            .select();

        console.info("### Insert result :", resp)

        if (insertError) throw insertError;

        return { success: true };
    } catch (error) {
        console.error('Erro ao atualizar conteúdo:', error);
        throw error;
    }
}

// Salvar seção Hero
async function saveHeroSection() {
    try {
        await updateContent('hero', {
            title: document.getElementById('heroTitle').value,
            subtitle: document.getElementById('heroSubtitle').value,
            description: document.getElementById('heroDescription').value,
            ctaButton: document.getElementById('heroButton').value
        });
        showSaveStatus(true, 'Seção Hero atualizada com sucesso!');
    } catch (error) {
        showSaveStatus(false, 'Erro ao atualizar seção Hero');
    }
}

// Salvar seção Sobre
async function saveAboutSection() {
    try {
        await updateContent('about', {
            title: document.getElementById('aboutTitle').value,
            paragraph1: document.getElementById('aboutParagraph1').value,
            paragraph2: document.getElementById('aboutParagraph2').value
        });
        showSaveStatus(true, 'Seção Sobre atualizada com sucesso!');
    } catch (error) {
        showSaveStatus(false, 'Erro ao atualizar seção Sobre');
    }
}

// Salvar seção Serviços
async function saveServicesSection() {
    try {
        await updateContent('services', {
            title: document.getElementById('servicesTitle').value,
            description: document.getElementById('servicesDescription').value,
            items: [0, 1, 2].map(index => ({
                title: document.getElementById(`serviceTitle${index}`).value,
                description: document.getElementById(`serviceDescription${index}`).value,
                link: document.getElementById(`serviceLink${index}`).value
            }))
        });
        showSaveStatus(true, 'Seção Serviços atualizada com sucesso!');
    } catch (error) {
        showSaveStatus(false, 'Erro ao atualizar seção Serviços');
    }
}

// Salvar seção Depoimentos
async function saveTestimonialsSection() {
    try {
        await updateContent('testimonials', {
            title: document.getElementById('testimonialsTitle').value,
            description: document.getElementById('testimonialsDescription').value,
            items: [0, 1, 2].map(index => ({
                text: document.getElementById(`testimonialText${index}`).value,
                author: document.getElementById(`testimonialAuthor${index}`).value,
                role: document.getElementById(`testimonialRole${index}`).value
            }))
        });
        showSaveStatus(true, 'Seção Depoimentos atualizada com sucesso!');
    } catch (error) {
        showSaveStatus(false, 'Erro ao atualizar seção Depoimentos');
    }
}

// Salvar informações de contato
async function saveContactInfo() {
    try {
        const { data: currentData } = await supabaseClient
            .from('site_content')
            .select('footer')
            .order('version', { ascending: false })
            .limit(1)
            .single();

        if(!currentData || !currentData.footer){
            throw new Error('Não foi possivel obter o footer atual.')
        }

        const title = document.getElementById('contactTitle').value;
        const items = [
            {
                icon: document.getElementById('contactAddressIcon').value,
                text: document.getElementById('contactAddress').value,
                url: `https://maps.google.com/?q=${encodeURIComponent(document.getElementById('contactAddress').value)}`
            },
            {
                icon: document.getElementById('contactPhoneIcon').value,
                text: document.getElementById('contactPhone').value,
                url: `tel:${document.getElementById('contactPhone').value.replace(/\D/g, '')}`
            },
            {
                icon: document.getElementById('contactEmailIcon').value,
                text: document.getElementById('contactEmail').value,
                url: `mailto:${document.getElementById('contactEmail').value}`
            },
            {
                icon: document.getElementById('contactHoursIcon').value,
                text: document.getElementById('contactHours').value,
                url: "#horarios"
            }
        ];

        const updateFooter = {
            ...currentData.footer,
            columns: {
                ...currentData.footer.columns,
                contact: {
                    title,
                    items
                }
            }
        };

        console.info('#### updateFooter:', updateFooter);

        await updateContent('footer', updateFooter);
        showSaveStatus(true, 'Informações de contato atualizadas com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar contato:', error);
        showSaveStatus(false, 'Erro ao atualizar informações de contato');
    }
}

// Salvar links de redes sociais
async function saveSocialLinks() {
    try {
        const { data: currentData } = await supabaseClient
            .from('site_content')
            .select('footer')
            .order('version', { ascending: false })
            .limit(1)
            .single();
        
        if(!currentData || !currentData.footer){
            throw new Error('Não foi possivel obter o footer atual');
        }
        const updatedFooter = {
            ...currentData.footer,
            social: {
                facebook: document.getElementById('socialFacebook').value,
                instagram: document.getElementById('socialInstagram').value,
                youtube: document.getElementById('socialYoutube').value,
                linkedin: document.getElementById('socialLinkedin').value
            }
        };

        await updateContent('footer', updatedFooter);
        showSaveStatus(true, 'Redes sociais atualizadas com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar redes sociais:', error);
        showSaveStatus(false, 'Erro ao atualizar redes sociais');
    }
} 