import { StoreModel } from "../models/stores.model.js";





export const crearStoreController = async (req, res) => {

    try {

        const { name, location, estado } = req.body;

        const tienda = await StoreModel.create({
            name,
            location,
            estado
        })

        return res.status(201).json({ "msg":"tienda creada correctamente", "data":tienda })

    }catch(err){

        return res.status(500).json({ "msg": "Hubo un error al intentar crear la tienda", err })

    }

};



export const obtenerStoresController =  async(req, res) => {

    try {
        
        const allStores = await StoreModel.find();

        return res.status(200).json({ "msg": "Operacion realizada con exito", "data": allStores })


    }catch(err){
        res.status(500).json({
            "msg": "Error al hacer la consulta",
            err
        })
    }

};



export const actualizarStoreController = async(req, res) => {
    try{

        const { id } =  req.params;

        const { name, location, estado } = req.body;

        const tiendaActualizada = await StoreModel.findByIdAndUpdate(id, { name, location, estado }, {new: true, runValidators: true});


        
        if (!tiendaActualizada) {
            return res.status(404).json({
                "msg": "No se encontro la tienda"
            })
        }

        return res.status(200).json({ "msg": "Tienda actualizada correctamente", tiendaActualizada })

    }catch(err){
        return res.status(500).json({ "msg": "Hubo un error al intentar actualizar la tienda", err })
    }
};



export const deleteStoreController = async (req, res) => {
    try {

        const { id } = req.params;


        const storeEliminada = await StoreModel.findByIdAndDelete(id);


        if(!storeEliminada){
            return res.status(404).json({ "msg": "No se encontro ninguna ninguna tienda" })
        }


        return res.status(200).json({ msg: "Tienda eliminada correctamente" });


    } catch(err){
        return res.status(500).json({ "msg": "Hubo un error al intentar eliminar la tienda", err})
    }
};


