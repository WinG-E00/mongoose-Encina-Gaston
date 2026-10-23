import { validationResult } from 'express-validator';

export const errorValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: 'Error de validacion', errors: errors.array() });
    }
    next();
};
