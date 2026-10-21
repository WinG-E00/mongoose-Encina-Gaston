import mongoose from "mongoose";
import "dotenv/config";


const URI = process.env.URI_MONGODBATLAS



const startDB = async () => { 

    try {

        await mongoose.connect(URI);
        console.log("Se conecto correctamente a la base de datos de mongodb")


    }catch(err){

        console.log('Hubo un error al intentar conectar a la base de datos de mongodb')

    } 


};


export default startDB;