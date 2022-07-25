import {createContext} from 'react';
import {IRegisterUser, IUser} from "../../interfaces";

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;

    loginUser: (emais: string, password: string) => Promise<boolean>;
    registerUser: (name: string, email: string, password: string) => Promise<IRegisterUser>;
    logoutUser: () => void;
}


export const AuthContext = createContext({ } as ContextProps);
