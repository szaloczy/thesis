import { Request, Response, NextFunction } from "express";
import { expressjwt } from "express-jwt";
import { UserRole } from "../types/user";

export const checkUser = expressjwt({
  secret: process.env.SECRET_KEY as string,
  algorithms: ["HS256"],
  getToken: (req) => {
    if(req.cookies.jwt) {
        return req.cookies.jwt;
    }
  },
});

export const handleAuthorizationError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "UnauthorizedError") {
    res
      .status(401)
      .send({ error: "Authentication is required for this operation." });
  } else {
    next(err);
  }
};

export const verifyRole = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      res.status(401).json({ success: false, msg: "Unauthorized" });
    }

    if (!roles.includes(user.role)) {
      res.status(403).json({ success: false, msg: "Forbidden" });
    }

    next();
  };
};
