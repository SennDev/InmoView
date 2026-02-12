const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));
const contenedor = document.getElementById('detalle-container');

// Buscamos la propiedad en el array 'propiedades' cargado desde data.js
const propiedad = propiedades.find(p => p.id === id);

if (propiedad) {
    const precioFmt = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(propiedad.precio);

    contenedor.innerHTML = `
        <div class="col-lg-7">
            <div id="carouselPropiedad" class="carousel slide shadow rounded overflow-hidden" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="${propiedad.imagen}" class="d-block w-100" alt="Foto Principal" style="height: 400px; object-fit: cover;">
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
    contenedor.innerHTML = '<div class="col-12 text-center"><h3>Propiedad no encontrada</h3><a href="index.html" class="btn btn-primary mt-3">Volver al inicio</a></div>';
}

// --- LÓGICA DE FAVORITOS ---
window.agregarFavorito = (id) => {
    // 1. Obtener favoritos actuales
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    // 2. Verificar si ya existe
    const existe = favoritos.some(f => f.id === id);

    if (existe) {
        alert('Esta propiedad ya está en tus favoritos.');
    } else {
        // 3. Buscar el objeto completo en el array global 'propiedades'
        const item = propiedades.find(p => p.id === id);
        if (item) {
            favoritos.push(item);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            alert('¡Agregada a favoritos correctamente!');
        }
    }
};

// --- LÓGICA DE COMPARADOR ---
window.agregarComparar = (id) => {
    // 1. Obtener comparador actual
    let comparador = JSON.parse(localStorage.getItem('comparador')) || [];

    // 2. Validación de duplicados
    if (comparador.some(c => c.id === id)) {
        alert('Esta propiedad ya está en el comparador.');
        return;
    }

    // 3. Validación de límite (Máximo 4)
    if (comparador.length >= 4) {
        alert('Solo puedes comparar un máximo de 4 propiedades.');
        return;
    }

    // 4. Agregar y guardar
    const item = propiedades.find(p => p.id === id);
    if (item) {
        comparador.push(item);
        localStorage.setItem('comparador', JSON.stringify(comparador));
        alert('Agregada al comparador. Ve a la sección "Comparador" para ver la tabla.');
    }
};