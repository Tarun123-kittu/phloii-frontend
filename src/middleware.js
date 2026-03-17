import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('phloii_token_auth')?.value;
    const { pathname } = request.nextUrl;

    // Define public routes that don't need authentication within the /establishment path
    const isAuthPage = pathname === '/establishment/login' ||
        pathname === '/establishment/signup' ||
        pathname === '/establishment/forgot-password' ||
        pathname === '/establishment/reset-password';
    const isEstablishmentRoute = pathname.startsWith('/establishment');

    // If the user is on an auth page (login/signup) but already has a token, 
    // redirect them to the establishment dashboard.
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/establishment', request.url));
    }

    // If the user is trying to access any protected establishment route but has NO token,
    // redirect them to the login page.
    if (isEstablishmentRoute && !isAuthPage && !token) {
        // We only protect the core establishment routes, not public landing pages if any exist under different paths
        return NextResponse.redirect(new URL('/establishment/login', request.url));
    }

    return NextResponse.next();
}

// Config to match only the routes we care about for performance
export const config = {
    matcher: [
        '/establishment/:path*',
    ],
};
