import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import {User} from "../../../models";
import bcrypt from "bcryptjs";
import { jwt } from './../../../utils';
import {isValidToken} from "../../../utils/jwt";

type Data =
    | { message: string }
    | {
  token: string,
  user: {
    email: string | unknown,
    name: string | unknown,
    role: string
  }
}

export default function handler(  req: NextApiRequest,  res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return checkJWT(req, res);
    default:
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}


const checkJWT = async (req: NextApiRequest,  res: NextApiResponse<Data>) => {
  const { token = '' } = req.cookies;

  let userId = '';

  try {
   userId = await jwt.isValidToken( token );
  }
  catch (error) {
    return res.status(401).json({ message: 'Token auth no es válido' });
  }



  await db.connect();
  const user = await User.findById( userId ).lean();
  await db.disconnect();

  if (!user ) {
    return res.status(400).json({ message: 'Usuario no existe' });
  }

  const { _id, name, role, email  } = user;

  return res.status(200).json({
    message: 'Login correcto',
    token: jwt.signToken( _id, email ?? '' ),
    user: {
      email, role, name
    }
  });

}
