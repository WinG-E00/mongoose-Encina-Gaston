import express from 'express'
import "dotenv/config";


//Cors es para permitir que solo ciertos origenes puedan realizar ciertas consultas en tu servidor 
import cors from "cors";

// Sirve para guardar ciertos parametros en las cookies  
import cookieParser from "cookie-parser";

import startDB from './src/config/database.js';
import storeRouter from './src/routes/stores.router.js';
import routerHabilitacion from './src/routes/habilitacion.router.js';
import routerOwner from './src/routes/owner.router.js';
import routerOwnerStore from './src/routes/ownerStore.router.js';
import routerProducts from './src/routes/products.router.js';


//Variables
const PORT = process.env.PORT


//
const app = express()


// Configuracion de el app
app.use(cors());
app.use(cookieParser());
app.use(express.json());



//Configuracion de el router
app.use('/api', storeRouter )
app.use('/api', routerHabilitacion )
app.use('/api', routerOwner )
app.use('/api', routerOwnerStore )
app.use('/api', routerProducts )



//Testeo de ruta basica para comprobar estado del servidor
app.get('/test', (req, res) => {
  res.send('Ok')
})


//Levantar servidor
app.listen(PORT, async ( ) => {

    try {
        startDB();

        console.log("se levanto correctamente el servidor en el puerto", PORT);

    } catch(error){
        console.log('Hubo un error al intentar levantar el servidor en el puerto', PORT)
    }

})