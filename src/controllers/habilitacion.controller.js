import { HabilitacionModel } from "../models/habilitacion.js";



export const createHabilitacion = async (req, res) => {
    try{ 
        
        const { numero, actividad, vigencia, tienda } = req.body;
        const habilitacionCreada = await HabilitacionModel.create( { numero, actividad, vigencia, tienda } );


        return res.status(201).json({ "msg": "habilitacion creada", "data": habilitacionCreada })

    }catch(err){
        return res.status(500).json(err)
    }
};

export const getAllHabilitacion = async (req, res) => {
    try{ 
        
        const habilitaciones = await HabilitacionModel.find().populate('tienda', 'name location estado -_id');


        return res.status(200).json({ "msg": "Se obtuvieron todas las habilitaciones", "data": habilitaciones })


    }catch(err){
        return res.status(500).json(err)
    }
};

export const updateHabilitacion = async (req, res) => {
    try{ 
        
        const { id } = req.params;
        const { numero, actividad, vigencia, tienda } = req.body;

        const cambios = Object.fromEntries(
            Object.entries({ numero, actividad, tienda }).filter(([, value]) => value !== undefined)
        );
        for (const campo of ['fechaEmision', 'fechaVencimiento']) {
            if (vigencia?.[campo] !== undefined) {
                cambios[`vigencia.${campo}`] = vigencia[campo];
            }
        }
        
        const habiltacionActualizada = await HabilitacionModel.findByIdAndUpdate(
            id, { $set: cambios }, { new: true, runValidators: true }
        );

        return res.status(200).json({ "msg": "Se actualizo correctamente la Habilitacion", "data": habiltacionActualizada });

    }catch(err){
        return res.status(500).json(err)
    }
};


export const deleteHabilitacion = async (req, res) => {
    try{ 
        
        const { id } = req.params;

        const habilitacionBorrada =  await HabilitacionModel.findByIdAndDelete(id)
    
        return res.status(200).json({ "msg": "habilitacion borrada correctamente", "data": habilitacionBorrada })

        
    }catch(err){
        return res.status(500).json(err)
    }
};