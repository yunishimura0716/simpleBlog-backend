import e, { Request, Response } from 'express';
import { ErrorObject } from './ErrorObject';
import { BaseError } from './Error';

/**
 * Middleware function to catch all global errors and convert them into FrontEndErrorObjects
 * */
export function errorHandler(
  error: Error,
  req: Request,
  res: Response
): e.Response<string, Record<string, string>> {
  if (error instanceof BaseError)
    return res
      .status(error.status)
      .send(new ErrorObject(error.name, [error.message]));

  return res.status(500).send(new ErrorObject(error.name, [error.message]));
}
