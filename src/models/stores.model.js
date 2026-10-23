import { model, Schema } from 'mongoose';


const storeSchema = new Schema({

    name:{
        type: String,
        requiered: true,
        unique: true,
    },
    location: {
        type: String,
        requiered: true,
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'

    }

});


export const StoreModel =  model("Store", storeSchema);
