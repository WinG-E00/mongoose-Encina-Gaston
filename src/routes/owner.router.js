import { createOwner, getAllOwners, updateOwner, deleteOwner } from "../controllers/owner.controller.js";
import { crearOwnerValidator, actualizarOwnerValidator, eliminarOwnerValidator } from "../middlewares/validators/owners.validators.js";
import express from 'express';

const routerOwner = express.Router();



routerOwner.post('/owner/createOwner', crearOwnerValidator, createOwner);

routerOwner.get('/owner/getAllOwners', getAllOwners);

routerOwner.put('/owner/updateOwner/:id', actualizarOwnerValidator, updateOwner);

routerOwner.delete('/owner/deleteOwner/:id', eliminarOwnerValidator, deleteOwner);


export default routerOwner;
