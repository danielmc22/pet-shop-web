const API = 'https://apipetshop.herokuapp.com/api/articulos';
//* Variables fetch
let fetchedData;
let productos;
let juguetes = [];
let medicamentos = [];

const cardsContainer = document.querySelector('.product-card-container');

//* Carrito
let carritoAll = [];
let carritoFinal = [];


console.log(cardsContainer);

const fetchData = async (url) => {

    await fetch(url)
                .then(response => response.json())
                .then(data => {
                    // console.table(data.response);
                    fetchedData = data;
                    productos = data.response;
                });
    
    // console.table(productos);

    productos.map(producto => {
        producto.id = producto._id;
        delete producto._id;

        if (producto.tipo == 'Juguete') {
            juguetes.push(producto);
        } else if (producto.tipo == 'Medicamento') {
            medicamentos.push(producto);
        }
    });

    // console.table(juguetes);
    // console.table(medicamentos);

    displayCards(juguetes);

    

}

const displayCards = (dataProducto) => {

    let templateHTML = '';

    dataProducto.map(producto => {


        templateHTML += `
        <div class="card d${producto.id}">
            <figure class="card-image-container">
                <img class="card__image" src="${producto.imagen}" alt="producto">
            </figure>
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <label for="">Cantidad:
                <input type="number" min="1" max="${producto.stock}" value="1">
            </label>
            <button onClick="getID('${producto.id}')" id="${producto.id}" src="#">Agregar al carrito</button>
        </div>
        `

    });

    cardsContainer.innerHTML = templateHTML;
}

function getID(event) {

    let inputCantidad = document.querySelector(`.card.d${event} input`);
    let cantidadArticulo = parseInt(inputCantidad.value);
    // console.log(cantidadArticulo);

    carritoAll.push(event);

    const carritoUnique = new Set(carritoAll);
    let carritoClear = [...carritoUnique];
    // console.log(carritoClear);
    // console.log(carrito);

    carritoClear.forEach(productoId => {

        if (carritoFinal.some(elemento => elemento.id == productoId)) {
            let productoDesactualizado = carritoFinal.filter(producto => producto.id == productoId);
            let cantidadAnterior = productoDesactualizado[0].cantidad;

            console.log(productoDesactualizado);
            // console.log(cantidadArticulo);
            
            carritoFinal = carritoFinal.filter(producto => producto.id != productoId);
            carritoFinal.push({
                id: productoId,
                cantidad: parseInt(cantidadArticulo + cantidadAnterior),
            });
            
        } else {
            carritoFinal.push({
                id: productoId,
                cantidad: carritoAll.filter(producto => productoId == producto).length + (cantidadArticulo - 1),
            });
        }

    });

    console.log(carritoFinal);

    // localStorage.setItem('carrito', JSON.stringify(carrito));

}


fetchData(API);

