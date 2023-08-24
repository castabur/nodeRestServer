import { request, response } from "express";
import bcryptjs from "bcryptjs";

import { Usuario } from "../models/usuario.js"
import { generateJWS } from "../helpers/jws_generator.js"


export const login = async (req = request, res = response) => {
    
   const { correo, password } = req.body;
    
    try { 

        // Verificar si email existe
        const usuario = await Usuario.findOne({ correo })
        if (!usuario) {
            return res.status(400).json({
                msg: 'Algo salio mal: usuario no registrado',
            })
        }
        // Si el usuario esta ativo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Algo salio mal: usuario eliminado',
            })
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Algo salioo mal: password Erronea',
            })
        }

        //general el token
        const token = await generateJWS(usuario.id);
        console.log('TOKEN: ',token)
        res.json({
            usuario, token
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            msg: "Error: Hable con el admin"
            
        })
    }
    
   
}