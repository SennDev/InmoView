const form = document.getElementById('form-contacto');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    
    // Validaciones
    if (!nombre || !email || !mensaje) {
        alert('Por favor completa todos los campos obligatorios.');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        alert('Por favor ingresa un correo válido.');
        return;
    }

    // Simulación de envío
    alert(`¡Gracias ${nombre}! Hemos recibido tu mensaje. Nos pondremos en contacto contigo.`);
    form.reset();
});