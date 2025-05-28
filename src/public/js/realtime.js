const socket = io();

// Escuchar lista de productos desde el servidor
socket.on('productos-actualizados', (products) => {
    const lista = document.getElementById('product-list');
    lista.innerHTML = '';

    products.forEach((product) => {
        const li = document.createElement('li');
        li.setAttribute('data-id', product.id);
        li.innerHTML = `
        <strong>${product.title}</strong><br />
        Precio: $${product.price}<br />
        Código: ${product.code}<br />
        <button onclick="eliminarProducto(${product.id})">Eliminar</button>
        <hr />
        `;
        lista.appendChild(li);
    });
});

function eliminarProducto(id) {
    fetch(`/api/products/${id}`, {
        method: 'DELETE'
    }).then(() => {
    // La actualización la hace el servidor vía socket.io
    });
}