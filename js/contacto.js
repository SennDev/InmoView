const form = document.getElementById('form-contacto');
const inputNombre = document.getElementById('nombre');
const inputApellidos = document.getElementById('apellidos');
const inputTelefono = document.getElementById('telefono');
const inputCP = document.getElementById('cp');

function bloquearNumeros(e) {
    this.value = this.value.replace(/[0-9]/g, ''); 
}
inputNombre.addEventListener('input', bloquearNumeros);
inputApellidos.addEventListener('input', bloquearNumeros);

function bloquearLetras(e) {
    this.value = this.value.replace(/\D/g, ''); 
}
inputTelefono.addEventListener('input', bloquearLetras);
inputCP.addEventListener('input', bloquearLetras);


// --- VALIDACIONES ---
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener todos los valores
    const nombre = inputNombre.value.trim();
    const apellidos = inputApellidos.value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = inputTelefono.value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const cp = inputCP.value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    
    // 1. Campos vacíos
    if (!nombre || !apellidos || !email || !telefono || !direccion || !cp || !ciudad || !mensaje) {
        alert('Por favor completa todos los campos obligatorios.');
        return;
    }
    
    // 2. Longitud de nombres
    if (nombre.length < 2 || apellidos.length < 2) {
        alert('Por favor ingresa nombres y apellidos válidos.');
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
        alert('Por favor ingresa un correo electrónico válido.');
        return;
    }

    // 6. Mensaje
    if (mensaje.length < 20) {
        alert('El mensaje es muy corto (mínimo 20 caracteres).');
        return;
    }

    // --- GUARDAR Y DESCARGAR ---
    const datosFormulario = {
        nombre, apellidos, email, telefono, direccion, cp, ciudad, mensaje
    };

    guardarYDescargarAcumulado(datosFormulario);

    alert(`¡Gracias ${nombre}! Hemos registrado tu solicitud exitosamente.`);
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

    // Generar TXT
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