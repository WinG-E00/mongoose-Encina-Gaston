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
    //Aca tengo que crear una relacion con la store Esta seria una relacion de uno: a muchos
    tienda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
        required: true
    }

})


const ProductModel = model("Product", productSchema);