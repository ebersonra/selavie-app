# Instituto Selavie - Website

[![Instituto Selavie Logo](img/logo-menu/LOGO-6.png)](https://institutoselavie.com.br)

## 📋 Sobre o Projeto

O website do Instituto Selavie é uma landing page profissional e altamente persuasiva para a venda de serviços de psicoterapia online e presencial. O site oferece atendimento psicológico especializado em **EMDR (Eye Movement Desensitization and Reprocessing)** e **TCC (Terapia Cognitivo-Comportamental)** para adultos que lidam com ansiedade, depressão, traumas e pensamentos acelerados.

### Diferencial do Projeto
- **Atendimento Online**: Para qualquer lugar do mundo
- **Atendimento Presencial**: Curitiba-PR (Edifício Attività)
- **Profissionais Especializadas**: Bruna (EMDR) e Gabriela (TCC)
- **Abordagem Científica**: Métodos baseados em evidências
- **Experiência Personalizada**: 50 minutos de sessão com acolhimento genuíno

## 📁 Estrutura do Projeto

```
selavie-app/
├── 📄 index.html           # Página principal do site
├── 📄 admin.html           # Painel administrativo completo
├── 📄 login.html           # Página de autenticação
├── 📄 coming-soon.html     # Página de "em breve" (modo manutenção)
├── 📄 netlify.toml         # Configuração de deploy e redirects
├── 📄 package.json         # Dependências e scripts do projeto
├── 📄 README.md            # Documentação do projeto
├── static/                 # Arquivos estáticos
│   ├── css/               # Estilos CSS
│   │   ├── style-selavie.css      # CSS principal do site
│   │   ├── style-selavie-v2.css   # CSS versão alternativa
│   │   └── admin.css              # CSS do painel admin
│   └── js/                # Scripts JavaScript
│       ├── config.js              # Configuração de conteúdo padrão
│       ├── content-loader.js      # Carregador dinâmico de conteúdo
│       ├── admin.js               # Lógica do painel administrativo
│       ├── admin-auth.js          # Sistema de autenticação
│       └── admin-content.js       # Gerenciamento de conteúdo admin
├── netlify/               # Funções serverless
│   └── functions/
│       ├── get-content.js         # API para buscar conteúdo
│       ├── update-content.js      # API para atualizar conteúdo
│       ├── get-site-parameters.js # API para parâmetros globais
│       ├── update-site-parameters.js # API para atualizar parâmetros
│       ├── get-supabase-config.js # Configuração do Supabase
│       ├── serve-site.js          # Servidor de páginas dinâmico
│       └── __tests__/             # Testes automatizados
│           ├── get-content.test.js
│           └── update-content.test.js
├── db/                    # Scripts de banco de dados
│   ├── init.sql                   # Script de inicialização
│   ├── v13/, v17/, v21/          # Versões de migração
│   └── [timestamps]/             # Atualizações incrementais
├── sql/                   # Queries SQL adicionais
│   └── admin_setup.sql            # Configuração administrativa
├── img/                   # Recursos visuais
│   ├── about/                     # Imagens da seção "sobre"
│   ├── hero/                      # Logo principal
│   ├── logo-menu/                 # Logo do menu
│   └── favicon/                   # Ícones do site
├── fonts/                 # Fontes personalizadas
│   ├── Arboria-Light.otf/.ttf    # Fonte Arboria
│   └── Edensor-Free.otf          # Fonte Edensor
└── docs/                  # Documentação
    └── prompt.md                  # Especificações de design
```

## 🌟 Características Principais

### 🎯 **Foco em Conversão**
- Landing page otimizada para alta taxa de conversão
- Design persuasivo e envolvente
- CTAs estrategicamente posicionados
- Urgência e exclusividade bem trabalhadas

### 🧠 **Especialidades Terapêuticas**
- **EMDR com Bruna**: Certificada EMDRIA, 800h em traumas complexos
- **TCC com Gabriela**: Especialista em TCC baseada em evidências
- Atendimento para ansiedade, depressão e traumas
- Sessões de 50 minutos com ciência e acolhimento

### 💻 **Tecnologia Avançada**
- **Sistema de Conteúdo Dinâmico**: Atualização em tempo real via painel admin
- **Modo Coming Soon**: Controle de visibilidade do site
- **Painel Administrativo Completo**: Gerenciamento de todas as seções
- **Integração Supabase**: Banco de dados robusto e escalável
- **Versionamento de Conteúdo**: Histórico completo de mudanças

### 🎨 **Design & UX/UI**
- Design responsivo para todos os dispositivos
- Animações sutis para engajamento
- Paleta de cores acolhedoras e profissionais
- Tipografia moderna e legível
- Interface intuitiva e acessível

### 🔧 **Funcionalidades Avançadas**
- **Integração WhatsApp**: Contato direto e agendamento
- **Sistema de Autenticação**: Acesso seguro ao painel admin
- **Deploys Automáticos**: Via Netlify com preview branches
- **Funções Serverless**: APIs escaláveis e eficientes
- **Testes Automatizados**: Cobertura de funções críticas

## 🔧 Tecnologias Utilizadas

### **Frontend**
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com animações sutis
- **JavaScript Vanilla**: Performance otimizada sem frameworks pesados
- **Design Responsivo**: Mobile-first approach

### **Backend & Infraestrutura**
- **Netlify**: Hospedagem e deploy contínuo
- **Netlify Functions**: Serverless computing
- **Supabase**: Banco de dados PostgreSQL gerenciado
- **Node.js**: Runtime para funções serverless

### **Banco de Dados**
- **PostgreSQL**: Via Supabase com extensões UUID e moddatetime
- **JSONB**: Armazenamento flexível de conteúdo estruturado
- **Versionamento**: Sistema de versões para controle de mudanças
- **Triggers**: Atualizações automáticas de timestamps

### **Bibliotecas & Dependências**
- **@supabase/supabase-js**: Cliente oficial do Supabase
- **Bootstrap 5**: Framework CSS para o painel admin
- **Font Awesome**: Biblioteca de ícones
- **Jest**: Framework de testes
- **FaunaDB**: Dependência legada (dev)

### **DevOps & Qualidade**
- **Git**: Controle de versão
- **GitHub Actions**: CI/CD (via branch feature/add-node-action)
- **Netlify CLI**: Desenvolvimento local
- **ESLint/Jest**: Qualidade e testes de código

### **Integrações Externas**
- **WhatsApp Business API**: Comunicação direta
- **Instagram**: Redes sociais
- **Google Maps**: Localização do consultório

## 🏗️ Arquitetura do Sistema

### **Fluxo de Dados**
```mermaid
graph TD
    A[Usuário] --> B[index.html]
    B --> C[content-loader.js]
    C --> D[/.netlify/functions/get-content]
    D --> E[Supabase Database]
    
    F[Admin] --> G[admin.html]
    G --> H[admin-auth.js]
    H --> I[admin-content.js]
    I --> J[/.netlify/functions/update-content]
    J --> E
    
    K[Deploy] --> L[serve-site.js]
    L --> M{Coming Soon?}
    M -->|Yes| N[coming-soon.html]
    M -->|No| B
```

### **Estrutura do Banco de Dados**

#### Tabela `site_content`
- **id**: UUID único para cada versão
- **version**: Número sequencial da versão
- **created_at/updated_at**: Timestamps automáticos
- **Seções JSONB**:
  - `meta`: Metadados SEO
  - `navigation`: Menu de navegação
  - `hero`: Seção principal
  - `pain`: Identificação de dores/problemas
  - `about`: Sobre as profissionais
  - `services`: Serviços oferecidos
  - `emdr`: Detalhes da terapia EMDR
  - `tcc`: Detalhes da terapia TCC
  - `testimonials`: Depoimentos de pacientes
  - `footer`: Rodapé e informações de contato

#### Tabela `site_parameters`
- **key**: Chave do parâmetro (ex: "coming_soon")
- **value**: Valor do parâmetro
- **description**: Descrição da funcionalidade

### **Sistema de Versionamento**
- Cada alteração gera uma nova versão
- Histórico completo mantido no banco
- Possibilidade de rollback para versões anteriores
- Interface administrativa para visualizar histórico

### **Modo Coming Soon**
- Controle via parâmetro global `coming_soon`
- Redirecionamento automático no domínio principal
- Preview sempre disponível em subdomínios Netlify
- Interface admin para toggle simples

## 📝 Guia de Desenvolvimento

### **Adicionando Novos Componentes**

#### 1. **Estrutura de Dados**
O site utiliza uma estrutura de dados centralizada no arquivo `config.js` e sincronizada com o banco Supabase. Para adicionar um novo componente:

1. **Definir no `config.js`**:
```javascript
const siteContent = {
    // ... estrutura existente ...
    novoComponente: {
        titulo: "Título do Novo Componente",
        descricao: "Descrição do novo componente",
        items: [
            {
                titulo: "Item 1",
                descricao: "Descrição do item 1"
            }
        ]
    }
};
```

2. **Adicionar HTML com data-attributes**:
```html
<section class="novo-componente">
    <h2 data-content="novoComponente.titulo">Título Padrão</h2>
    <p data-content="novoComponente.descricao">Descrição padrão</p>
    <div class="items" data-items="novoComponente.items">
        <!-- Items inseridos automaticamente -->
    </div>
</section>
```

3. **Estilizar no CSS**:
```css
.novo-componente {
    padding: 2rem;
    /* estilos do componente */
}
```

4. **Atualizar Painel Admin**:
- Adicionar nova aba no `admin.html`
- Criar campos de formulário correspondentes
- Implementar função de salvamento em `admin-content.js`

#### 2. **Atributos Data-* Disponíveis**
- `data-content`: Texto simples
- `data-links`: Listas de links
- `data-contact`: Informações de contato
- `data-social`: Links de redes sociais
- `data-whatsapp`: Elementos WhatsApp
- `data-href`: URLs dinâmicas

#### 3. **Fluxo de Atualização**
1. Admin atualiza via painel → `update-content.js`
2. Nova versão salva no Supabase
3. Frontend carrega via `get-content.js`
4. `content-loader.js` aplica mudanças no DOM

### **Desenvolvimento Local**

#### Configuração Inicial
```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente (Netlify)
# SUPABASE_URL=sua_url_supabase
# SUPABASE_ANON_KEY=sua_chave_anonima
# SUPABASE_SERVICE_KEY=sua_chave_servico

# Iniciar desenvolvimento
netlify dev
```

#### Estrutura de Comandos
```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm run deploy   # Deploy para produção
npm test         # Executa testes
```

### **Boas Práticas**

#### **Código**
- Manter estrutura de dados consistente
- Usar nomes descritivos para chaves
- Preservar hierarquia de dados organizada
- Testar em diferentes dispositivos

#### **Conteúdo**
- Textos concisos e persuasivos
- CTAs claros e orientados à ação
- Imagens otimizadas para web
- SEO-friendly em títulos e descrições

#### **Performance**
- Minimizar requests de API
- Otimizar imagens e recursos
- Usar cache apropriadamente
- Monitorar métricas de conversão

## 🚀 Deploy e Produção

### **Ambientes Disponíveis**

#### **Produção**
- **URL**: https://institutoselavie.com.br
- **Funcionalidades**: Site completo ou Coming Soon (conforme configuração)
- **Deploy**: Automático via push para branch `main`

#### **Preview/Staging**
- **URL**: https://institutoselavie.netlify.app
- **Funcionalidades**: Sempre mostra o site completo (ignora Coming Soon)
- **Deploy**: Automático via pull requests e branches

#### **Desenvolvimento Local**
```bash
netlify dev  # Roda local na porta 8888
```

### **Configuração de Variáveis de Ambiente**

No painel do Netlify, configure:
```env
SUPABASE_URL=https://sua-url.supabase.co
SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_KEY=sua_chave_servico
```

### **Processo de Deploy**

1. **Desenvolvimento**:
   ```bash
   git checkout -b feature/nova-funcionalidade
   # Desenvolver mudanças
   git commit -m "Adiciona nova funcionalidade"
   git push origin feature/nova-funcionalidade
   ```

2. **Review**:
   - Criar Pull Request
   - Netlify gera preview automático
   - Testar funcionalidades no preview

3. **Produção**:
   ```bash
   git checkout main
   git merge feature/nova-funcionalidade
   git push origin main
   # Deploy automático para produção
   ```

### **Controle de Modo Coming Soon**

Via painel administrativo:
1. Acesse `/admin`
2. Toggle "Modo Coming Soon"
3. Mudança é aplicada instantaneamente

### **Monitoramento e Logs**

- **Netlify Functions**: Logs automáticos de todas as funções
- **Supabase Dashboard**: Métricas de banco de dados
- **Error Tracking**: Console logs e error boundaries

## 🎨 Design e UX/UI

### **Paleta de Cores**
```css
:root {
  --primary: #0A342A;      /* Verde escuro (principais) */
  --secondary: #D4AF37;    /* Dourado (destaques) */
  --light: #ffffff;        /* Branco (backgrounds) */
  --dark: #333333;         /* Cinza escuro (textos) */
  --gray: #f8f9fa;         /* Cinza claro (seções) */
  --text: #CEC3AD;         /* Bege (textos secundários) */
}
```

### **Tipografia**
- **Fonte Principal**: Arboria Light (moderna e legível)
- **Fonte Decorativa**: Edensor Free (títulos especiais)
- **Hierarquia**: H1-H6 bem definida com responsive scaling

### **Componentes de UI**

#### **Botões CTA**
- **Primário**: Background dourado, hover com animação
- **Secundário**: Outline com hover fill
- **WhatsApp**: Verde WhatsApp com ícone

#### **Cards**
- **Design**: Sombra sutil, border-radius suave
- **Hover**: Elevação e slight scale transform
- **Ícones**: Font Awesome para consistência

#### **Layout Responsivo**
- **Mobile First**: Quebras em 768px, 992px, 1200px
- **Grid System**: CSS Grid e Flexbox
- **Menu Mobile**: Hamburger com overlay navigation

### **Animações e Micro-interações**
- **Scroll Animations**: Fade-in on viewport entry
- **Button Hovers**: Scale, color transitions
- **Loading States**: Progress bars e spinners
- **Smooth Scrolling**: Navegação suave entre seções

### **Acessibilidade**
- **Semântica HTML**: Headers, nav, main, sections apropriadas
- **Alt Text**: Todas as imagens com descrições
- **Contraste**: WCAG AA compliance
- **Focus States**: Keyboard navigation friendly

## 🧪 Testes e Qualidade

### **Testes Implementados**
- **Unit Tests**: Funções Netlify com Jest
- **API Tests**: Endpoints de conteúdo e parâmetros
- **Error Handling**: Cenários de falha e recuperação

### **Coverage Atual**
- `get-content.js`: ✅ 100%
- `update-content.js`: ✅ Parcial
- `serve-site.js`: ⚠️ Pendente
- `admin-auth.js`: ⚠️ Pendente

### **Executar Testes**
```bash
npm test                    # Todos os testes
npm test get-content       # Teste específico
npm test -- --coverage    # Com coverage report
```

### **Lint e Code Quality**
```bash
npm run lint              # Verificar código
npm run lint:fix          # Corrigir automaticamente
```

## 📊 Analytics e Métricas

### **Métricas de Conversão**
- **Taxa de Clique CTA**: Botões principais
- **Tempo na Página**: Engagement tracking
- **Bounce Rate**: Qualidade do tráfego
- **Form Abandonment**: Análise de formulários

### **Performance**
- **Core Web Vitals**: LCP, FID, CLS
- **Page Speed**: Lighthouse scores
- **Mobile Performance**: Specific mobile metrics

### **Ferramentas Recomendadas**
- **Google Analytics**: Tráfego e comportamento
- **Hotjar**: Heatmaps e session recordings
- **Google Search Console**: SEO performance
- **Netlify Analytics**: Core metrics

## 📞 Informações de Contato

### **Instituto Selavie**
- **📍 Endereço**: Edifício Attività - Av. Rep. Argentina, 1228, Sala 1606
  - Vila Izabel, Curitiba - PR, 80620-010
- **📱 WhatsApp**: (41) 9 9855-8987
- **📧 Email**: institutoselavie@gmail.com
- **🕒 Horário**: Segunda a Sexta • 8h às 20h

### **Redes Sociais**
- **Instagram**: [@institutoselavie](https://www.instagram.com/institutoselavie/)
- **WhatsApp**: [Contato Direto](https://bit.ly/43Cl99d)

### **Profissionais**
- **Bruna**: Especialista em EMDR, Certificada EMDRIA
- **Gabriela**: Especialista em TCC baseada em evidências

## 🤝 Contribuição e Desenvolvimento

### **Fluxo de Contribuição**
1. **Fork** o projeto
2. **Clone** seu fork localmente
3. **Crie** uma branch para sua feature:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
4. **Desenvolva** seguindo as boas práticas
5. **Teste** suas alterações localmente
6. **Commit** com mensagens descritivas:
   ```bash
   git commit -m "feat: adiciona nova seção de FAQ"
   ```
7. **Push** para sua branch:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
8. **Abra** um Pull Request detalhado

### **Padrões de Commit**
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Atualização de documentação
- `style:` Mudanças de formatação/estilo
- `refactor:` Refatoração de código
- `test:` Adição ou correção de testes
- `chore:` Tarefas de manutenção

### **Requisitos para PR**
- [ ] Código testado localmente
- [ ] Documentação atualizada (se necessário)
- [ ] Seguir padrões de código existentes
- [ ] Descrever o que foi alterado e por quê
- [ ] Screenshots/videos se alterações visuais

### **Revisão de Código**
- **Code Review**: Obrigatório antes do merge
- **Testing**: Verificação em ambiente de preview
- **Performance**: Análise de impacto na performance
- **Acessibilidade**: Verificação de padrões de a11y

## 📜 Histórico e Versioning

### **Sistema de Versionamento**
- **Banco de Dados**: Versões incrementais automáticas
- **Código**: Git tags para releases
- **Conteúdo**: Histórico completo via painel admin

### **Releases Principais**
- **v1.0**: Site inicial com estrutura básica
- **v13.0**: Implementação do sistema EMDR/TCC
- **v17.0**: Adição do painel administrativo
- **v21.0**: Sistema de Coming Soon e melhorias UX

### **Roadmap Futuro**
- [ ] **Sistema de Agendamento**: Integração com calendário
- [ ] **Blog/Artigos**: Seção de conteúdo educativo
- [ ] **Avaliações Online**: Formulários de triagem
- [ ] **Chat Bot**: Atendimento automatizado inicial
- [ ] **Multi-idioma**: Suporte para inglês/espanhol
- [ ] **PWA**: App web progressivo

## 🔐 Segurança e Privacidade

### **Medidas de Segurança**
- **HTTPS**: Certificado SSL automático via Netlify
- **Environment Variables**: Chaves sensíveis protegidas
- **API Security**: Rate limiting e validação de inputs
- **Auth System**: Sistema de autenticação para admin

### **Privacidade**
- **LGPD Compliance**: Coleta mínima de dados
- **Cookie Policy**: Transparência sobre cookies
- **Data Protection**: Dados seguros no Supabase
- **User Consent**: Opt-in para comunicações

### **Backup e Recovery**
- **Database Backups**: Automático via Supabase
- **Code Repository**: GitHub como source of truth
- **Version Control**: Histórico completo de mudanças
- **Disaster Recovery**: Plano de recuperação documentado

## 📄 Licença e Direitos

**Todos os direitos reservados - Instituto Selavie © 2025**

- **Código**: Proprietário do Instituto Selavie
- **Conteúdo**: Material protegido por direitos autorais
- **Imagens**: Licenciadas para uso exclusivo
- **Marca**: Instituto Selavie® - Marca registrada

### **Permissões de Uso**
- ✅ Uso interno para desenvolvimento e manutenção
- ✅ Modificações para melhorias do projeto
- ❌ Redistribuição ou uso comercial externo
- ❌ Cópia de código para outros projetos

---

<div align="center">

**Desenvolvido com ❤️ para o Instituto Selavie**

*Transformando vidas através da psicoterapia especializada*

[🌐 Website](https://institutoselavie.com.br) • 
[📱 WhatsApp](https://bit.ly/43Cl99d) • 
[📷 Instagram](https://www.instagram.com/institutoselavie/)

</div> 