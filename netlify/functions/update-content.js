const { createClient } = require('@supabase/supabase-js');

// Inicializa o cliente do Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  // Apenas aceita método POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { section, content } = JSON.parse(event.body);

    if (!section || !content) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Section and content are required' })
      };
    }

    // Primeiro, busca o conteúdo atual
    const { data: currentData, error: fetchError } = await supabase
      .from('site_content')
      .select(section)
      .eq('id', 1)
      .single();

    if (fetchError) throw fetchError;

    // Mescla o novo conteúdo com o existente
    const updatedContent = {
      [section]: {
        ...currentData[section],
        ...content
      }
    };

    // Atualiza apenas a seção específica
    const { data: updatedData, error: updateError } = await supabase
      .from('site_content')
      .update(updatedContent)
      .eq('id', 1)
      .select()
      .single();

    if (updateError) throw updateError;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: 'Content updated successfully',
        data: updatedData[section]
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to update content',
        details: error.message 
      })
    };
  }
}; 