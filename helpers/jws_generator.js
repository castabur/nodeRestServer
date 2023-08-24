import pkg from 'jsonwebtoken';

export const generateJWS = (uid = '') => {
    return new Promise((resolve, reject) => {
       // que se graba en el payload
        const payload = { uid }

        pkg.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '2d'
            }, (err, token) => {
            console.log(token);
                if (err) {
                    console.log(err)
                    reject( 'No se pudo generar WebToken')
                }else {
                    resolve (token)
                }
            }
        )
    })
    
}