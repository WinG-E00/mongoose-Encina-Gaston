import { model, Schema } from 'mongoose';
import mongoose from 'mongoose';



const habilitacionSchema = new Schema({

    numero:{
        type: Number,
        required: true,
        unique: true
    },
    actividad: {
        type: String ,
        required: true,
        unique: true,
        
    },
    vigencia: {
        fechaEmision: {
            type: Date,
            required: true
        },
        fechaVencimiento: {
            type: Date,
            required: true
        }
    },

    // Relacion de uno a uno con la tienda
    tienda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true,
        unique: true
    }


});



export const HabilitacionModel = model("Habilitacion", habilitacionSchema);