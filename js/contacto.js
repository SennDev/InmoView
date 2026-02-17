const form = document.getElementById('form-contacto');
const inputNombre = document.getElementById('nombre');
const inputApellidos = document.getElementById('apellidos');
const inputTelefono = document.getElementById('telefono');
const inputCP = document.getElementById('cp');

function limpiarNombreRealTime(e) {
    let valor = this.value;

    valor = valor.replace(/[^a-zA-ZÁÉÍÓÚáéíóúñÑ\s]/g, '');
    valor = valor.replace(/\s{2,}/g, ' ');

    if (valor.startsWith(' ')) {
        valor = valor.trimStart();
    }

    this.value = valor;
}

function limpiarNumerosRealTime(e) {
    this.value = this.value.replace(/\D/g, '');
}

inputNombre.addEventListener('input', limpiarNombreRealTime);
inputApellidos.addEventListener('input', limpiarNombreRealTime);
inputTelefono.addEventListener('input', limpiarNumerosRealTime);
inputCP.addEventListener('input', limpiarNumerosRealTime);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = inputNombre.value.trim();
    const apellidos = inputApellidos.value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = inputTelefono.value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const cp = inputCP.value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    
    // --- VALIDACIONES ---
    
    // 1. Detección de campos vacíos o de solo espacios
    if (!nombre || !apellidos || !email || !telefono || !direccion || !cp || !ciudad || !mensaje) {
        alert('Por favor completa todos los campos. No se permiten campos vacíos.');
        return;
    }
    
    // 2. Validación extra de Nombre 
    if (nombre.length < 2 || apellidos.length < 2) {
        alert('El nombre y los apellidos deben tener al menos 2 letras.');
        return;
    }

    // 3. Teléfono 
    if (telefono.length !== 10) {
        alert('El teléfono debe tener exactamente 10 dígitos.');
        return;
    }

    // 4. Código Postal 
    if (cp.length !== 5) {
        alert('El Código Postal debe tener 5 dígitos.');
        return;
    }

    // 5. Email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        alert('Por favor ingresa un correo electrónico válido (ejemplo: usuario@dominio.com).');
        return;
    }

    // 6. Mensaje
    if (mensaje.length < 20) {
        alert('El mensaje es muy corto. Por favor detalla más tu solicitud (mínimo 20 caracteres).');
        return;
    }

    // --- GUARDADO  ---
    const datosFormulario = {
        nombre, apellidos, email, telefono, direccion, cp, ciudad, mensaje
    };

    guardarYDescargarAcumulado(datosFormulario);

    alert(`¡Gracias ${nombre}! Tus datos han sido validados y guardados correctamente.`);
    form.reset();
});

function guardarYDescargarAcumulado(datos) {
    const nuevoContacto = {
        fecha: new Date().toLocaleString(),
        ...datos 
    };

    let historial = JSON.parse(localStorage.getItem('historial_contactos')) || [];
    historial.push(nuevoContacto);
    localStorage.setItem('historial_contactos', JSON.stringify(historial));

    let contenidoTexto = "=== BASE DE DATOS DE CONTACTOS (INMOVIEW) ===\n\n";

    historial.forEach((c, index) => {
        contenidoTexto += `REGISTRO #${index + 1}  [${c.fecha}]\n`;
        contenidoTexto += `Cliente:    ${c.nombre} ${c.apellidos}\n`;
        contenidoTexto += `Email:      ${c.email}\n`;
        contenidoTexto += `Teléfono:   ${c.telefono}\n`;
        contenidoTexto += `Dirección:  ${c.direccion}, ${c.ciudad}\n`;
        contenidoTexto += `C.P.:       ${c.cp}\n`;
        contenidoTexto += `Mensaje:    ${c.mensaje}\n`;
        contenidoTexto += "--------------------------------------------------\n\n";
    });

    const blob = new Blob([contenidoTexto], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "datos_clientes.txt"; 
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}