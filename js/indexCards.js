const API = 'https://apipetshop.herokuapp.com/api/articulos';
let fetchedData;
let productos;
let juguetes = [];
let medicamentos = [];

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

}

const displayCards = () => {

    

}

fetchData(API);

