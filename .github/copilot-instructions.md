# Instituto Selavie - AI Coding Agent Instructions

## Architecture Overview
This is a **psychology landing page** with dynamic content management via Supabase. The architecture uses:
- **Static Frontend**: Vanilla JS with data-attribute binding pattern
- **Serverless Backend**: Netlify Functions + Supabase PostgreSQL
- **Content System**: JSONB sections with versioning
- **Admin Panel**: Bootstrap-based CMS with real-time updates

## Data-Attribute Content Binding Pattern
The core pattern binds HTML elements to Supabase data via `data-*` attributes:

```html
<!-- Static HTML with data bindings -->
<h1 data-content="hero.title">Fallback Title</h1>
<a data-href="navigation.home.url" data-content="navigation.home.text">Home</a>
<div data-contact="footer.columns.contact.items"></div>
```

```javascript
// content-loader.js automatically populates from nested paths
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current && current[key], obj);
}
```

**Key Data Attributes:**
- `data-content`: Simple text content from nested JSON paths
- `data-href`: Dynamic URLs
- `data-links`: Auto-generates `<li><a>` lists from arrays
- `data-contact`: Contact info with icons
- `data-social`: Social media links
- `data-whatsapp`: WhatsApp integration

## Database Schema (Supabase)
```sql
-- Main content table with JSONB sections
create table site_content (
  id uuid primary key,
  version integer not null,
  meta jsonb, hero jsonb, pain jsonb, about jsonb, 
  services jsonb, testimonials jsonb, footer jsonb,
  navigation jsonb, emdr jsonb, tcc jsonb,
  created_at timestamptz, updated_at timestamptz
);

-- Global site parameters
create table site_parameters (
  key text primary key,
  value text,
  description text
);
```

## Content Update Flow
1. **Admin Panel** (`admin.html`) → calls `update-content.js`
2. **Serverless Function** merges content into specific JSONB section
3. **Frontend** fetches via `get-content.js` → `content-loader.js` applies to DOM
4. **Version History** maintained automatically

```javascript
// Admin content update pattern
async function updateContent(section, newContent) {
  const response = await fetch('/.netlify/functions/update-content', {
    method: 'POST',
    body: JSON.stringify({ section, content: newContent })
  });
}
```

## Coming Soon Mode
Controlled via `site_parameters.coming_soon = 'true'`:
- **Production domain**: Shows `coming-soon.html` 
- **Preview domains**: Always shows full site
- **Admin toggle**: Real-time switch in admin panel

## Development Workflow
```bash
# Local development with Netlify Functions
netlify dev  # Port 8888

# Required environment variables
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...
```

## File Structure Patterns
- `static/js/config.js`: Fallback content structure (mirrors database)
- `static/js/content-loader.js`: Data-attribute binding engine
- `static/js/admin-content.js`: Admin form handlers
- `netlify/functions/`: API endpoints for content management
- `db/`: SQL migrations and version history

## Key Implementation Notes
- **No frameworks**: Pure vanilla JS for performance
- **JSONB sections**: Each page section is a separate JSONB column
- **Merge updates**: Updates merge with existing content, don't replace
- **Version control**: Every content change creates new version record
- **Auth**: Admin uses Supabase JWT via Authorization header
- **Testing**: Jest tests for serverless functions in `__tests__/`

## Common Development Tasks
- **Add new section**: Update `config.js` structure → add HTML with `data-*` → create admin form
- **Modify content**: Use admin panel at `/admin` or directly update via API
- **Deploy**: Push to main branch for auto-deploy via Netlify
- **Test functions**: `npm test` runs Jest tests for serverless functions
