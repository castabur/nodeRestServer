import { request, response } from "express";

export const usuariosGet = (req = request, res = response) => {
   
   const { param1, param2 } = req.query;
    
    res.json({
        msg: "Mensaje del Get", param1, param2

    })
}

export const usuariosPost = (req = request, res = response) => {
   
    const {nombre, edad} = req.body;
    res.json({
        message:  "nombre - edad de lo que mandaste", nombre, edad
    })
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

