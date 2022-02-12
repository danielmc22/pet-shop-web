const cards = document.getElementById("cards")
const templateCard= document.getElementById("template-card").content
const fragment = document.createDocumentFragment()
let carrito={}

document.addEventListener("DOMContentLoaded",()=>{
    fetchData()
})
cards.addEventListener("click", e=>{
    addCarrito(e)
})

const fetchData = async() =>{
    try{
        const res = await fetch("https://apipetshop.herokuapp.com/api/articulos")
        const data = await res.json()
        console.log(data);
        pintarCards(data)
    }catch (error){
        console.log(error);
    }
}

const pintarCards= data=>{
    data.forEach(producto => {

        templateCard.querySelector("h5").textContent = producto.nombre
        templateCard.querySelector("p").textContent = producto.descripcion
        templateCard.querySelector("p").textContent = producto.precio
        templateCard.querySelector("p").textContent = producto.stock
        templateCard.querySelector("div").setAttribute("url", producto.thumbraiUrl)
        templateCard.querySelector("a").dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });
    cards.appendChild(fragment)
}

const addCarrito=e=>{
    // console.log(e.target)
    // console.log(e.target.classList.contains("btn"));
    if(e.target.classList.contains("btn")){
       setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito= objeto=>{
    const producto={
        id:objeto.querySelector(".btn").dataset.id,
        nombre:objeto.querySelector("h2").textContent,
        descripcion:objeto.querySelector("p").templateCard,
        cantidad:1
    }
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad=carrito[producto.id].cantidad +1
    }
    carrito[producto.id]={...producto}
     pintarCarrito()
    console.log(objeto);
}

const pintarCarrito = ()=>{
    console.log(carrito);
    Object.values(carrito).forEach(producto=>{
    templateCarrito.querySelector("th").textContent=producto.id     
    })
}


 


