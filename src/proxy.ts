import {MiddlewareConfig, NextRequest, NextResponse} from "next/server";
import {jwtDecode} from "jwt-decode";

const publicRoutes = [
    {path: "/sign-in", whenAuthenticated: "redirect"},
    {path: "/forgot-password", whenAuthenticated: "redirect"},
    {path: "/register", whenAuthenticated: "redirect"},
    {path: "/pricing", whenAuthenticated: "next"},
    {path: "/", whenAuthenticated: "next"},
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTES = "/sign-in"

export function proxy(request: NextRequest) {

    const path = request.nextUrl.pathname
    const publicRoute = publicRoutes.find((r) => r.path === path)
    const token = request.cookies.get("thera-token")

    if (!token && publicRoute) {
        return NextResponse.next()
    }

    if (!token && !publicRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTES
        return NextResponse.redirect(redirectUrl)
    }

    if (token && publicRoute && publicRoute.whenAuthenticated === "redirect") {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/dashboard"
        return NextResponse.redirect(redirectUrl)
    }

    if (token && !publicRoute) {
        try {
            const decoded = jwtDecode(token.value);

            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                const redirectUrl = request.nextUrl.clone();
                redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTES
                const res = NextResponse.redirect(redirectUrl);
                res.cookies.delete("thera-token");
                return res;
            }

            return NextResponse.next();
        } catch (_) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTES
            const res = NextResponse.redirect(redirectUrl);
            res.cookies.delete("thera-token");
            return res;
        }
    }

    return NextResponse.next();
}

export const config: MiddlewareConfig = {
    matcher: [
        // Exclude API routes, static files, image optimizations, and .png files
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.[^.]+$).*)",
    ]
}