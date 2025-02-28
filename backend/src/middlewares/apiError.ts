class ApiError extends Error {
    public statusCode: number;
    public isOperational: boolean;


    constructor(statusCode: number, isOperational = true, msg: string) {
        super(msg);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;