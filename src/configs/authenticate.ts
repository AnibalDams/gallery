import { verify } from "jsonwebtoken";
import { Request, Response } from "express";


const authenticateJwt = (req: any | Request, res: Response, next: any) => {
  const authToken: string = req.query.utk;
  const key: any = process.env.JWTKEY;

  if (authToken) {
    verify(authToken, key, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
        next(err);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
    next();
  }
};
export default authenticateJwt;
