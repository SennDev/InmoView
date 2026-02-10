const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));
const contenedor = document.getElementById('detalle-container');

const propiedad = propiedades.find(p => p.id === id);

if (propiedad) {
    const precioFmt = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(propiedad.precio);

    contenedor.innerHTML = `
        <div class="col-lg-7">
            <div id="carouselPropiedad" class="carousel slide shadow rounded overflow-hidden" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="${propiedad.imagen}" class="d-block w-100" alt="Foto Principal">
                    </div>
                    </div>
            </div>
        </div>
        
        <div class="col-lg-5">
            <span class="badge bg-warning text-dark mb-2">${propiedad.tipo}</span>
            <h1 class="fw-bold mb-3">${propiedad.titulo}</h1>
            <h2 class="text-primary mb-4">${precioFmt}</h2>
            
            <p class="lead text-muted"><i class="bi bi-geo-alt"></i> ${propiedad.ubicacion}</p>
            
            <hr>
            <div class="row text-center mb-4">
                <div class="col-4">
                    <h5 class="fw-bold">${propiedad.recamaras}</h5>
                    <small>Recámaras</small>
                </div>
                <div class="col-4">
                    <h5 class="fw-bold">${propiedad.banos}</h5>
                    <small>Baños</small>
                </div>
                <div class="col-4">
                    <h5 class="fw-bold">${propiedad.m2}</h5>
                    <small>m²</small>
                </div>
            </div>
            
            <p>Descripción simulada: Esta es una hermosa propiedad ubicada en una zona exclusiva. Cuenta con acabados de lujo y excelente iluminación...</p>
            
            <div class="d-grid gap-2 mt-4">
                <button class="btn btn-outline-danger btn-lg" onclick="agregarFavorito(${propiedad.id})">
                    <i class="bi bi-heart"></i> Agregar a Favoritos
                </button>
                <button class="btn btn-outline-secondary btn-lg" onclick="agregarComparar(${propiedad.id})">
                    <i class="bi bi-arrow-left-right"></i> Agregar a Comparador
                </button>
            </div>
        </div>
    `;
} else {
    contenedor.innerHTML = '<h3>Propiedad no encontrada</h3>';
}

// Reutilizamos lógica de LocalStorage (puedes copiar las funciones de catalogo.js aquí o hacer un archivo utils.js)
function agregarFavorito(id) { /* ... Misma lógica que catalogo.js ... */ }
function agregarComparar(id) { /* ... Misma lógica que catalogo.js ... */ }