import { request, response }    from 'express';
//import { Usuario }              from "../models/usuario.js";


export const esAdminRole = (req = request, res = response, next) => {
    
   // console.log(req.usuarioAdmin)
    if (!req.usuarioAdmin) {
        return res.status(500).json({
            msg: "Error interno. No hay usuario"
        })
    }

    const { rol  } = req.usuarioAdmin
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: "Error. Permiso denegado para transaccion"
        })
    }

    next();
}

export const tieneRoles = (...roles )  => {
 
    return (req, res, next) => {
        if (!req.usuarioAdmin) {
            return res.status(500).json({
                msg: "Error interno. No hay usuario"
            })
        }

        if (!roles.includes(req.usuarioAdmin.rol)) {
            return res.status(401).json({
                msg: "Error. Permiso denegado no esta en lista de roles"
            })
        }
        next();
    }

}