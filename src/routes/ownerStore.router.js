import express from 'express';

const routerOwnerStore = express.Router();


routerOwnerStore.post('/owner/createOwnerStore', createOwnerStore);

routerOwnerStore.get('/owner/getAllOwnersStore', getAllOwnerStore);

routerOwnerStore.put('/owner/updateOwnerStore/:id', updateOwnerStore);

routerOwnerStore.delete('/owner/getAllOwnerStore/:id', deleteOwnerStore);

export default routerOwnerStore;