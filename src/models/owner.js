import { model, Schema } from 'mongoose';
import mongoose from 'mongoose';



const ownerSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    tienda:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    
    }

})