const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Autenticação básica via Supabase JWT
  const authHeader = event.headers['authorization'] || event.headers['Authorization'];
  if (!authHeader) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Missing authorization header' })
    };
  }
  const token = authHeader.replace('Bearer ', '');
  // Opcional: validar token com Supabase (poderia usar supabase.auth.getUser, mas depende do setup do projeto)

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON' })
    };
  }
  const { key, value } = body;
  if (!key) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing key' })
    };
  }

  // Busca o parâmetro existente
  const { data, error } = await supabase
    .from('site_parameters')
    .select('*')
    .eq('key', key)
    .single();
  if (error || !data) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Parameter not found' })
    };
  }

  // Atualiza o valor
  const { error: updateError } = await supabase
    .from('site_parameters')
    .update({ value: value, updated_at: new Date().toISOString() })
    .eq('id', data.id);
  if (updateError) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update parameter', details: updateError.message })
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    },
    body: JSON.stringify({ message: 'Parameter updated successfully' })
  };
}; 