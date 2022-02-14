const inputSubmit = document.querySelector('.formulario__grupo-btn-enviar .formulario__btn');

inputSubmit.addEventListener('click', (event) => {
	console.log(event.target);
	document.querySelector('.formulario__mensaje-exito').style.display = 'block';
});
















