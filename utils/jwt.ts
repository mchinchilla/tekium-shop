

import jwt from 'jsonwebtoken';


export const signToken = (_id: string, email: string ) => {
    if( !process.env.JWT_SECRET_SEED ) {
        throw new Error('JWT_SECRET_SEED no esta definida, revisar variables de entorno');
    }

    return jwt.sign(
        // payload
        { _id, email },
        // seed
        process.env.JWT_SECRET_SEED,
        // opciones
        { expiresIn: '30d' },
    );

}


export const isValidToken = ( token: string ) : Promise<string> => {
    if( !process.env.JWT_SECRET_SEED ) {
        throw new Error('JWT_SECRET_SEED no esta definida, revisar variables de entorno');
    }

    if( token.length <= 10 ) {
        return Promise.reject('Token no valido');
    }

    return new Promise( (resolve, reject) => {
       try {
              const decoded = jwt.verify( token, process.env.JWT_SECRET_SEED || '', ( error, payload ) => {
                    if( error ) {
                        reject( 'JWT no es valido' );
                    }
                    else {
                        const { _id } = payload as { _id: string };
                        resolve( _id );
                    }
              } );
       }
       catch (error) {
           console.log(error);
           reject( 'JWT no es valido' );
       }
    });
}