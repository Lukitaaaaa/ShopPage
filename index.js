const iconCart = document.querySelector('.container-icon')
const listCart = document.querySelector('.container-cart-products')

iconCart.addEventListener('click', ()=>{
    listCart.classList.toggle('hidden-cart') //FUNCION PARA MOSTRAR LA LISTA DEL CARRITO
})