import { body, param } from "express-validator";
import { errorValidator } from "../errorCapturer/errorCapturer.js";
import { HabilitacionModel } from "../../models/habilitacion.js";
import { StoreModel } from "../../models/stores.model.js";

const validarTiposDeDatos = required => [
    body('numero')
        .optional(!required)
        .custom(value => Number.isInteger(value) && value >= 1).withMessage("El numero debe ser un entero positivo")
        .bail()
        .custom(async (value, { req }) => {
            const encontrado = await HabilitacionModel.findOne({ 'numero': value });
            if (encontrado && encontrado._id.toString() !== req.params?.id) {
                throw new Error("Ya existe una habilitacion con este numero");
            }
            return true;
        }),

    body('actividad')
        .optional(!required)
        .isString().withMessage("La actividad debe ser un texto")
        .bail()
        .trim()
        .notEmpty().withMessage("La actividad no puede estar vacio")
        .bail()
        .isLength({ min: 3, max: 250 }).withMessage("La actividad debe tener entre 3 y 250 caracteres")
        .bail()
        .custom(async (value, { req }) => {
            const encontrado = await HabilitacionModel.findOne({ 'actividad': value });
            if (encontrado && encontrado._id.toString() !== req.params?.id) {
                throw new Error("Ya existe una habilitacion con esta actividad");
            }
            return true;
        }),

    body('vigencia')
        .optional(!required)
        .isObject({ strict: true }).withMessage("La vigencia debe ser un objeto"),

    body('vigencia.fechaEmision')
        .optional(!required)
        .isISO8601({ strict: true }).withMessage("La fecha de emision debe ser una fecha valida"),

    body('vigencia.fechaVencimiento')
        .optional(!required)
        .isISO8601({ strict: true }).withMessage("La fecha de vencimiento debe ser una fecha valida"),

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
        })
        .bail()
        .custom(async (value, { req }) => {
            const encontrado = await HabilitacionModel.findOne({ 'tienda': value });
            if (encontrado && encontrado._id.toString() !== req.params?.id) {
                throw new Error("Ya existe una habilitacion con esta tienda");
            }
            return true;
        }),
];

const validarId = () => param('id')
    .isMongoId().withMessage("El id de la habilitacion no es valido")
    .bail()
    .custom(async (id) => {
        const encontrado = await HabilitacionModel.findById(id);
        if (!encontrado) {
            throw new Error("No se encontro la habilitacion");
        }
        return true;
    });

const validarOrdenFechas = body('vigencia').optional().custom(async (vigencia, { req }) => {
    if (Object.keys(vigencia).length === 0) {
        throw new Error("La vigencia debe incluir al menos una fecha");
    }
    const actual = req.params?.id
        ? await HabilitacionModel.findById(req.params.id)
        : null;
    const emision = vigencia.fechaEmision ?? actual?.vigencia?.fechaEmision;
    const vencimiento = vigencia.fechaVencimiento ?? actual?.vigencia?.fechaVencimiento;
    if (emision && vencimiento && new Date(vencimiento) <= new Date(emision)) {
        throw new Error("La fecha de vencimiento debe ser posterior a la fecha de emision");
    }
    return true;
});

export const crearHabilitacionValidator = [
    ...validarTiposDeDatos(true),
    errorValidator,
    validarOrdenFechas,
    errorValidator,
];

export const actualizarHabilitacionValidator = [
    validarId(),
    errorValidator,
    ...validarTiposDeDatos(false),
    errorValidator,
    validarOrdenFechas,
    errorValidator,
];

export const eliminarHabilitacionValidator = [
    validarId(),
    errorValidator,
];
