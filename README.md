# 🏠 InmoView - Portal Inmobiliario

![Badge](https://img.shields.io/badge/Status-Terminado-success)
![Badge](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20JS-blue)
![Badge](https://img.shields.io/badge/Style-Bootstrap%205-purple)

**InmoView** es una aplicación web Frontend que simula la operatividad de un portal inmobiliario moderno. Permite a los usuarios explorar un catálogo de propiedades, filtrar búsquedas en tiempo real, gestionar una lista de favoritos y comparar inmuebles lado a lado.

Este proyecto fue desarrollado como práctica final para la materia de **Desarrollo de Sitios Web**, demostrando el dominio de **JavaScript Vanilla (DOM & LocalStorage)** sin el uso de frameworks reactivos.

---

## 🚀 Características Principales

### 1. 🔍 Catálogo y Búsqueda Dinámica
* **Renderizado Automático:** Las propiedades se cargan dinámicamente desde un archivo de datos simulado (`data.js`).
* **Filtros en Tiempo Real:** Búsqueda por ubicación/título, rango de precios, tipo de inmueble y número de habitaciones sin recargar la página.

### 2. ❤️ Sistema de Favoritos (Persistencia)
* Los usuarios pueden marcar propiedades como "Favoritas".
* Uso de `localStorage` para guardar la selección incluso si se cierra el navegador.
* Gestión visual desde la página dedicada `favoritos.html`.

### 3. ⚖️ Comparador de Propiedades
* Selección de hasta **4 inmuebles** simultáneos.
* Tabla comparativa que confronta características (Precio, m², Baños, Ubicación).
* **Exportación de Datos:** Generación automática de archivos `.csv` para descargar la comparación.

### 4. 📱 Diseño Responsivo & UI
* Interfaz moderna adaptable a Móviles, Tablets y Escritorio.
* Implementación de **Bootstrap 5** para el sistema de rejillas (Grid) y componentes (Cards, Modales, Navbars).
* Estilos personalizados para un tema visual limpio y profesional.

---

## 🛠️ Stack Tecnológico

* **Estructura:** HTML5 Semántico.
* **Estilos:** CSS3 + Bootstrap 5 (CDN/Local) + Bootstrap Icons.
* **Lógica:** JavaScript (ES6+) Vanilla.
    * Manipulación del DOM.
    * `window.localStorage` para persistencia de datos.
    * API `Blob` para exportación de archivos.
* **Datos:** JSON Array (Mock Data).

---

## 📂 Estructura del Proyecto

```text
inmoview/
│
├── css/
│   ├── styles.css           # Estilos personalizados y correcciones al tema
│   └── (bootstrap files)
│
├── js/
│   ├── catalogo.js          # Lógica de renderizado y filtros del Home
│   ├── comparador.js        # Lógica de la tabla comparativa y exportación
│   ├── contacto.js          # Validaciones del formulario
│   ├── data.js              # Base de datos simulada (Array de objetos)
│   ├── detalle.js           # Lógica de la vista individual de propiedad
│   └── favoritos.js         # Gestión de la tabla de favoritos
│
├── img/
│   ├── propiedades/         # Imágenes de los inmuebles
│   └── fonts/
│
├── index.html               # Página Principal (Catálogo)
├── detalle.html             # Vista de detalle de una propiedad
├── favoritos.html           # Lista de inmuebles guardados
├── comparador.html          # Tabla comparativa
└── contacto.html            # Formulario de contacto
