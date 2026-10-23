import { createProduct, getAllProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";
import { crearProductValidator, actualizarProductValidator, eliminarProductValidator } from "../middlewares/validators/products.validator.js";
import express from 'express';

const routerProducts = express.Router();


routerProducts.post('/products/createProduct', crearProductValidator, createProduct);

routerProducts.get('/products/getAllProducts', getAllProduct);

routerProducts.put('/products/updateProduct/:id', actualizarProductValidator, updateProduct);

routerProducts.delete('/products/deleteProduct/:id', eliminarProductValidator, deleteProduct);



export default routerProducts;