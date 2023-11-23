import jwt from 'jsonwebtoken';
import { secretKey } from '../config';
import { Request, Response, NextFunction } from 'express';

/**
 *
 * Middleware that verifies that the request being made has a valid jwt token
 * @returns unauthorized error codes if the jwt token is not valid
 */
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // gets the incoming token from the authorization header
  // ex: 'Bearer <JWT Token>'
  let token = req.headers['authorization']?.split(' ')[1];

  // returns error code if there is no token
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  // verify the token
  jwt.verify(token, secretKey.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      });
    }
    // if decoded value, set the query id to the decoded id which is the user's Id in the DB
    if (decoded && typeof decoded !== 'string') {
      req.query.id = decoded.id;
    }
    next();
  });
};
