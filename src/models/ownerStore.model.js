import {model, Schema } from 'mongoose';


const ownerStoreSchema = new Schema({

    owner: {
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



ownerStoreSchema.index({ owner: 1, store: 1 }, { unique: true });

export const OwnerStoreModel = model('OwnerStore', ownerStoreSchema);


