import express from 'express';
import { createOwner, deleteOwner, getAllOwners, updateOwner } from '../controllers/onwer.controller.js';

const routerOwner = express.Router();



routerOwner.post('/owner/createOwner', createOwner);

routerOwner.get('/owner/getAllOwners', getAllOwners);

routerOwner.put('/owner/updateOwner/:id', updateOwner);

routerOwner.delete('/owner/deleteOwner/:id', deleteOwner);


export default routerOwner;