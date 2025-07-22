const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  const url = event.path || '/';
  const host = event.headers['host'] || '';

  // Não redireciona admin
  if (url.startsWith('/admin')) {
    return {
      statusCode: 404,
      body: 'Not found'
    };
  }

  // Busca parâmetro coming_soon
  const { data, error } = await supabase
    .from('site_parameters')
    .select('value')
    .eq('key', 'coming_soon')
    .single();

  if (error) {
    return {
      statusCode: 500,
      body: 'Erro ao consultar modo coming soon.'
    };
  }

  const isComingSoon = data && data.value === 'true';
  const isMainDomain = host === 'institutoselavie.com.br' || host === 'www.institutoselavie.com.br';

  let filePath = 'index.html'; // padrão

  if (isMainDomain && isComingSoon) {
    filePath = 'coming-soon.html';
  }

  // Se for Netlify preview, sempre mostra o site normal
  if (isPreviewEnv(host)) {
    filePath = 'index.html';
  }

  const absPath = path.join(__dirname, '../../', filePath);

  try {
    const html = fs.readFileSync(absPath, 'utf8');
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: html
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: 'Erro ao servir página.'
    };
  }
};

function isPreviewEnv(host) {
  return ['institutoselavie.netlify.app','localhost','127.0.0.1'].some(domain => host.includes(domain));
}