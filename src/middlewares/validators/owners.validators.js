import { body, param } from "express-validator";
import { errorValidator } from "../errorCapturer/errorCapturer.js";
import { OwnerModel } from "../../models/owner.js";

const validarTiposDeDatos = required => [
    body('name')
        .optional(!required)
        .isString().withMessage("El nombre debe ser un texto")
        .bail()
        .trim()
        .notEmpty().withMessage("El nombre no puede estar vacio")
        .bail()
        .isLength({ min: 3, max: 250 }).withMessage("El nombre debe tener entre 3 y 250 caracteres"),
];

const validarId = () => param('id')
    .isMongoId().withMessage("El id de el dueño no es valido")
    .bail()
    .custom(async (id) => {
        const encontrado = await OwnerModel.findById(id);
        if (!encontrado) {
            throw new Error("No se encontro el dueño");
        }
        return true;
    });

export const crearOwnerValidator = [
    ...validarTiposDeDatos(true),
    errorValidator,
];

export const actualizarOwnerValidator = [
    validarId(),
    errorValidator,
    ...validarTiposDeDatos(false),
    errorValidator,
];

export const eliminarOwnerValidator = [
    validarId(),
    errorValidator,
];
