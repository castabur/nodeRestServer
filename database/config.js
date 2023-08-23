
import * as mongoose from "mongoose"

export const dbConnection = async() =>{
    console.log('Intentando conectar a la BBDD')
    try {
        await mongoose.connect(process.env.MONGO_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
           // useCreateIndex: true,
           // useFindAndModify: false
        });
        console.log('DB connected')
    } catch (e) {
        console.log('Error al conectar la BBDD\n', e)
    }
   
   

}