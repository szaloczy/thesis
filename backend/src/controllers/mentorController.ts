import { Request, Response, NextFunction } from "express";
import mentorService from "../services/mentorService";

class MentorController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const results = await mentorService.getAllMentor();

            res.json(results);
        } catch (error) {
            next(error);
            res.status(500).json('Internal server error');
        }
    }
}

export default new MentorController();