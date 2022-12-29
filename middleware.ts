import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { jwt } from './utils';
import { RequestCookie } from "next/dist/server/web/spec-extension/cookies";

export async function middleware( request: NextRequest, event: NextFetchEvent ) {

    if (request.nextUrl.pathname.startsWith('/checkout')) {
        const token: RequestCookie | undefined = request.cookies.get('token');
        console.log('Token:' , token);

        try {
            await jwt.isValidToken( token? token.value : '' );
            return NextResponse.next();
        } catch ( error ) {
            const requestedPage = request.page;
            return NextResponse.redirect( `/auth/login?p=${ requestedPage }` );
        }
    }
}