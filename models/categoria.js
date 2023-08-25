import * as mongo from 'mongoose'

const CategoriaSchema = new mongo.Schema({
    nombre: {
        type: String, 
        required: [true, 'El nombre es obligatorio']
    }, 
    estado: {
        type: Boolean,
        default: true,
        required: true
    }, 
    usuario: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    
})

export const Categoria = mongo.model('Categoria', CategoriaSchema);