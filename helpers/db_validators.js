import { Role } from '../models/role.js';
import { Usuario } from '../models/usuario.js';

export const esRolValido = async (rol = '') => {

    const found = await Role.findOne({ rol });
    if (!found) {
        throw new Error(' Rol no válido')
    }
}

export const mailExiste = async (correo = '') => {

    const found = await Usuario.findOne({ correo });
    if (found) {
        throw new Error(`Email ${correo} ya esta registrado`); 
    }
}

export const userIdExist = async (id = '') => {
    const found = await Usuario.findById(id);
    console.log('validando id; ', id)
    console.log('Found id; ', found)
    if (!found) {
        throw new Error('Id de usuario no existe')
    }
}