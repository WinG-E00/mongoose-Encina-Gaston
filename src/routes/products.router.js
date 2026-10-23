import express from 'express';

const routerProducts = express.Router();


routerProducts.post('/products/createProduct', createProduct);

routerProducts.get('/products/getAllProducts', getAllOProduct);

routerProducts.put('/products/updateProduct/:id', updateProduct);

routerProducts.delete('/products/deleteProduct/:id', deleteProduct);



export default routerProducts;