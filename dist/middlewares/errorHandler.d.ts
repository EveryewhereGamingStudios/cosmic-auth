import { MoralisError } from '@moralisweb3/common-core';
import { NextFunction, Request, Response } from 'express';
export declare function errorHandler(error: Error | MoralisError, req: Request, res: Response, _next: NextFunction): void;
