import { Request, Response, NextFunction } from "express";
import companyService from "../services/companyService";

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
}

export default new CompanyController();