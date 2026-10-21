import { model, Schema } from 'mongoose';
import mongoose from 'mongoose';



const habilitacionSchema = new Schema({

    numero:{
        type: Number,
        required: true,
        unique: true
    },
    actividad: {
        type: Number,
        required: true,
        unique: true,
    },

    // Relacion de uno a uno con la tienda
    tienda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true,
        unique: true
    }


})
