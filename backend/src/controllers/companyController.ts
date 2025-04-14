import { Request, Response, NextFunction } from "express";
import companyService from "../services/companyService";
import { getUserIdFromCookie } from "../utils/cookieUtils";
import AppError from "../middlewares/appError";

class CompanyController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const results = await companyService.getAllCompany();

            res.json(results);
        } catch (error) {
            next(error);
            res.status(500).json('Internal server error');
        }
    }

    public async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = getUserIdFromCookie(req.cookies.jwt);

            const result = await companyService.getCompanyByUserId(userId as number);

            res.json(result);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ error: error.message });
            }
            next(error);
            res.status(500).json('Internal server error');
        }
    }
}

export default new CompanyController();