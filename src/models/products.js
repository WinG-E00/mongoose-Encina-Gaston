import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';


const productSchema = new Schema({

    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,        
    },
    stock:{
        type: Number,
        required: true
    },
    
    //Relacion de uno: a muchos
    tienda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    }

})


export const ProductModel = model("Product", productSchema);