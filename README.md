# SPCR (Sistema de Seguimiento de Consumo de Recursos) 💧⚡

Aplicación web desarrollada como MVP (Producto Mínimo Viable) para la gestión y concientización del consumo de servicios públicos en los hogares (agua, energía y gas).

## 🚀 Características del Proyecto
- **Control de Acceso por Hogar:** Pantalla de bienvenida que personaliza la experiencia registrando el nombre del hogar actual.
- **Registro de Consumo:** Formulario interactivo conectado a una base de datos en la nube para almacenar los registros mensuales de los servicios.
- **Motor de Concientización:** Sección de recomendaciones automáticas y consejos ecológicos para promover el ahorro en el hogar.
- **Estadísticas y Reportes:** Módulo de consulta para visualizar en formato de tabla los datos históricos guardados en la base de datos.

## 🛠️ Tecnologías Utilizadas
- **HTML5 & CSS3:** Estructura semántica y diseño visual responsivo.
- **JavaScript:** Lógica del cliente, manejo de eventos y manipulación del DOM.
- **Supabase:** Base de datos relacional en la nube y API backend integrada mediante JavaScript SDK.

## 📂 Arquitectura del Repositorio
```text
pagohogar-proyecto/
│
├── css/
│   └── main.css            # Estilos globales de la aplicación
├── pages/
│   ├── consumo.html        # Vista de registro de consumo
│   ├── consejos.html       # Vista del motor de consejos ecológicos
│   └── estadisticas.html   # Vista de reporte e historial
├── index.html              # Página de bienvenida / Login
├── supabase.js             # Configuración del cliente de Supabase
├── app.js                  # Lógica general e integración con la base de datos
└── README.md               # Documentación del proyecto