const express = require('express');
//-------------------------------------------------------login
const dotenv = require('dotenv');//para variables de entorno login
const cookieParser = require('cookie-parser') //para las cookies de login

//seteamos las variables de entorno
dotenv.config({path:'./env/.env'})

//-------------------------------------------------------login
const path = require('path');//para reconocer archivos planos
const expressLayouts = require('express-ejs-layouts');
const app = express();

app.set('view engine', 'ejs');

// procesar datos enviados desde los formularios
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//----------------------------------------------|

app.use(expressLayouts);

//para leer el  index.html
// app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(__dirname, { root: './' }));



//para el archivo CSS---------|

app.use(express.static(path.join(__dirname, 'public')));



// fin configuracion archivo CSS---------------------------------------|

//setear las cookies
app.use(cookieParser())

//para eliminar el cache y que no se pueda volver con el boton de back luego de que hacemos un logout
// Middlewares para eliminar la caché y verificar la autenticación
const eliminarCache = (req, res, next) => {
    if (!req.usuario) {
        res.header('Cache-Control', 'no-store, private, no-cache, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
    }
    next();
};

const verificarAutenticacion = (req, res, next) => {
    if (req.usuario) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Utilizamos los middlewares antes de configurar las rutas
app.use(eliminarCache);

// Utilizamos el router
const router = require('./routes/router');
app.use(router.routes);

// Middleware para eliminar la caché y evitar el botón de retroceso después del logout
app.use(function(req,res,next){
    if(!req.usuario)
    res.header('Cache-Control: no-store','private','no-cache','no-store','must-revalidate');
    next();
});

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
});

app.listen(5000,()=>{
    console.log('SERVER corriendo en http://localhost:5000');
});

