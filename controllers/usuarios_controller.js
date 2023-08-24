import { request, response } from "express";
import { Usuario } from "../models/usuario.js";
import bcryptjs from "bcryptjs";


export const usuariosGet = async (req = request, res = response) => {
   
    const { from = '0', limit = '5' } = req.query;
    const query = {estado: true}
    const usuarios = await Usuario.find(query)
        .limit(Number(limit))
        .skip(Number(from))
    
    const total = await Usuario.countDocuments(query);
    
    res.json({
        total: total,
        usuarios:  usuarios

    })
}

export const usuariosPost = async (req = request, res = response) => {
   
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });
   
    // Validar si el correo existe
    const salt = bcryptjs.genSaltSync();

    // Hash Contraseña
    usuario.password = bcryptjs.hashSync(password, salt);

    // guardar
    await usuario.save();

    console.log('Post Api call')
    res.json({
        msg: "POST Api Usuarios",
        usuario
    });
    
}

export const usuariosPut = async (req, res = response) => {
    
    const { id } = req.params;
    
    const { _id, password, correo, google, ...resto } = req.body;
    
    if (password) {
        // Validar si el correo existe
        const salt = bcryptjs.genSaltSync();
        // Hash Contraseña
        resto.password = bcryptjs.hashSync(password, salt);     
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true});

    res.json({
        msg: 'Put Rest api',
        id: id,
        usuario
    })
}

export const usuariosDelete = async (req, res = response) => {
   
    const { id } = req.query;
    const update = {estado: false}
    
    const usuario = await Usuario.findByIdAndUpdate(id, update, { new: true })
    const  usuarioAdmin  = req.usuarioAdmin
    
    res.json({
        msg: 'Delete Rest api',
        status: 'ok', 
        usuario, 
        usuarioAdmin
    })
}

export const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch Rest api',
        status: 'ok'
    })
}

