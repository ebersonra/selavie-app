const { createClient } = require('@supabase/supabase-js');

// Inicializa o cliente do Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  // Apenas aceita método GET
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Busca todo o conteúdo do site
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) throw error;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        // Permitir CORS apenas para seu domínio em produção
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to fetch content',
        details: error.message 
      })
    };
  }
}; 