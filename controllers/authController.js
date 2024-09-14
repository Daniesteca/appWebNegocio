const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion =require('../database/db')
const{promisify} = require('util')

// metodo para registrarse
exports.register = async (req, res)=>{

    try{
        const nombre = req.body.nombre;
        const email = req.body.email;
        const usuario = req.body.usuario;
        const password = req.body.password;
        const rol = req.body.rol;
        const sede = req.body.sede;
        let passHash = await bcryptjs.hash(password, 8)
        //console.log(passHash)
        conexion.query('INSERT INTO usuarios  SET ?',{nombre:nombre,email:email, usuario:usuario,password:passHash,rol:rol,sede:sede},(error, results)=>{
            if(error){console.log(error)}
            res.redirect('usuarios')
        })
    }catch(error) {
        console.log(error)
    }
}

// metodo para registrar cliente
exports.registerClient = async (req, res)=>{

    try{
        const nombre = req.body.nombre;
        const email = req.body.email;
        const usuario = req.body.usuario;
        const password = req.body.password;
        let passHash = await bcryptjs.hash(password, 8)
        //console.log(passHash)
        conexion.query('INSERT INTO cliente SET ?',{nombre:nombre,email:email, client_usu:usuario,client_pasw:passHash},(error, results)=>{
            if(error){console.log(error)}
            res.redirect('clientes')
        })
    }catch(error) {
        console.log(error)
    }
}

// metodo para loguearse
exports.login = async (req, res)=>{
    try{//- captura los datos y comprueba que existan en la bd y sean iguales
        const usuario = req.body.usuario
        const password = req.body.password
        // si los campos estan vacios
        if(!usuario || !password){
            res.render('login',{
                alert:true,
                alertTitle:"Advertencia",
                alertMessage:"Ingrese un usuario y password",
                alertIcon:'info',
                showConfirmButton:true,
                timer: false,
                ruta:'login',
                layout:false
            })
        }else{//si son incorrectos
            conexion.query('SELECT* FROM usuarios WHERE usuario=?',[usuario], async (error, results)=>{
                if(results.length == 0 || !(await bcryptjs.compare(password, results[0].password))){
                    res.render('login',{
                        alert:true,
                        alertTitle:"Error",
                        alertMessage:"Usuario y password Incorrectos",
                        alertIcon:'error',
                        showConfirmButton:true,
                        timer: false,
                        ruta:'login',
                        layout:false
                    }) 
                }else{
                    //inicio de sesion esta validado
                    const id = results[0].id
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO,{
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    //generar el token sin fecha de expiracion
                    //const token = jwt.sign({id:id}, process.env.JWT_SECRETO)
                    // console.log("TOKEN: "+token+" para el Usuario: "+usuario)

                    const cookiesOptions = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES* 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookiesOptions)
                    res.render('login',{
                        alert:true,
                        alertTitle:"Conexion Exitosa",
                        alertMessage:"LOGIN CORRECTO",
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 800,
                        ruta:'home',
                        layout:false
                    })
                }


            })
        }

    
    }catch(error){
        console.log(error)

    }
}

//corroborar si el usuario esta autenticado:
exports.isAutenticated = async(req, res, next)=>{
    if(req.cookies.jwt){
        try{
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT*FROM usuarios WHERE id = ?',[decodificada.id],(error,results)=>{
                if(!results){return next()}
                req.usuario = results[0]
                return next()
            })

        }catch(error){
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')//si no esta autenticando se envia al login
        
    }
}

exports.logout = (req, res)=>{
    res.clearCookie('jwt');
    res.clearCookie('phpMyAdmin');
    res.clearCookie('pma_lang');
    return res.redirect('/login')
}


exports.checkRole = async (req, res, next) => {
    try {
        const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO);
        conexion.query('SELECT rol FROM usuarios WHERE id = ?', [decodificada.id], (error, results) => {
            if (error) {
                console.error('Error al consultar el rol del usuario:', error);
                return res.status(500).send('Error en el servidor');
            }

            if (results.length > 0) {
                req.rol = results[0].rol;
                next();
            } else {
                res.redirect('/home');
            }
        });
    } catch (error) {
        console.error('Error de autenticación:', error);
        return res.redirect('/login');
    }
};