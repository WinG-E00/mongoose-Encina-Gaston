import express from 'express';

const routerHabilitacion = express.Router();



routerHabilitacion.post('/habilitacion/createHabilitacion', createHabilitacion);

routerHabilitacion.get('/habilitacion/getAllHabilitacion', getAllOHabilitacion);

routerHabilitacion.put('/habilitacion/updateHabilitacion/:id', updateHabilitacion);

routerHabilitacion.delete('/habilitacion/deleteHabilitacion/:id', deleteHabilitacion);


export default routerHabilitacion;