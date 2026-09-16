// Configuración y cliente global de Supabase
const SUPABASE_URL = 'https://inbomjflxjxgnkryhunp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Or2ZpQ4iYqJTUoe7WnpuDg_q-KU7B8N'; // Tu llave secreta aquí

// Función segura para obtener el cliente de Supabase
function getSupabase() {
    if (window.supabase && window.supabase.createClient) {
        return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    console.error("La librería de Supabase aún no se ha cargado.");
    return null;
}