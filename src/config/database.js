import mongoose from "mongosee";


const startDB = async () => { 

    try {

        await mongoose.connect("mongodb+srv://gastonencinawj_db_user:PYcyLrDwZwJycbqv@cluster0.ejekpjy.mongodb.net/");
        console.log("Se conecto correctamente a la base de datos de mongodb")


    }catch(err){

        console.log('Hubo un error al intentar conectar a la base de datos de mongodb')

    } 


};


export default startDB;