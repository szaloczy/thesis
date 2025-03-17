class AppError extends Error {
    public statusCode: number;
    
    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor)
    }
}

export default AppError;