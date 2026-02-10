const tabla = document.getElementById('tabla-favoritos');

function renderizarFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    tabla.innerHTML = '';

    if (favoritos.length === 0) {
        tabla.innerHTML = '<tr><td colspan="5" class="text-center py-4">No tienes favoritos aún.</td></tr>';
        return;
    }

    favoritos.forEach((prop, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${prop.imagen}" width="80" class="rounded"></td>
            <td class="fw-bold">${prop.titulo}</td>
            <td>${prop.ubicacion}</td>
            <td class="text-primary fw-bold">$${prop.precio.toLocaleString()}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="eliminarFavorito(${prop.id})">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </td>
        `;
        tabla.appendChild(row);
    });
}

window.eliminarFavorito = (id) => {
    let favs = JSON.parse(localStorage.getItem('favoritos')) || [];
    favs = favs.filter(f => f.id !== id);
    localStorage.setItem('favoritos', JSON.stringify(favs));
    renderizarFavoritos();
};

document.addEventListener('DOMContentLoaded', renderizarFavoritos);