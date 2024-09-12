const conexion = require('../database/db');
//CONTROLES DE VENTAS------------------------------------------------|
//GUARDAR LOS DATOS
exports.saveVenta=(req,res)=>{
    const nombre_cliente = req.body.nombre_cliente;
    const tipo_venta = req.body.tipo_venta;
    const descripcion = req.body.descripcion;
    const valor = req.body.valor;
    const descuentos = req.body.descuentos;
    const id_vendedor= req.body.id_vendedor;
    const vendedor = req.body.vendedor;
    const sede = req.body.sede;
    const valor_total = req.body.valor_total;

    conexion.query('INSERT INTO ventas SET ?',{nombre_cliente:nombre_cliente,tipo_venta:tipo_venta,descripcion:descripcion,valor:valor,descuentos:descuentos,id_vendedor:id_vendedor,vendedor:vendedor,sede:sede,valor_total:valor_total},(error,results)=>{
        if(error){0
            console.log(error);
        } else{
            console.log(results);
            res.redirect('ventas');
        }
    })
};

///ACTUALIZAR LOS DATOS
exports.updateVenta = (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const email = req.body.email;
    const usuario = req.body.usuario;
    const password = req.body.password;
    const rol = req.body.rol;


    conexion.query('UPDATE ventas SET ? WHERE id = ?',[{nombre:nombre, email:email, usuario:usuario, password:password, rol:rol}, id],(error,results)=>{
        if(error){
            console.log(error);
        } else{
            res.redirect('ventas');
        }
    })

};





//CONTROLES DE USUARIOS------------------------------------------------|
//GUARDAR LOS DATOS
exports.saveUsuario=(req,res)=>{
    const nombre = req.body.nombre;
    const email = req.body.email;
    const usuario = req.body.usuario;
    const password = req.body.password;
    const rol = req.body.rol;
    const sede = req.body.sede;
    conexion.query('INSERT INTO usuarios SET ?',{nombre:nombre,email:email, usuario:usuario,password:password,rol:rol,sede:sede},(error,results)=>{
        if(error){
            console.log(error);
        } else{
            res.redirect('usuarios');
        }
    })
};

///ACTUALIZAR LOS DATOS
exports.updateUsuario = (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const email = req.body.email;
    const usuario = req.body.usuario;
    const password = req.body.password;
    const rol = req.body.rol;
    const sede = req.body.sede;


    conexion.query('UPDATE usuarios SET ? WHERE id = ?',[{nombre:nombre, email:email, usuario:usuario, password:password, rol:rol, sede:sede}, id],(error,results)=>{
        if(error){
            console.log(error);
        } else{
            res.redirect('usuarios');
        }
    })

};



//CONTROLES DE CLIENTES------------------------------------------------|
//GUARDAR LOS DATOS
exports.saveCliente=(req,res)=>{
    const nombre = req.body.nombre;
    const email = req.body.email;
    const usuario = req.body.usuario;
    const password = req.body.password;
    // const rol = req.body.rol;
    conexion.query('INSERT INTO cliente SET ?',{nombre:nombre,email:email, client_usu:usuario,client_pasw:password},(error,results)=>{
        if(error){
            console.log(error);
        } else{
            res.redirect('clientes');
        }
    })
};

///ACTUALIZAR LOS DATOS
exports.updateCliente = (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const email = req.body.email;
    const usuario = req.body.usuario;
    const password = req.body.password;
    // const rol = req.body.rol;

    
    conexion.query('UPDATE cliente SET ? WHERE id = ?',[{nombre:nombre, email:email, client_usu:usuario,client_pasw:password}, id],(error,results)=>{
        if(error){
            console.log(error);
        } else{
            res.redirect('clientes');
        }
    })

};

//CONTROLES DE PRODUCTOS------------------------------------------------|

// GUARDAR LOS DATOS
exports.saveProducto=(req,res)=>{
    const nombre = req.body.nombre;
    const cantidad = req.body.cantidad;
    const valor = req.body.valor;
    const id_usuario = req.body.id_usuario;

    conexion.query('INSERT INTO productos SET ?',{nombre:nombre,cantidad:cantidad, valor:valor, id_usuario:id_usuario},(error,results)=>{
        if(error){
            console.log(error);
        } else{
            res.redirect('productos');
        }
    })
};

///ACTUALIZAR LOS DATOS
exports.updateProducto = (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const cantidad = req.body.cantidad;
    const valor = req.body.valor;
    const id_usuario = req.body.id_usuario;


    conexion.query('UPDATE productos SET ? WHERE id = ?',[{nombre:nombre, cantidad:cantidad, valor:valor, id_usuario:id_usuario}, id],(error,results)=>{
        if(error){
            console.log(error);
        } else{
            res.redirect('productos');
        }
    })

};

//CONTROLES DE CITAS------------------------------------------------|
// GUARDAR LOS DATOS 
exports.saveNewCita=(req,res)=>{
    const fecha = req.body.fecha;
    const hora = req.body.hora;
    const estado = req.body.estado;
    const servicio = req.body.servicio;
    const Valor_Cita = req.body.Valor_Cita;
    const nombre_cliente = req.body.nombre_cliente;
    const barbero = req.body.barbero;
    const sede = req.body.sede;
    conexion.query('INSERT INTO citas SET ?',{fecha:fecha, hora:hora, estado:estado, servicio:servicio, Valor_Cita:Valor_Cita, nombre_cliente:nombre_cliente, barbero:barbero, sede:sede},(error,results)=>{
        if(error){
            console.log(error);
        } else{
            res.redirect('/citas');
        }
    })
};

///ACTUALIZAR LOS DATOS
exports.updateCita = (req, res)=>{
    const id = req.body.id;
    const fecha = req.body.fecha;
    const hora = req.body.hora;
    const estado = req.body.estado;
    const servicio = req.body.servicio;
    const Valor_Cita = req.body.Valor_Cita;
    const nombre_cliente = req.body.nombre_cliente;
    const barbero = req.body.barbero;
    const sede = req.body.sede;

    /*const updateData = { nombre, email, usuario, password, rol };*/

    conexion.query('UPDATE citas SET ? WHERE id = ?',[{fecha:fecha, hora:hora, estado:estado, servicio:servicio, Valor_Cita:Valor_Cita, nombre_cliente:nombre_cliente, barbero:barbero, sede:sede}, id],(error,results)=>{
        if(error){
            console.log(error);
        } else{
            res.redirect('/citas');
        }
    })

};

//CONTROLES DE FACTURA PRODUCTOS------------------------------------------------|//CONTROL PARA GUARDAR LOS DATOS
exports.saveFactProd=(req,res)=>{
    const fecha = req.body.fecha;
    const hora = req.body.hora;
    const producto = req.body.producto;
    const id_producto = req.body.id_producto;
    const id_cliente = req.body.id_cliente;
    const nombre_cliente = req.body.nombre_cliente;
    const valor_factura = req.body.valor_factura;
    const nombre_vendedor = req.body.nombre_vendedor;
    const sede = req.body.sede;
    conexion.query('INSERT INTO factura_producto SET ?',{fecha:fecha, hora:hora, producto:producto, id_producto:id_producto, id_cliente:id_cliente, nombre_cliente:nombre_cliente, valor_factura:valor_factura, nombre_vendedor:nombre_vendedor, sede:sede},(error,results)=>{
        if(error){
            console.log(error);
        } else{
            res.redirect('/factProd');
        }
    })
};

///CONTROL PARA ACTUALIZAR LOS DATOS
exports.updateFactProd = (req, res)=>{
    const id = req.body.id;
    const fecha = req.body.fecha;
    const hora = req.body.hora;
    const producto = req.body.producto;
    const id_producto = req.body.id_producto;
    const id_cliente = req.body.id_cliente;
    const nombre_cliente = req.body.nombre_cliente;
    const valor_factura = req.body.valor_factura;
    const nombre_vendedor = req.body.nombre_vendedor;
    const sede = req.body.sede;

    /*const updateData = { nombre, email, usuario, password, rol };*/

    conexion.query('UPDATE factura_producto SET ? WHERE id = ?',[{fecha:fecha, hora:hora, producto:producto, id_producto:id_producto, id_cliente:id_cliente, nombre_cliente:nombre_cliente, valor_factura:valor_factura, nombre_vendedor:nombre_vendedor, sede:sede}, id],(error,results)=>{
        if(error){
            console.log(error);
        } else{
            res.redirect('/factProd');
        }
    })

};

//CONTROLES DE FACTURA SERVICIOS------------------------------------------------|//CONTROL PARA GUARDAR LOS DATOS
exports.saveFactServ=(req,res)=>{
    const fecha = req.body.fecha;
    const hora = req.body.hora;
    const servicio = req.body.servicio;
    const id_cita = req.body.id_cita;
    const id_cliente = req.body.id_cliente;
    const nombre_cliente = req.body.nombre_cliente;
    const valor_factura = req.body.valor_factura;
    const nombre_vendedor = req.body.nombre_vendedor;
    const sede = req.body.sede;
    conexion.query('INSERT INTO factura_servicio SET ?',{fecha:fecha, hora:hora, servicio:servicio, id_cita:id_cita, id_cliente:id_cliente, nombre_cliente:nombre_cliente, valor_factura:valor_factura, nombre_vendedor:nombre_vendedor, sede:sede},(error,results)=>{
        if(error){
            console.log(error);
        } else{
            res.redirect('/factServi');
        }
    })
};

///CONTROL PARA ACTUALIZAR LOS DATOS
exports.updateFactServ = (req, res)=>{
    const id = req.body.id;
    const fecha = req.body.fecha;
    const hora = req.body.hora;
    const servicio = req.body.servicio;
    const id_cita = req.body.id_cita;
    const id_cliente = req.body.id_cliente;
    const nombre_cliente = req.body.nombre_cliente;
    const valor_factura = req.body.valor_factura;
    const nombre_vendedor = req.body.nombre_vendedor;
    const sede = req.body.sede;

    /*const updateData = { nombre, email, usuario, password, rol };*/

    conexion.query('UPDATE factura_servicio SET ? WHERE id = ?',[{fecha:fecha, hora:hora, servicio:servicio, id_cita:id_cita, id_cliente:id_cliente, nombre_cliente:nombre_cliente, valor_factura:valor_factura, nombre_vendedor:nombre_vendedor, sede:sede}, id],(error,results)=>{
        if(error){
            console.log(error);
        } else{
            res.redirect('/factServi');
        }
    })

};



