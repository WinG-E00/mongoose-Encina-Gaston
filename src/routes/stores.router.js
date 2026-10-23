import express from 'express';
import { actualizarStoreController, crearStoreController, deleteStoreController, obtenerStoresController } from '../controllers/stores.controller.js';
import { crearStoreValidator, actualizarStoreValidator, eliminarStoreValidator } from '../middlewares/validators/stores.validators.js';


const storeRouter = express.Router();




storeRouter.post('/store/createStore', crearStoreValidator ,crearStoreController )

storeRouter.get('/store/getAllStores',  obtenerStoresController );

storeRouter.put('/store/actualizarStore/:id', actualizarStoreValidator ,actualizarStoreController );

storeRouter.delete('/store/eliminarController/:id', eliminarStoreValidator ,deleteStoreController );


export default storeRouter;
