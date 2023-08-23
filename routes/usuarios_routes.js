import { Router } from 'express'
import  * as usuarioController from '../controllers/usuarios_controller.js';
import { check } from 'express-validator';


export const router = Router();

router.get('/', usuarioController.usuariosGet);

router.put('/:id', usuarioController.usuariosPut);

router.post('/', [
    check('correo', 'El correo no es valido').isEmail(),
] , usuarioController.usuariosPost);

router.delete('/', usuarioController.usuariosDelete);

router.patch('/', usuarioController.usuariosPatch);