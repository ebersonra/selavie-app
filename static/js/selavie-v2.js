// JavaScript específico para index-v2.html

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');

    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Fechar todos os itens
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Abrir o item clicado se não estava ativo
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Fechar menu mobile após clique
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Animações ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    document.querySelectorAll('.service-card, .benefit-item, .faq-item, .booking-benefit, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Header transparente ao scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 52, 42, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--primary)';
                header.style.backdropFilter = 'none';
            }
        }
    });

    // Adicionar funcionalidade de hover nos cards de profissionais
    const professionalCards = document.querySelectorAll('.professional-card');
    professionalCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efeito de digitação no título principal
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle && heroTitle.textContent) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let index = 0;
        const typeWriter = () => {
            if (index < originalText.length) {
                heroTitle.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Iniciar o efeito após um pequeno delay
        setTimeout(typeWriter, 1000);
    }
});
