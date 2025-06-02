exports.handler = async function() {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY
        })
    };
}; 