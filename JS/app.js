document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. MANEJO DEL LOGIN (Funciona en index.html)
    // -------------------------------------------------------------
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombreHogar = document.getElementById('nombreHogar').value.trim();
            if (nombreHogar) {
                // Guardamos el hogar en el almacenamiento local para usarlo en las demás vistas
                localStorage.setItem('hogarActual', nombreHogar);
                // Redirigimos a la vista de consumo
                window.location.href = './pages/consumo.html';
            }
        });
    }

    // -------------------------------------------------------------
    // 2. MOSTRAR EL NOMBRE DEL HOGAR (Funciona en consumo.html)
    // -------------------------------------------------------------
    const hogarDisplay = document.getElementById('nombreHogarDisplay');
    if (hogarDisplay) {
        const hogar = localStorage.getItem('hogarActual') || 'Hogar Invitado';
        hogarDisplay.textContent = hogar;
    }

    // -------------------------------------------------------------
    // 3. REGISTRO DE CONSUMO CON SUPABASE (Funciona en consumo.html)
    // -------------------------------------------------------------
    const consumoForm = document.getElementById('consumoForm');
    if (consumoForm) {
        consumoForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const servicio = document.getElementById('servicio').value;
            const valor = parseFloat(document.getElementById('valor').value);
            const mes = document.getElementById('mes').value.trim();
            const mensajeEstado = document.getElementById('mensajeEstado');

            try {
                // Obtenemos el cliente seguro definido en supabase.js
                const db = getSupabase(); 
                if (!db) throw new Error("No se pudo inicializar la conexión con Supabase.");

                // Inserción de datos en la tabla 'consumos'
                const { data, error } = await db
                    .from('consumos')
                    .insert([{ servicio, valor, mes }]);

                if (error) throw error;

                mensajeEstado.textContent = '¡Consumo registrado con éxito en Supabase! 🎉';
                mensajeEstado.style.color = 'green';
                consumoForm.reset();
            } catch (error) {
                console.error('Error al guardar:', error.message);
                mensajeEstado.textContent = 'Hubo un error al guardar el registro: ' + error.message;
                mensajeEstado.style.color = 'red';
            }
        });

    // -------------------------------------------------------------
    // 4. CONSULTAR HISTORIAL EN ESTADÍSTICAS (Funciona en estadisticas.html)
    // -------------------------------------------------------------
    const cargarDatosBtn = document.getElementById('cargarDatosBtn');
    if (cargarDatosBtn) {
        cargarDatosBtn.addEventListener('click', async () => {
            const contenedorTabla = document.getElementById('tablaResultados');
            contenedorTabla.innerHTML = '<p>Cargando datos desde Supabase...</p>';

            try {
                const db = getSupabase();
                if (!db) throw new Error("No se pudo conectar a Supabase.");

                const { data, error } = await db
                    .from('consumos')
                    .select('*')
                    .order('id', { ascending: false });

                if (error) throw error;

                if (data.length === 0) {
                    contenedorTabla.innerHTML = '<p>No hay registros guardados todavía.</p>';
                    return;
                }

                let html = '<table border="1" cellpadding="8" style="width:100%; border-collapse: collapse; background:white;">';
                html += '<tr><th>Servicio</th><th>Valor ($)</th><th>Mes</th></tr>';
                
                data.forEach(row => {
                    html += `<tr><td>${row.servicio}</td><td>$${row.valor}</td><td>${row.mes}</td></tr>`;
                });
                html += '</table>';

                contenedorTabla.innerHTML = html;
            } catch (error) {
                console.error('Error al cargar:', error.message);
                contenedorTabla.innerHTML = '<p style="color:red;">Error al cargar los datos de la base de datos.</p>';
            }
        });
    }}
});