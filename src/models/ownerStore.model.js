import {model, Schema } from 'mongoose';


const ownerStoreSchema = new Schema({

    onwer: {
        type: Schema.Types.ObjectId,
        ref: 'Owner',
        required:true
    },
    store:{
        type: Schema.Types.ObjectId,
        ref: 'Store',
        required:true
    }


})



export const OwnerStoreModel = model('OwnerStore', ownerStoreSchema);


