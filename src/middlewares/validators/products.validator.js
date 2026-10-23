import { body, param } from "express-validator";
import { errorValidator } from "../errorCapturer/errorCapturer.js";
import { ProductModel } from "../../models/products.js";
import { StoreModel } from "../../models/stores.model.js";

const validarTiposDeDatos = required => [
    body('name')
        .optional(!required)
        .isString().withMessage("El nombre debe ser un texto")
        .bail()
        .trim()
        .notEmpty().withMessage("El nombre no puede estar vacio")
        .bail()
        .isLength({ min: 3, max: 250 }).withMessage("El nombre debe tener entre 3 y 250 caracteres"),

    body('marca')
        .optional(!required)
        .isString().withMessage("La marca debe ser un texto")
        .bail()
        .trim()
        .notEmpty().withMessage("La marca no puede estar vacio")
        .bail()
        .isLength({ min: 3, max: 100 }).withMessage("La marca debe tener entre 3 y 100 caracteres"),

    body('price')
        .optional(!required)
        .custom(value => typeof value === 'number' && Number.isFinite(value) && value >= 0).withMessage("El precio debe ser un numero mayor o igual a cero"),

    body('stock')
        .optional(!required)
        .custom(value => Number.isInteger(value) && value >= 0).withMessage("El stock debe ser un entero mayor o igual a cero"),

    body('tienda')
        .optional(!required)
        .isMongoId().withMessage("El id de la tienda no es valido")
        .bail()
        .custom(async (id) => {
            const encontrado = await StoreModel.findById(id);
            if (!encontrado) {
                throw new Error("No se encontro la tienda");
            }
            return true;
        }),
];

const validarId = () => param('id')
    .isMongoId().withMessage("El id de el producto no es valido")
    .bail()
    .custom(async (id) => {
        const encontrado = await ProductModel.findById(id);
        if (!encontrado) {
            throw new Error("No se encontro el producto");
        }
        return true;
    });

export const crearProductValidator = [
    ...validarTiposDeDatos(true),
    errorValidator,
];

export const actualizarProductValidator = [
    validarId(),
    errorValidator,
    ...validarTiposDeDatos(false),
    errorValidator,
];

export const eliminarProductValidator = [
    validarId(),
    errorValidator,
];
