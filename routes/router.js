const express = require('express')
const router = express.Router()

//conectamos al crud
const crud = require('../controllers/crud');

//conectamos al LA BBDD
const conexion = require('../database/db');

//conectamos a authController( autenticacion de usuario)
const authController = require('../controllers/authController');

//CONEXION A LAS VISTAS CONSTANTES
const {vistaIndex, vistaLogin, vistaPrincipal, vistaUsuarios,vCreateUsuario,veditUsuario,vistaClientes,vCreateClient,veditClient,vistaProd,vCreateProduct,veditProd,vistaCitas,vCreateCita,vEditCita,vistaFactProd,vCreateFactProd,vEditFactProd,vistaFactServ,vCreateFactServ,vEditFactServi} = require('../controllers/PageControllers')


// ROUTER.GET PARA LAS VISTAS ---------------------------------------|

//RUTA MENU PRINCIPAL PARA USUARIOS AUTENTICADOS-----------|
router.get('/home', authController.isAutenticated, vistaPrincipal)

//***************** */ RUTA PRIMERA PAGINA QUE CARGA---______________**********************************|
router.get('/', vistaIndex)
//***************** */ RUTA PRIMERA PAGINA QUE CARGA---______________**********************************|




// RUTA LOGIN---|
router.get('/login', vistaLogin)

//RUTA USUARIOS----------------|
router.get('/usuarios',authController.isAutenticated,vistaUsuarios)
router.get('/usuariosCreate',authController.isAutenticated, vCreateUsuario)
router.get('/usuariosEdit/:id',authController.isAutenticated, veditUsuario)

//RUTA CLIENTES----------------|
router.get('/clientes',authController.isAutenticated, vistaClientes)
router.get('/clientesCreate',authController.isAutenticated, vCreateClient)
router.get('/clientesEdit/:id',authController.isAutenticated, veditClient)

//RUTA PRODUCTOS---------------|
router.get('/productos',authController.isAutenticated, vistaProd)
router.get('/productosCreate',authController.isAutenticated, vCreateProduct)
router.get('/productosEdit/:id',authController.isAutenticated, veditProd)

//RUTA CITAS------------------|
router.get('/citas',authController.isAutenticated,vistaCitas)
router.get('/citasCreate',authController.isAutenticated, vCreateCita)
router.get('/citasEdit/:id',authController.isAutenticated,vEditCita)

//RUTA FACTURA PRODUCTO-------|
router.get('/factProd',authController.isAutenticated, vistaFactProd)
router.get('/factProdCreate',authController.isAutenticated,vCreateFactProd)
router.get('/factProdEdit/:id',authController.isAutenticated,vEditFactProd)

//RUTA FACTURA PRODUCTO------|
router.get('/factServi',authController.isAutenticated,vistaFactServ)
router.get('/factServiCreate',authController.isAutenticated,vCreateFactServ)
router.get('/factServiEdit/:id',authController.isAutenticated,vEditFactServi)

// ROUTER.POST PARA LOS METODOS  --------------------------------------------|

//METODOS PARA AUTENTICACION DE USUARIOS------|
router.post('/register',authController.register)
router.post('/login',authController.login)
router.get('/logout',authController.logout)//REDIRECCIONA AL LOGIN

//METODOS DEL CRUD----------------------------------------|
//usuarios
router.post('/saveUsuario',crud.saveUsuario);// ya no se usa
router.post('/register',authController.register)//autenticacion de registro deusuario
router.post('/updateUsuario', crud.updateUsuario);
//clientes
router.post('/saveCliente',crud.saveCliente);
router.post('/updateCliente', crud.updateCliente);
//productos
router.post('/saveProducto',crud.saveProducto);
router.post('/updateProducto', crud.updateProducto);
//citas
router.post('/saveNewCita',crud.saveNewCita);
router.post('/updateCita', crud.updateCita );
//factura productos
router.post('/saveFactProd',crud.saveFactProd);
router.post('/updateFactProd', crud.updateFactProd);
//factura servicios
router.post('/saveFactServ',crud.saveFactServ);
router.post('/updateFactServ', crud.updateFactServ);

///RUTAS PARA ELIMINAR DATOS------------------------------------------------------------------------------|
//ELIMINAR USUARIOS  
router.get('/deleteUsuario/:id',(req, res )=>{
    const id = req.params.id;
    conexion.query('DELETE FROM usuarios WHERE id = ?', [id], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/usuarios');
        }
    })
    conexion.query('CALL ReiniciarAutoIncrement()');
});

//ELIMINAR CLIENTE 
router.get('/deleteCliente/:id',(req, res )=>{
    const id = req.params.id;
    conexion.query('DELETE FROM cliente WHERE id = ?', [id], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/clientes');
        }
    })
    conexion.query('CALL ReiniciarAutoInCliente()');
});

//ELIMINAR PRODUCTO 

router.get('/deleteProducto/:id',(req, res )=>{
    const id = req.params.id;
    conexion.query('DELETE FROM productos WHERE id = ?', [id], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/productos');
        }
    })
    conexion.query('CALL ReiniciarAutoInProductos()');
});

//ELIMINAR CITA
router.get('/deleteCita/:id',(req, res )=>{
    const id = req.params.id;
    conexion.query('DELETE FROM citas WHERE id = ?', [id], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/citas');
        }
    })
    conexion.query('CALL ReiniciarAutoInCitas()');
});

//ELIMINAR FACTURA PRODUCTO
router.get('/deleteFactProd/:id',(req, res )=>{
    const id = req.params.id;
    conexion.query('DELETE FROM factura_producto WHERE id = ?', [id], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/factProd');
        }
    })
    conexion.query('CALL ReiniciarAutoInFact_producto()');
});

//ELIMINAR FACTURA SERVICIO
router.get('/deleteFactServ/:id',(req, res )=>{
    const id = req.params.id;
    conexion.query('DELETE FROM factura_servicio WHERE id = ?', [id], (error,results)=>{
        if(error){
            throw error;
        }else{
            res.redirect('/factServi');
        }
    })
    conexion.query('CALL ReiniciarAutoInFact_servicio()');
});


//--------------RUTA PARA FILTRAR DATOS----------------------------------------------------------|

//CITAS
router.post('/filtrar', (req, res) => {
    // Obtener las fechas desde y hasta del cuerpo de la solicitud
    const fechaDesde = req.body.fechaDesde;
    const fechaHasta = req.body.fechaHasta;

    // Realizar la consulta a la base de datos con las fechas formateadas
    conexion.query('SELECT id, DATE_FORMAT(fecha,"%d/%m/%Y") AS fecha, TIME_FORMAT(hora,"%H:%i") as hora, estado, servicio, CONCAT("$ ", FORMAT(valor_cita, 0)) AS Valor_Cita, nombre_cliente, barbero, sede FROM citas WHERE fecha BETWEEN ? AND ?', [fechaDesde, fechaHasta], (error, results) => {
        if (error) {
            console.error('Error al filtrar los datos:', error);
            res.status(500).send('Error al filtrar los datos');
        } else {
            // Enviar los resultados de la consulta al cliente en formato JSON
            res.json(results);
        }
    });
});

// FACTURA PRODUCTOS

router.post('/filtrarFactProd', (req, res) => {
    // Obtener las fechas desde y hasta del cuerpo de la solicitud
    const fechaDesde = req.body.fechaDesde;
    const fechaHasta = req.body.fechaHasta;

    // Realizar la consulta a la base de datos con las fechas formateadas
    conexion.query('SELECT id,DATE_FORMAT(fecha,"%d/%m/%Y") AS fecha,TIME_FORMAT(hora,"%H:%i") as hora,producto,nombre_cliente,CONCAT("$ ", FORMAT(valor_factura, 0)) AS valor_factura,nombre_vendedor,sede FROM factura_producto WHERE fecha BETWEEN ? AND ?', [fechaDesde, fechaHasta], (error, results) => {
        if (error) {
            console.error('Error al filtrar los datos:', error);
            res.status(500).send('Error al filtrar los datos');
        } else {
            // Enviar los resultados de la consulta al cliente en formato JSON
            res.json(results);
        }
    });
});
// FACTURA SERVICIOS

router.post('/filtrarFactServicios', (req, res) => {
    // Obtener las fechas desde y hasta del cuerpo de la solicitud
    const fechaDesde = req.body.fechaDesde;
    const fechaHasta = req.body.fechaHasta;

    // Realizar la consulta a la base de datos con las fechas formateadas
    conexion.query('SELECT id,DATE_FORMAT(fecha,"%d/%m/%Y") AS fecha,TIME_FORMAT(hora,"%H:%i") as hora,servicio,nombre_cliente,CONCAT("$ ", FORMAT(valor_factura, 0)) AS valor_factura,nombre_vendedor,sede FROM factura_servicio WHERE fecha BETWEEN ? AND ?', [fechaDesde, fechaHasta], (error, results) => {
        if (error) {
            console.error('Error al filtrar los datos:', error);
            res.status(500).send('Error al filtrar los datos');
        } else {
            // Enviar los resultados de la consulta al cliente en formato JSON
            res.json(results);
        }
    });
});



module.exports ={routes: router}




