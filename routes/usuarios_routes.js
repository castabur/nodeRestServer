import { Router }   from 'express'
import { check }    from 'express-validator';

import * as usuarioController   from '../controllers/usuarios_controller.js';
import * as dbValidators        from '../helpers/db_validators.js';
import { validaCampos }         from '../middlewares/validar_campos.js';
import { validarJWT }           from '../middlewares/validar_jwt.js';
import { tieneRoles }           from '../middlewares/validar_roles.js';

export const router = Router();

router.get('/', usuarioController.usuariosGet);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id', 'Id ya existe').custom(dbValidators.userIdExist),
    check('rol').custom( rol => dbValidators.esRolValido (rol)),
    validaCampos
],usuarioController.usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es requerido').notEmpty(),
    check('password', 'El password es requerido (+6 carateres)').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo', 'El correo ya existe').custom(mail => dbValidators.mailExiste(mail)),
    
    //check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // Validar rol contra la BD con una validacion personalizada
    // se valida campo rol... se recibe rol de resultado y se valida rol
    check('rol').custom( rol => dbValidators.esRolValido (rol)),
    validaCampos
] , usuarioController.usuariosPost);

router.delete('/', [
    validarJWT,
    //esAdminRole,
    // es una funcion.. que se ejecuta antes de retornar el middleware en si
    tieneRoles('USER_ROLE', 'ADMIN_ROLE'),  
    check('id', 'No es un Id válido').isMongoId(),
    validaCampos
], usuarioController.usuariosDelete);


router.patch('/', usuarioController.usuariosPatch);