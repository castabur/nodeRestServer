
import {Schema, model} from 'mongoose'

const roleSchema = new Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
})

export const Role = model('Role', roleSchema)


