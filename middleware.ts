/* eslint-disable @next/next/no-server-import-in-page */
import { authRoutes, protectedRoutes } from '@/routes';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { JwtToken } from '@/models/jwt';
import * as jose from 'jose';

//TODO: Flusso da rivedere
export function middleware(request: NextRequest) {
  const user = request.cookies.get('user')
    ? JSON.parse(request.cookies.get('user'))
    : null;

  if (user) {
    const decode = jose.decodeJwt(user.jwt) as JwtToken;

    console.log('scaduto?', decode.exp < (new Date().getTime() + 1) / 1000);
    if (
      protectedRoutes.includes(request.nextUrl.pathname) &&
      decode.exp < (new Date().getTime() + 1) / 1000
    ) {
      request.cookies.delete('user');
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('user');

      return response;
    }

    /* User is not available on the cookie then go to login */
  } else if (protectedRoutes.includes(request.nextUrl.pathname)) {
    console.log('qui');
    const response = NextResponse.redirect(new URL('/login', request.url));
    return response;
  }

  NextResponse.next();
}
