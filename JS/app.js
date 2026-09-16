document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------------
    // 1. LÓGICA DE INICIO DE SESIÓN / BIENVENIDA (index.html)
    // -------------------------------------------------------------
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombreHogar = document.getElementById('nombreHogar').value.trim();
            if (nombreHogar) {
                // Guardar el nombre del hogar en el almacenamiento local
                localStorage.setItem('hogarActual', nombreHogar);
                // Redirigir a la vista de consumo
                window.location.href = 'pages/consumo.html';
            }
        });
    }

    // Mostrar el nombre del hogar si estamos en las páginas internas
    const saludoHogar = document.getElementById('saludoHogar');
    if (saludoHogar) {
        const hogar = localStorage.getItem('hogarActual') || 'Hogar';
        saludoHogar.textContent = `Bienvenido, ${hogar}`;
    }

    // -------------------------------------------------------------
    // 2. LÓGICA DE REGISTRO DE CONSUMOS (pages/consumo.html)
    // -------------------------------------------------------------
    const consumoForm = document.getElementById('consumoForm');
    if (consumoForm) {
        consumoForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const servicio = document.getElementById('servicio').value;
            const valor = parseFloat(document.getElementById('valor').value);
            const mes = document.getElementById('mes').value;
            const mensajeDiv = document.getElementById('mensajeEstado');

if (!servicio) {
    mensajeDiv.innerHTML = '<p style="color: red;">Por favor, selecciona un servicio.</p>';
    return;
}

if (isNaN(valor) || valor <= 0) {
    mensajeDiv.innerHTML = '<p style="color: red;">El valor del consumo debe ser mayor que 0.</p>';
    return;
}

if (!mes) {
    mensajeDiv.innerHTML = '<p style="color: red;">Por favor, selecciona un mes.</p>';
    return;
}

mensajeDiv.innerHTML = '<p style="color: blue;">Guardando registro...</p>';

            try {
                // Instanciar supabase localmente
                const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
                if (!db) throw new Error("No se pudo conectar a Supabase.");

                const { data, error } = await db
                    .from('consumos')
                    .insert([{ servicio, valor, mes }]);

                if (error) throw error;

                mensajeDiv.innerHTML = '<p style="color: green; font-weight: bold;">¡Consumo registrado y guardado con éxito en Supabase! 🎉</p>';
                consumoForm.reset();
            } catch (error) {
                console.error('Error al guardar:', error.message);
                mensajeDiv.innerHTML = `<p style="color: red;">Error al guardar: ${error.message}</p>`;
            }
        });
    }

    // -------------------------------------------------------------
    // 3. CONSULTAR HISTORIAL EN ESTADÍSTICAS (pages/estadisticas.html)
    // -------------------------------------------------------------
    const cargarDatosBtn = document.getElementById('cargarDatosBtn');
    if (cargarDatosBtn) {
        cargarDatosBtn.addEventListener('click', async () => {
            const contenedorTabla = document.getElementById('tablaResultados');
            contenedorTabla.innerHTML = '<p>Cargando datos desde Supabase...</p>';

            try {
                // Instanciar supabase localmente
                const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
                
                if (!db) throw new Error("No se pudo conectar a Supabase.");

                const { data, error } = await db
                    .from('consumos')
                    .select('*')
                    .order('id', { ascending: false });

                if (error) throw error;

                if (!data || data.length === 0) {
                    contenedorTabla.innerHTML = '<p>No hay registros guardados todavía.</p>';
                    return;
                }

                let html = '<table border="1" cellpadding="8" style="width:100%; border-collapse: collapse; background:white; text-align: left;">';
                html += '<tr style="background-color: #f2f2f2;"><th>ID</th><th>Servicio</th><th>Valor ($)</th><th>Mes</th></tr>';
                
                data.forEach(row => {
                    html += `<tr>
                                <td>${row.id}</td>
                                <td>${row.servicio}</td>
                                <td>$${row.valor}</td>
                                <td>${row.mes}</td>
                             </tr>`;
                });
                html += '</table>';

                contenedorTabla.innerHTML = html;
            } catch (error) {
                console.error('Error al cargar:', error.message);
                contenedorTabla.innerHTML = `<p style="color:red;">Error al cargar: ${error.message}</p>`;
            }
        });
    }

});