import NextAuth from 'next-auth';
import { Session } from 'next-auth';

import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

import { dbUsers } from '../../../database';

export default NextAuth({
    // Configure one or more authentication providers
    providers: [

        // ...add more providers here

        Credentials({
            name: 'Custom Login',
            credentials: {
                email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com'  },
                password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña'  },
            },
            async authorize(credentials) {
                console.log({credentials})
                // return { name: 'Juan', correo: 'juan@google.com', role: 'admin' };

                const user = await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password );

                if ( user ) {
                    return { id: user._id, name: user.name, email: user.email };
                }
                else {
                    return null;
                }


                // return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password );

            }
        }),


        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),


    ],

    // Custom Pages
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register'
    },

    // Callbacks
    jwt: {
        // secret: process.env.JWT_SECRET_SEED, // deprecated
    },

    session: {
        maxAge: 2592000, /// 30d
        strategy: 'jwt',
        updateAge: 86400, // cada día
    },


    callbacks: {

        async jwt({ token, account, user }) {
            // console.log({ token, account, user });

            if ( account ) {
                token.accessToken = account.access_token;

                switch( account.type ) {

                    case 'oauth':
                        token.user = await dbUsers.oAUthToDbUser( user?.email || '', user?.name || '' );
                        break;

                    case 'credentials':
                        token.user = user;
                        break;
                }

            }

            return token;
        },


        async session( { session, token } ) {
            session && session.user ? session.user.accessToken = token.accessToken as string : "";
            session && session.user ? session.user.refreshToken = token.refreshToken : "";
            session && session.user ? session.user.username = token.username : "";
            return session;
        }


    }

});