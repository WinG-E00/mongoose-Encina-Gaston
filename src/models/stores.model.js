import { model, Schema } from 'mongoose';
import mongoose from 'mongoose';


const storeSchema = new Schema({

    name:{
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        requiered: true,
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactvio'],
        default: 'Activo'

    }

})

export const StoreModel =  model("Store", storeSchema);

