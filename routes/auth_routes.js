import { Router }           from 'express';
import { check }            from 'express-validator';
import { validaCampos }     from '../middlewares/validar_campos.js';
import { validarJWT }       from '../middlewares/validar_jwt.js';
import * as authController  from '../controllers/auth_controller.js';
//import * as dbValidators    from '../helpers/db_validators.js';



export const routerAuth = Router();

routerAuth.post('/login',
    
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'Contraseña es obligatoria').notEmpty(),
    validaCampos,
    authController.login);