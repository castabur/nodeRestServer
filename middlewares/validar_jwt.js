import { request, response }    from 'express';
import pkg                      from 'jsonwebtoken';
import { Usuario }              from "../models/usuario.js";

export const validarJWT = async (req = request, res=response, next) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token dde autorizacion'
        })
    }

    try {
        const {uid} = pkg.verify(token, process.env.SECRETORPRIVATEKEY)
        req.uid = uid;
        const usuarioAdmin = await Usuario.findById(uid)
        req.usuarioAdmin = usuarioAdmin;
        
        //usuario que corresponde al uid
        if (!usuarioAdmin) {
            return res.status(401).json({ msg: 'Token invalido: usuario no existe' })
        }
        if (!usuarioAdmin.estado) {
            return res.status(401).json({ msg: 'Token invalido: usuario ya eliminado (false)' })
        }

        next();
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            msg: "Ocurrio un error: Token inválido"
        })
    }


    
}