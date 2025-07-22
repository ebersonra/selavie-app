const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

exports.handler = async (event) => {
  const host = event.headers['host'] || '';

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { data, error } = await supabase
      .from('site_parameters')
      .select('key, value');

    if (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Database error', details: error.message })
      };
    }

    // Monta objeto { key: value }
    const params = {};
    if (isPreviewEnv(host)) {
      data.forEach(row => {
        params[row.key] = 'false';
      });
    } else {
      data.forEach(row => {
        params[row.key] = row.value;
      });
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: JSON.stringify(params)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unexpected error', details: err.message })
    };
  }
};

function isPreviewEnv(host) {
  return ['institutoselavie.netlify.app','localhost','127.0.0.1'].some(domain => host.includes(domain));
}