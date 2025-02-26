import { Request, Response } from "express";
import userService from "../services/userService";

class userController {

    public async getUser(req: Request, res: Response) {

        try {
            const id = parseInt(req.params.id);

            if(isNaN(id)) {
                res.status(400).json({ success: false, msg: "Invalid user ID" });
            }
    
            const user = await userService.getUserById(id);
            res.status(200).json({ success: true, data: user });
        } catch (error) {
            res.status(404).json({ success: false, error: "User not found"});
        }
       
    }
}

export default new userController;