import { Router }   from 'express'
import { check } from 'express-validator';

import * as catController from "../controllers/categorias_controller.js"
import { validaCampos }         from '../middlewares/validar_campos.js';
import { validarJWT }           from '../middlewares/validar_jwt.js';

export const routerCategorias = Router();

routerCategorias.get('/', catController.categoriasGet);

routerCategorias.get('/:id', catController.categoriasGet);

routerCategorias.post('/', [
    validarJWT, 
    check('nombre', 'El nombre es requerido').notEmpty(),
    validaCampos
],catController.categoriasPost);

routerCategorias.put('/:id', [
    validarJWT,
    check('id', 'Id es necesario').notEmpty(),
    check('id', 'No es una categoria valida').isMongoId(),
    validaCampos
],catController.categoriasPut);

routerCategorias.delete('/', catController.categoriasDelete);

