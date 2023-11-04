import {FC, useEffect, useReducer} from "react";
import {useRouter} from "next/router";

import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import {IRegisterUser, IUser} from "../../interfaces";
import {AuthContext, authReducer} from "./";
import {tekiumApi} from "../../api";
import { useSession, signOut } from "next-auth/react";

interface Props {
    children: React.ReactNode;
}

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
};


export const AuthProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

    const { data, status } = useSession();


    const router = useRouter();

    useEffect( () => {
        if( status == 'authenticated') {
            console.log( { user: data?.user });
            dispatch( { type: '[Auth] - Login', payload: data?.user as IUser } );
        }
    }, [status, data ] );
    

/*    useEffect(() => {
        return () => {
            checkToken();
        };
    }, []);*/

    const checkToken = async() => {

        if ( !Cookies.get("token") ) {
            return;
        }

        try {
            const { data } = await tekiumApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });

        } catch (error) {
            Cookies.remove('token');
        }

    };

    const loginUser = async ( email: string, password: string ): Promise<boolean> => {
        try {
            const { data } = await tekiumApi.post('/user/login', { email, password });
            const { token, user  } = data;
            Cookies.set('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
            return true;
        } catch(error) {
            // console.error(error);
            return false;
        }
    }

    const registerUser = async ( name: string, email: string, password: string ): Promise<IRegisterUser> => {

        try {
            const { data } = await tekiumApi.post('/user/register', { name, email, password });
            const { token, user  } = data;
            Cookies.set('token', token);
            return {
                hasError: false,
                message: 'Usuario registrado con éxito',
            }
        }
        catch(error) {
            if (axios.isAxiosError(error as AxiosError)) {
                return {
                    hasError: true,
                    message: 'Error al registrar usuario',
                }
            }


            return {
                hasError: true,
                message: 'Ocurrió un error al registrar el usuario',
            }
        }
    }

    const logoutUser = async () => {

        Cookies.remove('cart');
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        Cookies.remove('address');
        Cookies.remove('address2');
        Cookies.remove('zip');
        Cookies.remove('city');
        Cookies.remove('country');
        Cookies.remove('phone');

        // Cookies.remove('token');
        // router.reload();
        await signOut();
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            // Methods
            loginUser,
            registerUser,
            logoutUser,
        }}>
            { children }
        </AuthContext.Provider>
    );
};
