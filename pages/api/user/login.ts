import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import {User} from "../../../models";
import bcrypt from "bcryptjs";
import { jwt } from './../../../utils';

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

export default function handler(  req: NextApiRequest,  res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':
      return loginUser(req, res);
    default:
        return res.status(405).json({ message: 'Method Not Allowed' });
  }
}


const loginUser = async (req: NextApiRequest,  res: NextApiResponse<Data>) => {
  const { email = '', password ='' } = req.body;

  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user ) {
    return res.status(400).json({ message: 'Usuario o contraseña no válido - EMAIL' });
  }

  if ( !bcrypt.compareSync(password, user.password!)) {
    return res.status(400).json({ message: 'Usuario o contraseña no válido - PASSWORD' });
  }

  const { role, name, _id } = user;

  const token = await jwt.signToken( _id, email );

  return res.status(200).json({
    message: 'Login correcto',
    token,   // jwt
    user: {
      email, role, name
    }
  });
}
