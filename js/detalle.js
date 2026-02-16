const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));
const contenedor = document.getElementById('detalle-container');

const propiedad = propiedades.find(p => p.id === id);

if (propiedad) {
    const precioFmt = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(propiedad.precio);

    const mensajeWhatsapp = encodeURIComponent(`Hola, estoy interesado en la propiedad "${propiedad.titulo}" que vi en InmoView. ¿Sigue disponible?`);
    const linkWhatsapp = `https://wa.me/521234567890?text=${mensajeWhatsapp}`;

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
            
            <p>Descripción simulada: Esta es una hermosa propiedad ubicada en una zona exclusiva. Cuenta con acabados de lujo, excelente iluminación y seguridad las 24 horas. Ideal para tu estilo de vida.</p>
            
            <div class="d-grid gap-2 mt-4">
                <a href="${linkWhatsapp}" target="_blank" class="btn btn-success btn-lg fw-bold">
                    <i class="bi bi-whatsapp"></i> Me interesa esta propiedad
                </a>

                <div class="d-flex gap-2">
                    <button class="btn btn-outline-danger flex-grow-1" onclick="agregarFavorito(${propiedad.id})">
                        <i class="bi bi-heart"></i> Guardar
                    </button>
                    <button class="btn btn-outline-secondary flex-grow-1" onclick="agregarComparar(${propiedad.id})">
                        <i class="bi bi-arrow-left-right"></i> Comparar
                    </button>
                </div>
            </div>
            
            <div class="mt-3 text-center">
                <small class="text-muted">¿Prefieres correo? <a href="contacto.html">Contáctanos aquí</a></small>
            </div>
        </div>
    `;
} else {
    contenedor.innerHTML = '<div class="col-12 text-center"><h3>Propiedad no encontrada</h3><a href="index.html" class="btn btn-primary mt-3">Volver al inicio</a></div>';
}

// --- LÓGICA DE FAVORITOS (Igual que antes) ---
window.agregarFavorito = (id) => {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    if (favoritos.some(f => f.id === id)) {
        alert('Esta propiedad ya está en tus favoritos.');
    } else {
        const item = propiedades.find(p => p.id === id);
        favoritos.push(item);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        alert('¡Agregada a favoritos!');
    }
};

// --- LÓGICA DE COMPARADOR (Igual que antes) ---
window.agregarComparar = (id) => {
    let comparador = JSON.parse(localStorage.getItem('comparador')) || [];
    if (comparador.some(c => c.id === id)) {
        alert('Esta propiedad ya está en el comparador.');
        return;
    }
    if (comparador.length >= 4) {
        alert('Solo puedes comparar un máximo de 4 propiedades.');
        return;
    }
    const item = propiedades.find(p => p.id === id);
    comparador.push(item);
    localStorage.setItem('comparador', JSON.stringify(comparador));
    alert('Agregada al comparador.');
};