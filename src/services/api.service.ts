import {ApiError, ApiErrorResponse} from "@/types/api-error";
import {getCookie} from "@/utils/cookies";

class ApiService {
    private baseUrl = process.env.NODE_ENV === "production" ? "https://app.therasoft.com.br/api" : "http://localhost:8080";

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const token = getCookie("thera-token") ?? ""

        const config: RequestInit = {
            headers: {
                "Content-Type": "application/json",
                "X-Thera-Token": token,
                ...options.headers,
            },
            ...options,
        };

        const response = await fetch(`${this.baseUrl}${endpoint}`, config).catch((e) => {
                throw new ApiError(
                    {
                        moment: new Date(),
                        status: 400,
                        error: "Failed to fetch request",
                        message: "Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.",
                        path: `${this.baseUrl}${endpoint}`,
                    }
                )
            }
        );

        if (!response.ok) {
            const errorData: ApiErrorResponse = await response.json().catch(() => ({
                moment: new Date(),
                status: response.status,
                error: "Unknown",
                message: "Erro desconhecido",
                path: `${this.baseUrl}${endpoint}`,
            }));

            throw new ApiError(errorData);
        }

        const text = await response.text();
        return text ? JSON.parse(text) : ({} as T);
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, {method: "GET"});
    }

    async post<T>(endpoint: string, data?: any): Promise<T> {
        return await this.request<T>(endpoint, {
            method: "POST",
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async put(endpoint: string, data?: any): Promise<void> {
        return this.request<void>(endpoint, {
            method: "PUT",
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async delete(endpoint: string): Promise<void> {
        return this.request<void>(endpoint, {method: "DELETE"});
    }

}

export const apiService = new ApiService();
