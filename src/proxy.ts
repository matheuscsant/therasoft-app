import {MiddlewareConfig, NextRequest, NextResponse} from "next/server";

const publicRoutes = [
    { path: "/sign-in", whenAuthenticated: "redirect" },
    { path: "/forgot-password", whenAuthenticated: "redirect" },
    { path: "/register", whenAuthenticated: "redirect" },
    { path: "/pricing", whenAuthenticated: "next" },
] as const

const REDIRECT_WEN_NOT_AUTHENTICATED_ROUTES = "/sign-in"

export function proxy(request: NextRequest) {

    const path = request.nextUrl.pathname
    const publicRoute = publicRoutes.find((r) => r.path === path)
    const authToken = request.cookies.get("thera-token")

    if (!authToken && publicRoute) {
        return NextResponse.next()
    }

    if (!authToken && !publicRoute) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_WEN_NOT_AUTHENTICATED_ROUTES
        return NextResponse.redirect(redirectUrl)
    }

    if (authToken && publicRoute && publicRoute.whenAuthenticated === "redirect") {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/"
        return NextResponse.redirect(redirectUrl)
    }

    if (authToken && !publicRoute) {
        // Checar se o JWT está expirado
        // Se sim, remover o cookie e redirecionar o usuário pro login
        return NextResponse.next()
    }

    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: [
        // Exclude API routes, static files, image optimizations, and .png files
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.[^.]+$).*)",
    ]
}