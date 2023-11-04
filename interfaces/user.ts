
export interface IUser {
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
    image?: string | null;
    refreshToken:string | unknown;
    username:string | unknown;
}