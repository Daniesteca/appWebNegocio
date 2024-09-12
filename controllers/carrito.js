//Variable que mantiene el estado visible del carrito
var carritoVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Agrego funcionalidad al buton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.querySelectorAll('#boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked(){
    alert("Gracias por la compra");
    //Elimino todos los elmentos del carrito
    // var carritoItems = document.getElementsByClassName('carrito-items')[0];
    var carritoItems = document.querySelectorAll('#carrito-items')[0];;
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
    var button = event.target;
    var itemRow = button.closest('tr'); // Obtener la fila completa del producto

    // Obtener elementos por ID dentro de la fila
    var titulo = itemRow.querySelector("#titulo-item").innerText;
    var tventa = itemRow.querySelector("#tventa").innerText;
    var precio = itemRow.querySelector("#precio-item").innerText;
    var imagenSrc = itemRow.querySelector("#img-item").src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo,tventa, precio, imagenSrc);

    hacerVisibleCarrito();

    console.log(`
        Nombre del cliente: ${nombre_cliente.value}
        Tipo de venta: ${tipo_venta.value}
        Descripción: ${descripcion.value}
        Valor: ${valor.value}
        Descuento: ${descuentos.value}
        ID del vendedor: ${id_vendedor.value}
        Vendedor: ${vendedor.value}
        Sede: ${sede.value}
        Valor total: ${valorTotalF.value}
        `);
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito(){
    carritoVisible = true;
    // var carrito = document.getElementsByClassName('carrito')[0];
    var carrito = document.querySelectorAll('#carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.marginLeft = '3';
    carrito.style.opacity = '1';

    // var items =document.getElementsByClassName('contenedor-items')[0];
    var items =document.querySelectorAll('#contenedor-items')[0];
    items.style.width = '60%';
}

//Funciòn que agrega un item al carrito_______________________________________________crea el producto en el carrito_________|
function agregarItemAlCarrito(titulo,tventa, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    // var itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    var itemsCarrito = document.querySelectorAll('#carrito-items')[0];;

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <span class="carrito-item-tventa">${tventa}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //actualzar tipo venta
    actualizarTipoVenta();

    //Actualizamos total
    actualizarTotalCarrito();
    
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();
    actualizarTipoVenta()

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    // var carritoItems = document.getElementsByClassName('carrito-items')[0];
    var carritoItems = document.querySelectorAll('#carrito-items')[0];
    if(carritoItems.childElementCount==0){
        // var carrito = document.getElementsByClassName('carrito')[0];
        var carrito = document.querySelectorAll('#carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        // var items =document.getElementsByClassName('contenedor-items')[0];
        var items =document.querySelectorAll('#contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrito, valores para bd y descripciones
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.querySelectorAll('#carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
    
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        //valor total de todos los productos del carrito
        total = total + (precio * cantidad)
    }
    
    total = Math.round(total * 100)/100;
    var valrSF=total;
    console.log( 'este es el total redondeado '+total);

    // input BD__________________________________
    //valor de valor
    var precioNetoElement2 = document.querySelector('#valor'); 
    // Asignar el valoral atributo "value" del input
    precioNetoElement2.value = total
    console.log( 'este es el value de valor '+precioNetoElement2.value);

    // valor sin formato______________________________
    var precioNetoElement3 = document.querySelector('#valor_total'); 
    precioNetoElement3 = total;
    precioNetoElement3.value = total
    console.log( 'este es el value de valor sin formato '+precioNetoElement3.value);

    document.getElementById('descuentos').value = 0;
    document.getElementById('valorTotalF').value = '$' + total.toLocaleString("es") + ",00";
    document.getElementById('valor').value = total;
    document.getElementById('valor_total').value = total;
    
    //actualizar descripcion
    actualizarDescripcion();
}

//funcion apra aplicar descuento
  function aplicarDescuento() {
    // Obtener el input del descuento
    const descuentosInput = document.getElementById('descuentos');
    const descuentoValor = parseFloat(descuentosInput.value);

    // Obtener el precio neto actual
    const precioNetoElement = document.querySelector('#valor'); 
    var precioNetoElement2 = document.querySelector('#valor_total'); 
    const precioNetoString = precioNetoElement.value; // Obtenemos el texto del elemento
    // Eliminar el signo de dólar y los puntos
    const precioSinSimbolos = precioNetoString.replace(/\$/g, '').replace(/\./g, '');

    // Eliminar las comas y los dos últimos ceros
    const precioNumerico = precioSinSimbolos.replace(/,00$/g, '');
    // Convertir a número (opcional, si necesitas realizar cálculos numéricos)
    const precioFinal = parseInt(precioNumerico);

    //  // Calcular el total con el descuento__________________________________operacion matematica
     const total = precioFinal - descuentoValor;

     // input BD__________________________________
     const totalRedondeado = Math.round(total);
         // Asignar el valor redondeado al input
     precioNetoElement2.value = totalRedondeado 

    //  // Actualizar el precio total en el HTML
    var precioTotalElement = document.querySelector('#valorTotalF');
    // precioTotalElement.value = totalRedondeado;
    precioTotalElement.value =  '$' + total.toLocaleString("es") + ",00"

    alert('Descuento aplicado correctamente.' + precioTotalElement.value);
}
// boton que aplica el descuento
document.getElementById('aplicarDesc').addEventListener('click', (event) => {
    event.preventDefault();
    aplicarDescuento();
});


//actualiza la descripcon de la BD
function actualizarDescripcion() {
    var carritoContenedor = document.getElementById('carrito');
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var descripcion = ''; // Inicializamos la descripción como una cadena vacía

    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var titulo = item.querySelector('.carrito-item-titulo').textContent;
        var precio = parseFloat(item.querySelector('.carrito-item-precio').textContent.replace('$', '').replace('.', ''));
        var cantidad = item.querySelector('.carrito-item-cantidad').value;

        var precioFormateado = precio.toLocaleString('es-CO', { minimumFractionDigits: 0 });

        descripcion += `${titulo} x ${cantidad} - $${precioFormateado}| `;
    }

    // document.querySelector('#descripcion').textContent = descripcion;
    // Asignar el valor al atributo 'value' del input y hacerlo de solo lectura
    document.querySelector('#descripcion').value = descripcion;
    document.querySelector('#descripcion').readOnly = true;
    
}
//actualiza tipo de venta
function actualizarTipoVenta() {
    const carritoItems = document.querySelectorAll('.carrito-item');
    let hayProductos = 0;
    let hayServicios = 0;

    carritoItems.forEach(item => {
        const tventa = item.querySelector('.carrito-item-tventa').textContent;
        if (tventa === 'producto') {
            hayProductos++;
        } else if (tventa === 'servicio') {
            hayServicios++;
        }
    });

    // Ahora las variables hayProductos y hayServicios contienen la cantidad de productos y servicios, respectivamente.
    console.log('Hay', hayProductos, 'productos y', hayServicios, 'servicios en el carrito.');

        // Condicionales para determinar el valor de tipoV
        let tipoV = '';
        if (hayProductos > 0 && hayServicios > 0) {
            tipoV = "Servicios + productos";
        } else if (hayProductos > 0 && hayServicios === 0) {
            tipoV = "Productos";
        } else if (hayProductos === 0 && hayServicios > 0) {
            tipoV = "Servicios";
        }
    
        // Ahora la variable tipoV contiene la descripción correcta según los productos y servicios en el carrito
        console.log("Tipo de venta:", tipoV);

        // Asignar el valor al atributo 'value' del input y hacerlo de solo lectura
        document.querySelector('#tipo_venta').value = tipoV;
        document.querySelector('#tipo_venta').readOnly = true;
}




