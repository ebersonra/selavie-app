# Instituto Selavie - Website

[![Instituto Selavie Logo](img/logo-menu/LOGO-6.png)](https://institutoselavie.com.br)

## 📋 Sobre o Projeto

O website do Instituto Selavie é uma plataforma digital moderna e responsiva que oferece os serviços de psicoterapia para crianças, adolescentes e adultos. O site foi desenvolvido com foco em proporcionar uma experiência de usuário acolhedora e informativa.

## 📁 Estrutura do Projeto

```
selavie-app/
├── static/           # Arquivos estáticos
│   ├── js/          # Scripts JavaScript
│   └── css/         # Estilos CSS
├── netlify/          # Funções serverless do Netlify
├── db/              # Scripts e configurações do banco de dados
│   ├── v21/         # Migrações do banco de dados (versão 21)
│   ├── v17/         # Migrações do banco de dados (versão 17)
│   ├── v13/         # Migrações do banco de dados (versão 13)
│   └── init.sql     # Script de inicialização do banco
├── sql/             # Queries SQL adicionais
├── img/             # Imagens do site
├── fonts/           # Fontes utilizadas
├── index.html       # Página principal
├── admin.html       # Painel administrativo
├── login.html       # Página de login
├── netlify.toml     # Configuração do Netlify
├── package.json     # Dependências e scripts do Node.js
└── .gitignore      # Arquivos ignorados pelo Git
```

## 🌟 Características Principais

- Design moderno e responsivo
- Interface intuitiva e acolhedora
- Seções informativas sobre tratamentos
- Integração com WhatsApp para contato direto
- Depoimentos de pacientes
- Informações detalhadas sobre serviços oferecidos
- Sistema de gerenciamento de conteúdo dinâmico
- Painel administrativo para atualizações

## 🔧 Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Node.js
- Supabase (Banco de dados)
- Netlify (Hospedagem e funções serverless)
- Font Awesome (para ícones)
- Design responsivo

## 📝 Guia de Adição de Novos Componentes

### 1. Estrutura de Dados

O site utiliza uma estrutura de dados centralizada no arquivo `config.js` e no banco de dados Supabase. Para adicionar um novo componente, você precisa:

1. Definir a estrutura no objeto `siteContent`
2. Adicionar os elementos HTML correspondentes
3. Vincular os elementos usando atributos data-*

### 2. Tipos de Componentes Suportados

#### 2.1 Texto Simples
```html
<h1 data-content="hero.title">Título Padrão</h1>
<p data-content="about.paragraph1">Texto padrão</p>
```

#### 2.2 Links
```html
<a data-content="navigation.home" href="#">Início</a>
```

#### 2.3 Listas de Links
```html
<ul data-links="footer.columns.quickLinks.links">
    <!-- Links serão inseridos automaticamente -->
</ul>
```

#### 2.4 Informações de Contato
```html
<ul data-contact="footer.columns.contact.items">
    <!-- Itens de contato serão inseridos automaticamente -->
</ul>
```

#### 2.5 Links Sociais
```html
<a data-social="facebook" href="#">Facebook</a>
```

### 3. Processo de Adição de Novo Componente

#### 3.1 Passo 1: Definir a Estrutura de Dados
No arquivo `config.js`, adicione a nova estrutura:

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

#### 3.2 Passo 2: Adicionar o HTML
No arquivo HTML correspondente (index.html ou admin.html), adicione o elemento com o atributo data-* apropriado:

```html
<section class="novo-componente">
    <h2 data-content="novoComponente.titulo">Título Padrão</h2>
    <p data-content="novoComponente.descricao">Descrição padrão</p>
    <div class="items">
        <ul data-items="novoComponente.items">
            <!-- Items serão inseridos automaticamente -->
        </ul>
    </div>
</section>
```

#### 3.3 Passo 3: Adicionar Estilos
No arquivo CSS correspondente, adicione os estilos para o novo componente:

```css
.novo-componente {
    padding: 2rem;
}
```

### 4. Atributos Data-* Disponíveis

- `data-content`: Para texto simples
- `data-links`: Para listas de links
- `data-contact`: Para informações de contato
- `data-social`: Para links de redes sociais
- `data-whatsapp`: Para elementos relacionados ao WhatsApp

### 5. Boas Práticas

1. Sempre mantenha a estrutura de dados consistente
2. Use nomes descritivos para as chaves
3. Mantenha a hierarquia de dados organizada
4. Teste o componente em diferentes tamanhos de tela
5. Verifique se o conteúdo está sendo carregado corretamente

### 6. Troubleshooting

Se o conteúdo não aparecer:
1. Verifique se o atributo data-* está correto
2. Confirme se a estrutura no `config.js` está correta
3. Verifique o console do navegador para erros
4. Confirme se o caminho da estrutura de dados está correto

## 🚀 Como Executar o Projeto

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente no Netlify:
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_KEY

4. Para desenvolvimento local:
```bash
netlify dev
```

5. Para executar o projeto em produção:
```bash
npm run build
netlify deploy --prod
```

## 📞 Contato

- WhatsApp: (41) 99855-8987
- Email: contato@institutoselavie.com.br
- Atendimento: 24 horas

## 🤝 Contribuição

Para contribuir com melhorias:
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Todos os direitos reservados - Instituto Selavie © 2025

---

Desenvolvido com ❤️ para o Instituto Selavie 