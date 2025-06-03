let supabaseClient;

// Inicializar cliente Supabase
async function initSupabase() {
    try {
        const response = await fetch('/.netlify/functions/get-supabase-config');
        if (!response.ok) {
            throw new Error('Failed to get Supabase configuration');
        }
        const { supabaseUrl, supabaseKey } = await response.json();
        
        // Criar o cliente Supabase usando o objeto global 'supabase'
        supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);
        
        return true;
    } catch (error) {
        console.error('Erro ao inicializar Supabase:', error);
        showSaveStatus(false, 'Erro ao inicializar sistema');
        return false;
    }
}

// Verificar autenticação
async function checkAuth() {
    if (!supabaseClient) {
        console.error('Supabase client not initialized');
        window.location.href = '/login.html';
        return false;
    }

    try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        if (error) throw error;
        
        if (!session) {
            window.location.href = '/login.html';
            return false;
        }
        
        // Mostrar email do usuário
        document.getElementById('userEmail').textContent = session.user.email;
        return true;
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        window.location.href = '/login.html';
        return false;
    }
}

// Função de logout
async function handleLogout() {
    try {
        if (!supabaseClient) throw new Error('Sistema não inicializado');
        await supabaseClient.auth.signOut();
        window.location.href = '/login.html';
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        showSaveStatus(false, 'Erro ao fazer logout');
    }
}

// Inicializar sistema e verificar autenticação
async function init() {
    const initialized = await initSupabase();
    if (!initialized) {
        showSaveStatus(false, 'Erro ao inicializar sistema');
        return;
    }

    const authenticated = await checkAuth();
    if (authenticated) {
        await loadCurrentContent();
    }
}

// Função para mostrar notificação de status
function showSaveStatus(success, message) {
    const statusDiv = document.getElementById('saveStatus');
    statusDiv.innerHTML = `
        <div class="alert alert-${success ? 'success' : 'danger'} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    setTimeout(() => {
        const alert = statusDiv.querySelector('.alert');
        if (alert) {
            alert.remove();
        }
    }, 3000);
}

// Iniciar quando a página carregar
window.addEventListener('DOMContentLoaded', init); 