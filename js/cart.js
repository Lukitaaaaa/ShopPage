const iconCart = document.querySelector('.container-cart-icon')
const listCart = document.querySelector('.container-cart-products')

iconCart.addEventListener('click', ()=>{
    listCart.classList.toggle('hidden-cart') //FUNCION PARA MOSTRAR LA LISTA DEL CARRITO
})

const cartInfo = document.querySelector('.cart-product')
const rowProduct = document.querySelector('.row-product')

const productsList = document.querySelector('.container-items') //LISTA DE LOS PRODUCTOS

let allProducts = []

const valorTotal = document.querySelector('.total-pagar')

const countProducts = document.querySelector('#contador-productos')

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', e => { // FUNCION PARA OBTENER LA INFORMACION DEL PRODUCTO Y AÑADIRLO A LA LISTA 
    if(e.target.classList.contains('add-cart')){
        const product = e.target.parentElement

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('.price').textContent
        }

        const existe = allProducts.some(product => product.title === infoProduct.title) //METODO SOME PARA ACUMULAR UNA CANTIDAD DE UN PRODUCTO
        
        if( existe === true ){
            const products = allProducts.map(product => {
                if(product.title === infoProduct.title){
                    product.quantity++;
                    return product
                } else {
                    return product
                }
            })

            allProducts = [...products]
        }else {

            allProducts = [ ...allProducts, infoProduct ] //AÑADE EL PRODUCTO
        }


        showHTML()
    }

});

rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')){
        const product = e.target.parentElement
        const title = product.querySelector('p').textContent

        allProducts = allProducts.filter( product => product.title !== title);
    
        showHTML()
    }  
});

//FUNCION PARA MOSTRAR EN EL HTML

const showHTML = () => {


    if(!allProducts.length){
        cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
    }

    //REEDIBUJAR LISTA CON EL PRODUCTOS AÑADIDO
    rowProduct.innerHTML = '';

    let total = 0; //TOTAL DEL DINERO A PAGAR 
    let totalOfProducts = 0; //TOTAL DE PRODUCTOS

    allProducts.forEach( product =>  {
        const containerProduct = document.createElement('div')
        containerProduct.classList.add('cart-product')

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        
        `;
        rowProduct.append(containerProduct)

        total = total + parseInt(product.quantity * product.price.slice(1)); //OPERACION PARA EL TOTAL A PAGAR DE LA LISTA DEL CARRITO
        totalOfProducts = totalOfProducts + product.quantity; //OPERACION PARA AUMENTAR EL NUMERO DE PRODUCTOS QUE ESTAN EN LA LISTA DEL CARRITO
    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
}