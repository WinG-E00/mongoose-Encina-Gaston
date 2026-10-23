import { createHabilitacion, getAllHabilitacion, updateHabilitacion, deleteHabilitacion } from "../controllers/habilitacion.controller.js";
import { crearHabilitacionValidator, actualizarHabilitacionValidator, eliminarHabilitacionValidator } from "../middlewares/validators/habilitacion.validators.js";
import express from 'express';

const routerHabilitacion = express.Router();



routerHabilitacion.post('/habilitacion/createHabilitacion', crearHabilitacionValidator, createHabilitacion);

routerHabilitacion.get('/habilitacion/getAllHabilitacion', getAllHabilitacion);

routerHabilitacion.put('/habilitacion/updateHabilitacion/:id', actualizarHabilitacionValidator, updateHabilitacion);

routerHabilitacion.delete('/habilitacion/deleteHabilitacion/:id', eliminarHabilitacionValidator, deleteHabilitacion);


export default routerHabilitacion;