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


storeSchema.virtual('habilitacion', {
    ref: 'Habilitacion',
    localField: '_id',
    foreignField: 'tienda',
    justOne: true
})


storeSchema.set('toJSON', { virtuals: true });




export const StoreModel =  model("Store", storeSchema);
