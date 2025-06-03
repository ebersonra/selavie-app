const { createClient } = require('@supabase/supabase-js');

// Inicializa o cliente do Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  // Verificar se o método é GET
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Verificar autenticação
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized - No token provided' })
      };
    }

    const token = authHeader.split(' ')[1];
    
    // Verificar se o token é válido
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized - Invalid token' })
      };
    }

    // Buscar o conteúdo do site
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .order('version', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    if (!data) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Content not found' })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
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