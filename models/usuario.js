import * as mongo from 'mongoose'

const UsuarioSchema = new mongo.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: false
    },
    google: {
        type: Boolean,
        default: false
    }
});

//Sobre-esribir metodo toJSON de mongoose
UsuarioSchema.methods.toJSON = function () {
    // Se saca __v y password y se almacena el resto en usuario
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

export const Usuario = mongo.model('Usuario', UsuarioSchema);