import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    error?: string,
    user: {
      /** The user's name. */
      name: string
      accessToken: string ;
      refreshToken:string | unknown;
      username:string | unknown;
      role:string | unknown;
    } & DefaultSession["user"]
  }

  interface Account {
    accessToken: string;
    refreshToken: string;
    username: string;
    accessTokenExpires: number;
   
  }
}