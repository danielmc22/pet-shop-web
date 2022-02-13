const API = 'https://apipetshop.herokuapp.com/api/articulos';
let fetchedData;
let productos;
let juguetes = [];
let medicamentos = [];

const cardsContainer = document.querySelector('.product-card-container');

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
        if (producto.tipo == 'Juguete') {
            juguetes.push(producto);
        } else if (producto.tipo == 'Medicamento') {
            medicamentos.push(producto);
        }
    });

    console.table(juguetes);
    console.table(medicamentos);

    displayCards(productos);

}

const displayCards = (dataProducto) => {

    let templateHTML = '';

    dataProducto.map(producto => {

        templateHTML += `
        <div class="card">
            <figure class="card-image-container">
                <img class="card__image" src="${producto.imagen}" alt="producto">
            </figure>
            <h3>Nombre producto</h3>
            <p>Precio</p>
            <p>Cantidad:</p>
            <input type="number">
            <button src="#">Agregar al carrito</button>
        </div>
        `

    });

    cardsContainer.innerHTML = templateHTML;
}

fetchData(API);

