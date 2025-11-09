import {LoginRequest, LoginResponse} from "@/types/auth";
import {apiService} from "@/services/api.service";
import {removeCookie} from "@/utils/cookies";

class AuthService {

    async login(token: string): Promise<LoginResponse> {
        const request: LoginRequest = {
            token: token,
        }
        return await apiService.post<LoginResponse>("/login", request);
    }

    async logout(): Promise<void> {
        if (typeof window !== "undefined") {
            removeCookie("thera-token")
        }
    }

}

export const authService = new AuthService();
