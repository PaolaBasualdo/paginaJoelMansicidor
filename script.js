// Función para mostrar el cartel flotante minimalista (Toast) sin usar el alert feo
function mostrarNotificacion(nombreProducto) {
  const toast = document.getElementById('toast-notification');
  const mensaje = document.getElementById('toast-message');
  
  if (toast && mensaje) {
    mensaje.textContent = `"${nombreProducto}" se añadió al carrito.`;
    toast.classList.add('show');

    // Desaparece automáticamente a los 3 segundos
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Actualizar el número del contador en la esquina superior
function actualizarContadorCarrito() {
  let carrito = JSON.parse(localStorage.getItem('nexus_carrito')) || [];
  let totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const contador = document.getElementById('cart-counter');
  if (contador) {
    contador.textContent = totalItems;
  }
}

// Función principal al hacer clic en el botón de comprar
function agregarAlCarrito(nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem('nexus_carrito')) || [];
  let productoExistente = carrito.find(item => item.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  localStorage.setItem('nexus_carrito', JSON.stringify(carrito));
  actualizarContadorCarrito();
  mostrarNotificacion(nombre); // Activa el cartel flotante lindo
}

// Cargar contador al iniciar la página
document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);