-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Enable moddatetime extension
create extension if not exists moddatetime;

-- Configurar timezone para Brasil
SET timezone = 'America/Sao_Paulo';

-- Create site_content table
create table site_content (
  id uuid primary key default uuid_generate_v4(),
  version integer not null,
  meta jsonb not null,
  hero jsonb not null,
  pain jsonb not null,
  about jsonb not null,
  services jsonb not null,
  testimonials jsonb not null,
  footer jsonb not null,
  navigation jsonb not null,
  emdr jsonb not null,
  tcc jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create trigger for updated_at
create trigger handle_updated_at before update on site_content
  for each row execute procedure moddatetime (updated_at);

-- Insert initial data
insert into site_content (
  version,
  meta,
  hero,
  pain,
  about,
  services,
  testimonials,
  footer,
  navigation,
  emdr,
  tcc
) values (
  1,
  -- Meta
  '{
    "title": "Instituto Sélavie - Psicologia e Saúde Mental",
    "description": "Atendimento psicológico especializado em EMDR e TCC para ansiedade, depressão e traumas. Agende sua consulta online ou presencial.",
    "keywords": "psicologia, saúde mental, EMDR, TCC, ansiedade, depressão, trauma, terapia online, psicólogo"
  }'::jsonb,

  -- Hero
  '{
    "title": "Tratamento Humanizado para Dependência Química",
    "description": "O Instituto Sélavie oferece tratamentos personalizados em ambiente acolhedor, com equipe multidisciplinar especializada para recuperação efetiva e sustentável.",
    "ctaButton": "Iniciar recuperação agora"
  }'::jsonb,

  -- Pain
  '{
    "title": "DOR & IDENTIFICAÇÃO",
    "subtitle": "Identificamos e tratamos suas dores emocionais",
    "container1": {
      "title": "Trauma (Bruna)",
      "cta": {
        "text": "Agende uma consulta com Bruna",
        "link": "https://api.whatsapp.com/send?phone=5541999999999&text=Olá,%20gostaria%20de%20agendar%20uma%20consulta%20com%20Bruna"
      },
      "cards": [
        {
          "title": "Desconfiança constante",
          "description": "Você quer se abrir, mas a voz interna insiste: \"E se me ferirem de novo?\"",
          "icon": "fa-brain"
        },
        {
          "title": "Alerta permanente",
          "description": "Corpo tenso, sono leve, sustos por qualquer barulho, como se o perigo estivesse sempre na porta.",
          "icon": "fa-heart"
        },
        {
          "title": "Explosões ou bloqueios",
          "description": "Raiva que irrompe sem aviso ou congelamento que trava palavras e decisões importantes.",
          "icon": "fa-balance-scale"
        },
        {
          "title": "Memórias intrusivas",
          "description": "Imagens e sensações do passado que invadem sua mente sem aviso, trazendo dor e desconforto.",
          "icon": "fa-bolt"
        },
        {
          "title": "Isolamento",
          "description": "A sensação de que ninguém entende o que você passou, levando ao afastamento das pessoas.",
          "icon": "fa-moon"
        }
      ]
    },
    "container2": {
      "title": "Mente acelerada (Gabriela)",
      "cta": {
        "text": "Agende uma consulta com Gabriela",
        "link": "https://api.whatsapp.com/send?phone=5541999999999&text=Olá,%20gostaria%20de%20agendar%20uma%20consulta%20com%20Gabriela"
      },
      "cards": [
        {
          "title": "Pensamentos acelerados",
          "description": "Sua mente não para, pulando de um assunto para outro, dificultando o foco e a concentração.",
          "icon": "fa-comments"
        },
        {
          "title": "Preocupação excessiva",
          "description": "Preocupações constantes com o futuro, criando cenários negativos e aumentando a ansiedade.",
          "icon": "fa-users"
        },
        {
          "title": "Dificuldade de relaxar",
          "description": "Mesmo em momentos de descanso, seu corpo e mente permanecem tensos e alertas.",
          "icon": "fa-lightbulb"
        }
      ]
    }
  }'::jsonb,

  -- About
  '{
    "title": "Quem Somos",
    "paragraph1": "Fundado com o propósito de oferecer tratamento humanizado e eficaz para dependência química, o Instituto Sélavie integra métodos terapêuticos comprovados com acolhimento personalizado.",
    "paragraph2": "Nossa abordagem multidisciplinar combina psicoterapia, terapia ocupacional, acompanhamento médico e nutricional, práticas integrativas e suporte familiar, visando a recuperação integral do paciente.",
    "link": "Conheça nossa história"
  }'::jsonb,

  -- Services
  '{
    "title": "Nossos Tratamentos",
    "description": "Desenvolvemos programas terapêuticos personalizados para cada paciente, considerando suas necessidades específicas e contexto individual.",
    "items": [
      {
        "title": "Internação Voluntária",
        "description": "Tratamento intensivo em ambiente acolhedor e seguro, com equipe presente 24 horas para suporte completo durante a recuperação.",
        "link": "Saiba mais"
      },
      {
        "title": "Atendimento Ambulatorial",
        "description": "Acompanhamento terapêutico sem internação, ideal para quem precisa manter suas atividades diárias durante o tratamento.",
        "link": "Saiba mais"
      }
    ]
  }'::jsonb,

  -- CTA
  '{
    "title": "Transforme sua vida hoje mesmo",
    "description": "Não espere mais para iniciar sua jornada de recuperação. Entre em contato agora e converse com nossa equipe especializada sobre as melhores opções de tratamento.",
    "mainButton": "Fale conosco no WhatsApp",
    "secondaryButton": "Conheça nossos planos"
  }'::jsonb,

  -- Testimonials
  '{
    "title": "Depoimentos",
    "description": "Histórias reais de transformação e superação de pessoas que passaram pelo Instituto Sélavie.",
    "items": [
      {
        "text": "O tratamento no Instituto Sélavie mudou completamente minha vida. A equipe é extremamente preparada e acolhedora. Hoje estou há 2 anos sem recaídas e reconquistei minha família e meu emprego.",
        "author": "Carlos M.",
        "role": "Paciente recuperado"
      },
      {
        "text": "Como mãe, vi meu filho renascer após o tratamento. O suporte que recebemos durante todo o processo foi fundamental não só para ele, mas para toda a família aprender a lidar com a situação.",
        "author": "Márcia P.",
        "role": "Familiar de paciente"
      },
      {
        "text": "O diferencial do Sélavie é o tratamento humanizado. Não me senti apenas mais um paciente, mas alguém que realmente importava. As terapias são personalizadas e isso faz toda diferença na recuperação.",
        "author": "Roberto S.",
        "role": "Paciente recuperado"
      }
    ]
  }'::jsonb,

  -- Footer
  '{
    "copyright": "© 2025 Instituto Sélavie. Todos os direitos reservados.",
    "about": {
      "description": "O Instituto Sélavie é especializado no tratamento humanizado de dependência química, oferecendo suporte completo para recuperação efetiva e sustentável."
    },
    "columns": {
      "quickLinks": {
        "title": "Links Rápidos",
        "links": [
          { "text": "Página Inicial", "url": "#" },
          { "text": "Sobre Nós", "url": "#about" },
          { "text": "Nossos Tratamentos", "url": "#services" },
          { "text": "Equipe", "url": "#" },
          { "text": "Blog", "url": "#" },
          { "text": "Contato", "url": "#contact" }
        ]
      },
      "treatments": {
        "title": "Tratamentos",
        "links": [
          { "text": "Internação Voluntária", "url": "#" },
          { "text": "Atendimento Ambulatorial", "url": "#" },
          { "text": "Acompanhamento Familiar", "url": "#" },
          { "text": "Terapias Integrativas", "url": "#" },
          { "text": "Prevenção de Recaídas", "url": "#" }
        ]
      },
      "contact": {
        "title": "Contato",
        "items": [
          {
            "icon": "fa-map-marker-alt",
            "text": "Av. Principal, 123 - São Paulo, SP",
            "url": "https://maps.google.com/?q=Av. Principal, 123 - São Paulo, SP"
          },
          {
            "icon": "fa-phone",
            "text": "(11) 99999-9999",
            "url": "tel:+5511999999999"
          },
          {
            "icon": "fa-envelope",
            "text": "contato@institutoselavie.com.br",
            "url": "mailto:contato@institutoselavie.com.br"
          },
          {
            "icon": "fa-clock",
            "text": "Atendimento 24 horas",
            "url": "#horarios"
          }
        ]
      }
    },
    "social": {
      "facebook": "#",
      "instagram": "https://www.instagram.com/institutoselavie/",
      "youtube": "#",
      "linkedin": "#"
    }
  }'::jsonb,

  -- EMDR
  '{
    "title": "EMDR - Terapia de Reprocessamento",
    "description": "A Terapia EMDR (Eye Movement Desensitization and Reprocessing) é uma abordagem terapêutica eficaz para o tratamento de traumas e transtornos de ansiedade. Através de movimentos oculares bilaterais, ajudamos seu cérebro a processar memórias traumáticas de forma natural e eficiente.",
    "cards": [
      {
        "title": "Reprocessamento Cerebral",
        "description": "Estimulação bilateral que ajuda o cérebro a processar memórias traumáticas de forma natural e eficiente."
      },
      {
        "title": "Alívio Emocional",
        "description": "Redução significativa do impacto emocional negativo associado a experiências traumáticas."
      },
      {
        "title": "Resultados Comprovados",
        "description": "Método reconhecido pela OMS e eficaz no tratamento de TEPT e outros transtornos de ansiedade."
      }
    ],
    "cta": {
      "text": "Agende uma sessão de EMDR",
      "url": "https://api.whatsapp.com/send?phone=5541999999999&text=Olá,%20gostaria%20de%20agendar%20uma%20sessão%20de%20EMDR"
    }
  }'::jsonb
); 