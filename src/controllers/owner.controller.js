import { OwnerModel } from "../models/owner.js";



export const createOwner = async (req, res) => {
    try {

        const { name } = req.body;

        const ownerCreado =  await OwnerModel.create( { name } );

        return res.status(201).json({ "msg": "Se creo correctamente el dueño", ownerCreado })

    }catch(err){
        return res.status(500).json()
    }
}; 

export const getAllOwners = async (req, res) => {
    try {

        const allOwners = await OwnerModel.find();

        return res.status(200).json({ "msg": "Se obtuvieron todos los dueños", allOwners })

    }catch(err){
        return res.status(500).json()
    }
}; 

export const updateOwner = async (req, res) => {
    try {

        const { id } = req.params;
        const { name } = req.body;
        
        const updatedOwner = await OwnerModel.findByIdAndUpdate(id, {name});

        return res.status(200).json({ "msg": "Se actualizaron los datos de el dueño", updatedOwner })

    }catch(err){
        return res.status(500).json()
    }
}; 

export const deleteOwner = async (req, res) => {
    try {

        const { id } = req.params;

        const deletedOnwer = await OwnerModel.findByIdAndDelete(id)

        return res.status(200).json({ "msg": "se elimino a un dueño", deletedOwner })

    }catch(err){
        return res.status(500).json()
    }
}; 
