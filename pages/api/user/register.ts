import type {NextApiRequest, NextApiResponse} from 'next'
import {User} from "../../../models";
import bcrypt from "bcryptjs";
import { db } from '../../../database';
import { jwt, validations } from '../../../utils';

type Data =
    | { message: string }
    | {
    token: string,
    user: {
        email: string,
        name: string,
        role: string
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return registerUser(req, res);
        default:
            return res.status(405).json({message: 'Method Not Allowed'});
    }
}


const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {email = '', password = '', name = '' } = req.body as { email: string, password: string, name: string };


    if ( password.length < 6 ) {
        return res.status(400).json({message: 'el nombre al menos debe de ser 6 letras'});
    }

    if ( name.length < 3 ) {
        return res.status(400).json({message: 'El nombre al menos debe de ser 3 letras'});
    }

    if ( !validations.isValidEmail(email)) {
        return res.status(400).json({message: 'Correo electrónico no tiene una estructura válida'});
    }

    await db.connect();
    const user = await User.findOne({email});

    if ( user ) {
        await db.disconnect();
        return res.status(400).json({message: 'Correo electrónico ya está registrado'});
    }

    const newUser = new User({
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password),
        role: 'client',
        name
    });

    try {
        await newUser.save( { validateBeforeSave: true } );
    }
    catch (error) {
        console.log(error);
        await db.disconnect();

        return res.status(500).json({ message: 'Error al registrar usuario, revisar logs en el servidor' });
    }

    await db.disconnect();

    const { _id, role } = newUser;

    const token = await jwt.signToken( _id, email );

    return res.status(200).json({
        message: 'Usuario registrado corectamente',
        token,   // jwt
        user: {
            email,
            role,
            name
        }
    });
}