import { Router } from 'express'
import  * as usuarioController from '../controllers/usuarios_controller.js';


export const router = Router();

router.get('/', usuarioController.usuariosGet);

router.put('/:id', usuarioController.usuariosPut);

router.post('/', usuarioController.usuariosPost);

router.delete('/', usuarioController.usuariosDelete);

router.patch('/', usuarioController.usuariosPatch);