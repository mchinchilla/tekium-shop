import {FC, useEffect, useReducer} from "react";
import {AuthContext, authReducer} from "./";
import {IRegisterUser, IUser} from "../../interfaces";
import {tekiumApi} from "../../api";
import Cookies from "js-cookie";
import axios from "axios";

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

    useEffect(() => {
        return () => {
            checkToken();
        };
    }, []);

    const checkToken = async() => {

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
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message,
                }
            }

            return {
                hasError: true,
                message: 'Ocurrió un error al registrar el usuario',
            }
        }


    }

    return (
        <AuthContext.Provider value={{
            ...state,
            // Methods
            loginUser,
            registerUser,
        }}>
            { children }
        </AuthContext.Provider>
    );
};
