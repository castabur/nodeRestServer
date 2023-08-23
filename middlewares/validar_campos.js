import { validationResult } from "express-validator";

    export const validaCampos = (req, res, next) => {
        const errors = validationResult(req);
       
        if (!errors.isEmpty()) {
            console.log('VALIDA CAMPOS: Errores encontrados')
            return res.status(400).json({
                errors
            })
        }

        //Se llama al siguiente middleware
        next();
}

