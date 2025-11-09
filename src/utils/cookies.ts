import Cookies from "js-cookie";

export function getCookie(name: string): string | undefined {
    return Cookies.get(name);
}

export function setCookie(name: string, value: string, days = 1) {
    Cookies.set(name, value, {
        expires: days,
        secure: true,
        sameSite: "strict",
    });
}

export function removeCookie(name: string) {
    Cookies.remove(name);
}