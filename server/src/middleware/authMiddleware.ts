import { User } from '../models/UserModel';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware that checks if the username or email provided already exists
 * returns an error accordingly
 */
export const checkDuplicateUsernameOrEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // check for duplicate username
  const isDuplicateUsername = await User.findOne({
    username: req.body.username,
  }).exec();

  // check for duplicate email
  const isDuplicateEmail = await User.findOne({ email: req.body.email }).exec();

  // if either is not null, return error accordingly
  if (isDuplicateUsername || isDuplicateEmail) {
    if (isDuplicateUsername) {
      res.status(400).send({ message: "'Failed! Username is already in use!" });
      return;
    } else {
      res.status(400).send({ message: "'Failed! Email is already in use!" });
      return;
    }
  }
  next();
};
