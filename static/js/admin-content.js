// Carregar conteúdo atual
async function loadCurrentContent() {
    try {
        // Verificar se o cliente está inicializado e autenticado
        if (!supabaseClient) {
            throw new Error('Supabase client not initialized');
        }

        // Verificar sessão
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (!session) {
            window.location.href = '/login.html';
            return;
        }

        // Fazer a requisição com o token de autenticação
        const response = await fetch('/.netlify/functions/get-content', {
            headers: {
                'Authorization': `Bearer ${session.access_token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Preencher Hero
        document.getElementById('heroTitle').value = data.hero.title;
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
            // Preencher título da seção
            document.getElementById('contactTitle').value = contactSection.title;

            contactSection.items.forEach((item, index) => {
                if (item.icon === 'fa-map-marker-alt') {
                    document.getElementById(`contactAddress`).value = item.text;
                    document.getElementById(`contactAddressIcon`).value = item.icon;
                } else if (item.icon === 'fa-phone') {
                    document.getElementById(`contactPhone`).value = item.text;
                    document.getElementById(`contactPhoneIcon`).value = item.icon;
                } else if (item.icon === 'fa-envelope') {
                    document.getElementById(`contactEmail`).value = item.text;
                    document.getElementById(`contactEmailIcon`).value = item.icon;
                } else if (item.icon === 'fa-clock') {
                    document.getElementById(`contactHours`).value = item.text;
                    document.getElementById(`contactHoursIcon`).value = item.icon;
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