import { body, param } from "express-validator";
import { errorValidator } from "../errorCapturer/errorCapturer.js";
import { OwnerStoreModel } from "../../models/ownerStore.model.js";
import { OwnerModel } from "../../models/owner.js";
import { StoreModel } from "../../models/stores.model.js";

const validarTiposDeDatos = required => [
    body('owner')
        .optional(!required)
        .isMongoId().withMessage("El id de el dueño no es valido")
        .bail()
        .custom(async (id) => {
            const encontrado = await OwnerModel.findById(id);
            if (!encontrado) {
                throw new Error("No se encontro el dueño");
            }
            return true;
        }),

    body('store')
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
    .isMongoId().withMessage("El id de la relacion dueño-tienda no es valido")
    .bail()
    .custom(async (id) => {
        const encontrado = await OwnerStoreModel.findById(id);
        if (!encontrado) {
            throw new Error("No se encontro la relacion dueño-tienda");
        }
        return true;
    });

const validarVinculoUnico = body().custom(async (_, { req }) => {
    const actual = req.params?.id
        ? await OwnerStoreModel.findById(req.params.id)
        : null;
    const owner = req.body.owner ?? actual?.owner;
    const store = req.body.store ?? actual?.store;
    const filtro = { owner, store };
    if (actual) filtro._id = { $ne: actual._id };
    if (await OwnerStoreModel.findOne(filtro)) {
        throw new Error("Ya existe la relacion entre este dueño y esta tienda");
    }
    return true;
});

export const crearOwnerStoreValidator = [
    ...validarTiposDeDatos(true),
    errorValidator,
    validarVinculoUnico,
    errorValidator,
];

export const actualizarOwnerStoreValidator = [
    validarId(),
    errorValidator,
    ...validarTiposDeDatos(false),
    errorValidator,
    validarVinculoUnico,
    errorValidator,
];

export const eliminarOwnerStoreValidator = [
    validarId(),
    errorValidator,
];
