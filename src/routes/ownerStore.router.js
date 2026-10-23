import express from 'express';
import { createOwnerStore, getAllOwnersStore } from '../controllers/ownerStore.controller.js';

const routerOwnerStore = express.Router();


routerOwnerStore.post('/owner/createOwnerStore', createOwnerStore);

routerOwnerStore.get('/owner/getAllOwnersStore', getAllOwnersStore);

routerOwnerStore.put('/owner/updateOwnerStore/:id', updateOwnerStore);

routerOwnerStore.delete('/owner/getAllOwnerStore/:id', deleteOwnerStore);

export default routerOwnerStore;