export interface ApiErrorResponse {
    moment: Date;
    status: number;
    error: string;
    message: string;
    path: string;
}

export class ApiError extends Error {
    data: ApiErrorResponse;

    constructor(data: ApiErrorResponse) {
        super(data.message);
        this.name = "ApiError";
        this.data = data;
    }
}