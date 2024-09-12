const express = require('express');
const router = express.Router();

const conexion = require('../database/db');
//PRIMERA PAGINA QUE CARGA INDEX----------------------------------------****|
const vistaIndex = (req, res)=>{
    res.render('index.html',{layout:false,alert:false})
}

// PAGINA PRINCIPAL O HOME-----------------------------------------------|
const vistaPrincipal =  (req, res)=>{
    res.render('home',{layout:true, usuario:req.usuario})
}


// PAGINA PARA INICIO SESION-----------------------------------------------|
const vistaLogin = (req, res)=>{
    res.render('login',{layout:false,alert:false})
}

//PAGINA DE CARRITO--------------------------------------------------------------------------------------------------|

const vistaCarrito = (req, res)=>{
    res.render('carritoVenta',{layout:true,usuario:req.usuario,alert:false})
}

//PPAGINA DE VENTAS----------------------------------------------------------------------------------------------|

//pagina principal VENTAS
const vistaVentas = (req, res)=>{
    conexion.query('SELECT id, CONCAT(DATE_FORMAT(fecha_hora, "%d/%m/%Y")," - ",TIME_FORMAT(fecha_hora, "%H:%i")) AS fecha_hora,id_venta,nombre_cliente,tipo_venta,descripcion,CONCAT("$", FORMAT(valor, 0)) AS valor , CONCAT("$", FORMAT(descuentos, 0)) AS descuentos, CONCAT("$", FORMAT(valor_total, 0)) AS valor_total,vendedor,sede FROM ventas',(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('ventas', { layout: true, results:results});
        }
    }) 
}

//IMPRIMIR CADA FACTURA DE VENTA______________________________________________________________________|
const ventaImprimirFact= (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT id, CONCAT(DATE_FORMAT(fecha_hora, "%d/%m/%Y")," - ",TIME_FORMAT(fecha_hora, "%H:%i")) AS fecha_hora,id_venta ,nombre_cliente , tipo_venta , descripcion , CONCAT("$", FORMAT(valor, 0)) AS valor , CONCAT("$", FORMAT(descuentos, 0)) AS descuentos, CONCAT("$", FORMAT(valor_total, 0)) AS valor_total,vendedor,sede FROM ventas WHERE id=?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('ventFactImpr', { layout: true, user:results[0]});
            // console.log(results);

        }
})
}


const vCreateVenta = (req, res)=>{
    res.render('ventasCreate')
}




//formulario editar venta
const veditVenta = (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM ventas WHERE id=?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('ventasEdit', { layout: true, user:results[0]});
        }
    })
} 

// FORMULARIOS PARA USUARIOS-----------------------------------------------|
//pagina principal usuarios
const vistaUsuarios = (req, res)=>{
        conexion.query('SELECT * FROM usuarios',(error, results)=>{
            if(error){
                throw error;
            }else{
                res.render('usuarios', { layout: true, results:results});
            }
        }) 
}

//formulario crear usuarios
const vCreateUsuario = (req, res)=>{
    res.render('usuariosCreate')
}

//formulario editar usuarios
 const veditUsuario = (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM usuarios WHERE id=?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('usuariosEdit', { layout: true, user:results[0]});
        }
    })
} 

// FORMULARIOS PARA CLIENTES-----------------------------------------------|
//pagina principal CLIENTES
const vistaClientes= (req, res)=>{
        conexion.query('SELECT * FROM cliente',(error, results)=>{
            if(error){
                throw error;
            }else{
                res.render('clientes', { layout: true, results:results});
            }
        }) 
    }

//formulario crear CLIENTES

const vCreateClient = (req, res)=>{
    res.render('clientesCreate')
}

//formulario editar CLIENTES

const veditClient = (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM cliente WHERE id=?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('clientesEdit', { layout: true, user:results[0]});
        }
})
} 

// FORMULARIOS PARA PRODUCTOS-----------------------------------------------|
//principal 
const  vistaProd = (req, res)=>{
    conexion.query('SELECT * FROM productos',(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('productos', { layout: true, results:results});
        }
    }) 

}
//CREAR PRODUCTOS
const vCreateProduct = (req, res)=>{
    res.render('productosCreate')
}

//EDITAR PRODUCTOS
const veditProd = (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM productos WHERE id=?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('productosEdit', { layout: true, user:results[0]});
        }
})
}

// FORMULARIOS PARA CITAS-----------------------------------------------|
//principal 
const vistaCitas = (req, res)=>{

    conexion.query('SELECT id,DATE_FORMAT(fecha,"%d/%m/%Y") AS fecha,TIME_FORMAT(hora,"%H:%i") as hora,estado,servicio,CONCAT("$ ", FORMAT(valor_cita, 0)) AS Valor_Cita,nombre_cliente,barbero,sede FROM citas',(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('citas', { layout: true, results:results});
        }
    }) 

}

//CREAR CITAS
const vCreateCita = (req, res)=>{
    res.render('citasCreate')
}

//EDITAR CITAS

const vEditCita =  (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT id,DATE_FORMAT(fecha,"%d/%m/%Y") AS fecha,TIME_FORMAT(hora,"%H:%i") as hora,estado,servicio,Valor_Cita,nombre_cliente,barbero,sede FROM citas WHERE id=?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('citasEdit', { layout: true, user:results[0]});
        }
})
}

// FORMULARIOS PARA FACTURA PRODUCTO-----------------------------------------------|
//principal 
const vistaFactProd = (req, res)=>{

    conexion.query('SELECT id,DATE_FORMAT(fecha,"%d/%m/%Y") AS fecha,TIME_FORMAT(hora,"%H:%i") as hora,producto,nombre_cliente,CONCAT("$ ", FORMAT(valor_factura, 0)) AS valor_factura,nombre_vendedor,sede FROM factura_producto',(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('factProd', { layout: true, results:results});
        }
    }) 

}


//CREAR FACTURA_PRODUCTO
const vCreateFactProd = (req, res)=>{
    res.render('factProdCreate')
}


//EDITAR FACTURA_PRODUCTO
const vEditFactProd = (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT id,DATE_FORMAT(fecha,"%d/%m/%Y") AS fecha,TIME_FORMAT(hora,"%H:%i") as hora,producto,id_producto,id_cliente,nombre_cliente,CONCAT("$ ", FORMAT(valor_factura, 0)) AS valor_factura,nombre_vendedor,sede FROM factura_producto WHERE id=?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('factProdEdit', { layout: true, user:results[0]});
        }
})
}

//imprimir factura servicio
const vImprimirFactProd = (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT id,DATE_FORMAT(fecha,"%d/%m/%Y") AS fecha,TIME_FORMAT(hora,"%H:%i") as hora,producto,id_producto,id_cliente,nombre_cliente,CONCAT("$ ", FORMAT(valor_factura, 0)) AS valor_factura,nombre_vendedor,sede FROM factura_producto WHERE id=?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('factProdImpr', { layout: true, user:results[0]});
            // console.log(results);

        }
})
}




// FORMULARIOS PARA FACTURA SERVICIO-----------------------------------------------|
//principal 
const vistaFactServ = (req, res)=>{

    conexion.query('SELECT id,DATE_FORMAT(fecha,"%d/%m/%Y") AS fecha,TIME_FORMAT(hora,"%H:%i") as hora,servicio,nombre_cliente,CONCAT("$ ", FORMAT(valor_factura, 0)) AS valor_factura,nombre_vendedor,sede FROM factura_servicio',(error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('factServi', { layout: true, results:results});
        }
    }) 

}

//CREAR FACTURA_PRODUCTO
const vCreateFactServ = (req, res)=>{
    res.render('factServiCreate')
}


//EDITAR FACTURA_PRODUCTO
const vEditFactServi =  (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT id,DATE_FORMAT(fecha,"%d/%m/%Y") AS fecha,TIME_FORMAT(hora,"%H:%i") as hora,servicio,id_cita,id_cliente,nombre_cliente,CONCAT("$ ", FORMAT(valor_factura, 0)) AS valor_factura,nombre_vendedor,sede FROM factura_servicio WHERE id=?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('factServiEdit', { layout: true, user:results[0]});
        }
})
}

//imprimir factura servicio
const vImprimirFactServ = (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT id,DATE_FORMAT(fecha,"%d/%m/%Y") AS fecha,TIME_FORMAT(hora,"%H:%i") as hora,producto,id_producto,id_cliente,nombre_cliente,CONCAT("$ ", FORMAT(valor_factura, 0)) AS valor_factura,nombre_vendedor,sede FROM factura_producto WHERE id=?',[id], (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('factProdImpr', { layout: true, user:results[0]});
            // console.log(results);

        }
})
}


module.exports ={
    vistaIndex,
    vistaLogin,
    vistaPrincipal,
    vistaCarrito,
    vistaVentas,
    vCreateVenta,
    veditVenta,
    vistaUsuarios,
    vCreateUsuario,
    veditUsuario,
    vistaClientes,
    vCreateClient,
    veditClient,
    vistaProd,
    vCreateProduct,
    veditProd,
    vistaCitas,
    vCreateCita,
    vEditCita,
    vistaFactProd,
    vCreateFactProd,
    vEditFactProd,
    vImprimirFactProd,
    vistaFactServ,
    vCreateFactServ,
    vEditFactServi,
    vImprimirFactServ,
    ventaImprimirFact
}
