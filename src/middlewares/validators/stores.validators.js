import { body, param } from "express-validator";
import { errorValidator } from "../errorCapturer/errorCapturer.js";
import { StoreModel } from "../../models/stores.model.js";

const validarTiposDeDatos = required => [
    body('name')
        .optional(!required)
        .isString().withMessage("El nombre debe ser un texto")
        .bail()
        .trim()
        .notEmpty().withMessage("El nombre no puede estar vacio")
        .bail()
        .isLength({ min: 3, max: 250 }).withMessage("El nombre debe tener entre 3 y 250 caracteres")
        .bail()
        .custom(async (name, { req }) => {
            const store = await StoreModel.findOne({ name });

            if (store && store._id.toString() !== req.params?.id) {
                throw new Error('Ya existe una tienda con este nombre');
            }

            return true;
        }),

    body('location')
        .optional(!required)
        .isString().withMessage("La ubicacion debe ser un texto")
        .bail()
        .trim()
        .notEmpty().withMessage("La ubicacion no puede estar vacia")
        .bail()
        .isLength({ min: 5, max: 300 }).withMessage("La ubicacion debe tener entre 5 y 300 caracteres"),

    body('estado')
        .optional()
        .isString().withMessage("El estado debe ser un texto")
        .bail()
        .notEmpty().withMessage("El estado no puede estar vacio")
        .bail()
        .isIn(["Activo", "Inactivo"]).withMessage("El estado solo puede ser Activo o Inactivo"),
];

const validarId = () => param('id')
    .isMongoId().withMessage("El id de la tienda no es valido")
    .bail()
    .custom(async (id) => {
        const tiendaEncontrada = await StoreModel.findById(id);

        if (!tiendaEncontrada) {
            throw new Error("No se encontro la tienda");
        }

        return true;
    });

export const crearStoreValidator = [
    ...validarTiposDeDatos(true),
    errorValidator,
];

export const actualizarStoreValidator = [
    validarId(),
    errorValidator,
    ...validarTiposDeDatos(false),
    errorValidator,
];

export const eliminarStoreValidator = [
    validarId(),
    errorValidator,
];
