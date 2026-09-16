# SPCR - Sistema de Seguimiento de Consumo de Recursos

## 📝 Descripción del Problema
En la mayoría de los hogares, el seguimiento del consumo de servicios públicos (agua, energía, gas) se realiza de forma manual o simplemente no se lleva a cabo. Esto genera una desconexión entre los hábitos diarios de la familia y su impacto ecológico y financiero, dificultando la planificación económica y el ahorro. Todo lo que no esté relacionado con el registro de consumos mensuales, persistencia en base de datos y generación de recomendaciones ecológicas queda fuera del alcance de esta primera fase.

## 🎯 Solución Propuesta (MVP Web + Supabase)
El SPCR es una aplicación web interactiva desarrollada con HTML5, CSS3, JavaScript y conectada a una base de datos en la nube mediante **Supabase**. Permite a los usuarios iniciar sesión y registrar los datos mensuales de cada factura para almacenarlos de forma segura.

Su valor diferencial radica en su **motor de concientización**: al registrar o consultar el consumo, el sistema emite de forma automatizada consejos ecológicos y de ahorro, fomentando un cambio positivo en los hábitos familiares.

## 📂 Arquitectura de Vistas (4 Páginas)
1. **`index.html` (Login / Acceso):** Pantalla de autenticación y acceso al hogar.
2. **`pages/consumo.html` (Registro):** Formulario para ingresar servicios conectado a Supabase.
3. **`pages/consejos.html` (Concientización):** Visualización de recomendaciones ecológicas automatizadas.
4. **`pages/estadisticas.html` (Reportes):** Visualización y análisis global de los datos de la base de datos.