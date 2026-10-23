import express from 'express';

const routerOwner = express.Router();



routerOwner.post('/owner/createOwner', createOwner);

routerOwner.get('/owner/getAllOwners', getAllOwners);

routerOwner.put('/owner/updateOwner/:id', updateOwner);

routerOwner.delete('/owner/deleteOwner/:id', deleteOwner);


export default routerOwner;