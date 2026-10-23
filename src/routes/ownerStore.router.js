import { createOwnerStore, getAllOwnersStore, updateOwnerStore, deleteOwnerStore } from "../controllers/ownerStore.controller.js";
import { crearOwnerStoreValidator, actualizarOwnerStoreValidator, eliminarOwnerStoreValidator } from "../middlewares/validators/ownerStore.validators.js";
import express from 'express';

const routerOwnerStore = express.Router();


routerOwnerStore.post('/owner/createOwnerStore', crearOwnerStoreValidator, createOwnerStore);

routerOwnerStore.get('/owner/getAllOwnersStore', getAllOwnersStore);

routerOwnerStore.put('/owner/updateOwnerStore/:id', actualizarOwnerStoreValidator, updateOwnerStore);

routerOwnerStore.delete('/owner/getAllOwnerStore/:id', eliminarOwnerStoreValidator, deleteOwnerStore);

export default routerOwnerStore;