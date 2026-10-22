import express from 'express';
import { actualizarStoreController, crearStoreController, deleteStoreController, obtenerStoresController } from '../controllers/stores.controller.js';


const storeRouter = express.Router();




storeRouter.post('/store/createStore', crearStoreController )

storeRouter.get('/store/getAllStores',  obtenerStoresController );

storeRouter.put('/store/actualizarStore/:id', actualizarStoreController );

storeRouter.delete('/store/eliminarController/:id', deleteStoreController );


export default storeRouter;
