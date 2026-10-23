import { ProductModel } from "../models/products.js";


const createProduct = async (req, res) => {

    try {

        const { name, price, stock, tienda } = req.body;
        const productoCreado = await ProductModel.create({ name, price, stock, tienda });
        return res.status(201).json({ "msg": "Se creo el producto correctamente", "data": productoCreado  })


    }catch(err){

        return res.status(500).json({ "msg": "Hubo un error al intentar crear el producto ", err })

    }

};



const getAllProduct = async (req, res) => {

    try {

        const productos = await ProductModel.find()
        return res.status(200).json({ "msg": "Se obtuvieron todos los productos", "data": productos });

    }catch(err){

        return res.status(500).json({ "msg": "Hubo un error al intentar obtener el producto", err })

    }

}



const updateProduct = async (req, res) => {

    try {

        const { id } = req.params;
        const { name, price, stock, tienda } = req.body;
        const productoActualizado = await ProductModel.findByIdAndUpdate( id, { name, price, stock, tienda } )

        return res.status(200).json({"msg": "Se actualizo correctamente el producto", productoActualizado})

    }catch(err){

        return res.status(500).json({ "msg": "Hubo un error al intentar actualizar el producto", err })

    }

}



const deleteProduct = async (req, res) => {
    try {
        
        const { id } = req.params;
        const productoEliminado = await ProductModel.findByIdAndDelete(id)

        return res.status(200).json({"msg": "Se elimino correctamente el producto", productoEliminado})

    }catch(err){

        return res.status(500).json({ "msg": "Hubo un error al intentar eliminar el producto", err })

    }
}

