import type { NextFunction, Request, Response } from 'express';

export class BadRequestError extends Error {
  public readonly action: string;
  public readonly statusCode: number;

  constructor({
    message = 'Um erro de validação ocorreu.',
    action = 'Ajuste os dados enviados e tente novamente',
  } = {}) {
    super(message);
    this.message = message;
    this.statusCode = 400;

    this.action = action;
  }
}

export function errorHandler(
  error: Error,
  _: Request,
  res: Response,
  __: NextFunction,
) {
  if (error instanceof BadRequestError) {
    return res.status(error.statusCode).json({
      message: error.message,
      action: error.action,
      cause: error.cause,
    });
  }

  console.error(error);

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${error.message}`,
  });
}