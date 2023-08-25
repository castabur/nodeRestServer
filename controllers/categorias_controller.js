import { request, response } from "express";
import { Categoria } from "../models/Categoria.js"


export const categoriasGet = async (req = request, res = response) => {
   
    const categorias = 
        req.params.id
            ? await Categoria.findById(req.params.id)
            : await Categoria.find({})
    
    res.json({
        categorias,
    })
}

export const categoriasPost = async (req = request, res = response) => {
    try {
        const uid = req.uid;
        const cat = new Categoria({
            nombre: req.query.nombre,
            estado: req.query.estado,
            usuario: uid
        })
        await cat.save();
    
        res.json({
            msg: "Post Categoria creada",
            cat
        })
        
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Error al crear la categoria'
        })
    }
   
}

export const categoriasPut = async (req = request, res = response) => {
    
    try {
        const uid = req.uid;
        const cid = req.params.id;

        const categoria = await Categoria.findById(cid);
        
        categoria.nombre = req.query.nombre
            ? req.query.nombre
            : categoria.nombre ;
        categoria.estado = req.query.estado
            ? req.query.estado
            : categoria.estado;
        categoria.usuario = uid;
        
        await Categoria.findByIdAndUpdate(cid, categoria)

        res.json({
            msg: "Put categorias",
            categoria
        })
    }catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Error al actualizar la categoria'
        })
    }
    
}

export const categoriasDelete = async (req = request, res = response) => {
    res.json({
        msg: "Delete categorias",
    })
}

