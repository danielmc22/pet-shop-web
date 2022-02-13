const API = 'https://apipetshop.herokuapp.com/api/articulos';
let fetchedData;
let productos;

const fetchData = async (url) => {

    await fetch(url)
                .then(response => response.json())
                .then(data => {
                    // console.table(data.response);
                    fetchedData = data;
                    productos = data.response;
                });
    
    console.table(productos);
}

fetchData(API);

