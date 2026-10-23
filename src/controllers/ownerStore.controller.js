import { OwnerStoreModel } from "../models/ownerStore.model.js";





export const createOwnerStore = async (req, res) => {
    try {

        const { owner, store } = req.body;

        const OwnerStoreCreado = await OwnerStoreModel.create({ owner, store });

        res.status(201).json({ "msg": "Se creo correctamente la relacion", OwnerStoreCreado })

    }catch(err){
        return res.status(500).json()
    }
}


export const getAllOwnersStore = async (req, res) => {
    try {

        const AllOwnerStore = await OwnerStoreModel.find();
        
        res.status(200).json()

    }catch(err){
        return res.status(500).json()
    }
}


export const updateOwnerStore = async (req, res) => {
    try {

        const { id } = req.params;
        const { owner, store } = req.body;

        const relacionActualizada = await OwnerStoreModel.findByIdAndUpdate(id, { owner, store } )

        res.status(200).json()

    }catch(err){
        return res.status(500).json()
    }
}


export const deleteOwnerStore = async (req, res) => {
    try {
        
        const { id } = req.params;

        const relacionBorrada = await OwnerStoreModel.findByIdAndDelete(id)

        return res.status(200).json()

    }catch(err){
        return res.status(500).json()
    }
}