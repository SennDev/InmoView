// Referencias al DOM
const contenedor = document.getElementById('contenedor-propiedades');
const inputBuscador = document.getElementById('buscador');
const selectTipo = document.getElementById('filtro-tipo');
const inputPrecio = document.getElementById('filtro-precio');
const inputRecamaras = document.getElementById('filtro-recamaras');

// Función principal de renderizado
function mostrarPropiedades(lista) {
    contenedor.innerHTML = ''; // Limpiar contenedor

    if (lista.length === 0) {
        contenedor.innerHTML = '<div class="col-12 text-center text-muted py-5"><h3>No se encontraron propiedades :(</h3></div>';
        return;
    }

    lista.forEach(propiedad => {
        const precioFmt = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(propiedad.precio);
        
        // Verificar si ya es favorito para pintar el corazón
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        const esFavorito = favoritos.some(fav => fav.id === propiedad.id);
        const iconHeart = esFavorito ? 'bi-heart-fill text-danger' : 'bi-heart';

        const div = document.createElement('div');
        div.className = 'col-md-6 col-lg-4';
        div.innerHTML = `
            <div class="card h-100 shadow-sm border-0">
                <div class="position-relative">
                    <img src="${propiedad.imagen}" class="card-img-top" alt="${propiedad.titulo}" style="height: 200px; object-fit: cover;">
                    ${propiedad.destacado ? '<span class="badge bg-warning text-dark position-absolute top-0 end-0 m-2">Destacado</span>' : ''}
                    <span class="badge bg-primary position-absolute top-0 start-0 m-2">${propiedad.tipo}</span>
                </div>
                <div class="card-body">
                    <h5 class="card-title fw-bold">${propiedad.titulo}</h5>
                    <p class="text-muted small"><i class="bi bi-geo-alt-fill text-warning"></i> ${propiedad.ubicacion}</p>
                    <h4 class="text-primary fw-bold">${precioFmt}</h4>
                    <div class="d-flex justify-content-between text-secondary small my-3">
                        <span><i class="bi bi-rulers"></i> ${propiedad.m2} m²</span>
                        <span><i class="bi bi-door-closed"></i> ${propiedad.recamaras} Hab</span>
                        <span><i class="bi bi-droplet"></i> ${propiedad.banos} Baños</span>
                    </div>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-between">
                        <a href="detalle.html?id=${propiedad.id}" class="btn btn-outline-primary btn-sm flex-grow-1">Ver Detalles</a>
                        <button class="btn btn-outline-danger btn-sm" onclick="toggleFavorito(${propiedad.id})">
                            <i class="bi ${iconHeart}" id="fav-icon-${propiedad.id}"></i>
                        </button>
                        <button class="btn btn-outline-secondary btn-sm" onclick="toggleComparar(${propiedad.id})">
                            <i class="bi bi-arrow-left-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

// Lógica de Filtros
function filtrarPropiedades() {
    const texto = inputBuscador.value.toLowerCase();
    const tipo = selectTipo.value;
    const precioMax = inputPrecio.value ? parseFloat(inputPrecio.value) : Infinity;
    const recamarasMin = inputRecamaras.value ? parseInt(inputRecamaras.value) : 0;

    const filtradas = propiedades.filter(p => {
        const coincideTexto = p.titulo.toLowerCase().includes(texto) || p.ubicacion.toLowerCase().includes(texto);
        const coincideTipo = tipo === 'todos' || p.tipo === tipo;
        const coincidePrecio = p.precio <= precioMax;
        const coincideRecamaras = p.recamaras >= recamarasMin;

        return coincideTexto && coincideTipo && coincidePrecio && coincideRecamaras;
    });

    mostrarPropiedades(filtradas);
}

// Event Listeners para filtros
inputBuscador.addEventListener('input', filtrarPropiedades);
selectTipo.addEventListener('change', filtrarPropiedades);
inputPrecio.addEventListener('input', filtrarPropiedades);
inputRecamaras.addEventListener('input', filtrarPropiedades);

// Gestión de Favoritos
window.toggleFavorito = (id) => {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const existe = favoritos.find(f => f.id === id);

    if (existe) {
        favoritos = favoritos.filter(f => f.id !== id);
        alert('Eliminado de favoritos');
    } else {
        const item = propiedades.find(p => p.id === id);
        favoritos.push(item);
        alert('Agregado a favoritos');
    }
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    filtrarPropiedades(); // Repintar para actualizar iconos
};

// Gestión de Comparador (Máximo 4)
window.toggleComparar = (id) => {
    let comparador = JSON.parse(localStorage.getItem('comparador')) || [];
    if (comparador.find(c => c.id === id)) {
        alert('Esta propiedad ya está en el comparador');
        return;
    }
    if (comparador.length >= 4) {
        alert('Solo puedes comparar máximo 4 propiedades');
        return;
    }
    const item = propiedades.find(p => p.id === id);
    comparador.push(item);
    localStorage.setItem('comparador', JSON.stringify(comparador));
    alert('Agregado al comparador');
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    mostrarPropiedades(propiedades);
});