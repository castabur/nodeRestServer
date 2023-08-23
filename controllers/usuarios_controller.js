import { request, response } from "express";
import { Usuario } from "../models/usuario.js"
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";


export const usuariosGet = (req = request, res = response) => {
   
   const { param1, param2 } = req.query;
    
    res.json({
        msg: "Get Api Usuarios", 
        status:  "okok"

    })
}

export const usuariosPost = async (req = request, res = response) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors
        })
    }

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    const emailExist = await Usuario.findOne({ correo: correo });
    if (emailExist) {
        return res.status(400).json({
            msg: 'Este correo ya existe',
            correo: correo,
            cod: '400'
        })
    }
    
    // Validar si el correo existe
    const salt = bcryptjs.genSaltSync();

    // Hash Contraseña
    usuario.password = bcryptjs.hashSync(password, salt);

    // guardar
    await usuario.save();

    console.log('Post Api call')
    res.json({
        message: "POST Api Usuarios",
        usuario
    });
    
}

export const usuariosPut = (req, res = response) => {
    
    const id = req.params.id;
        
    res.json({
        msg: 'Put Rest api',
        id: id,
        status: 'ok??'
    })
}

export const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Delete Rest api',
        status: 'ok'
    })
}

export const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch Rest api',
        status: 'ok'
    })
}

