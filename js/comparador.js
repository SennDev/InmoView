const tablaHead = document.getElementById('fila-titulos');
const tablaBody = document.getElementById('cuerpo-tabla');
const propiedades = JSON.parse(localStorage.getItem('comparador')) || [];

function renderizarComparador() {
    if (propiedades.length === 0) {
        document.querySelector('main').innerHTML = '<div class="container py-5 text-center"><h3>No has seleccionado propiedades para comparar.</h3><a href="index.html" class="btn btn-primary mt-3">Ir al Catálogo</a></div>';
        return;
    }

    // 1. Generar encabezados (Columnas)
    propiedades.forEach(p => {
        const th = document.createElement('th');
        th.innerHTML = `${p.titulo} <br> <img src="${p.imagen}" width="100" class="mt-2 rounded">`;
        tablaHead.appendChild(th);
    });

    // 2. Generar filas de características
    const atributos = [
        { label: 'Precio', key: 'precio', format: val => `$${val.toLocaleString()}` },
        { label: 'Ubicación', key: 'ubicacion' },
        { label: 'Tipo', key: 'tipo' },
        { label: 'Superficie', key: 'm2', suffix: ' m²' },
        { label: 'Recámaras', key: 'recamaras' },
        { label: 'Baños', key: 'banos' }
    ];

    atributos.forEach(attr => {
        const tr = document.createElement('tr');
        // Primera celda: Nombre de la característica
        tr.innerHTML = `<td class="fw-bold bg-light text-start">${attr.label}</td>`;
        
        // Celdas siguientes: Valor de cada propiedad
        propiedades.forEach(p => {
            let valor = p[attr.key];
            if (attr.format) valor = attr.format(valor);
            if (attr.suffix) valor += attr.suffix;
            tr.innerHTML += `<td>${valor}</td>`;
        });
        tablaBody.appendChild(tr);
    });
}

// Lógica de Exportación (CSV)
document.getElementById('btn-exportar').addEventListener('click', () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Caracteristica," + propiedades.map(p => p.titulo).join(",") + "\n";

    const atributos = ['precio', 'ubicacion', 'tipo', 'm2', 'recamaras'];
    atributos.forEach(key => {
        let row = key.toUpperCase() + "," + propiedades.map(p => p[key]).join(",");
        csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "comparacion_inmoview.csv");
    document.body.appendChild(link);
    link.click();
});

window.limpiarComparador = () => {
    localStorage.removeItem('comparador');
    location.reload();
}

document.addEventListener('DOMContentLoaded', renderizarComparador);