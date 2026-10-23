import { model, Schema } from 'mongoose';



const ownerSchema = new Schema({

    name: {
        type: String,
        required: true,
    }
    
})


export const OwnerModel = model("Owner", ownerSchema);
