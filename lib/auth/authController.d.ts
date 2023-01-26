import { NextFunction, Request, Response } from 'express';
export declare function request(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function verify(req: Request, res: Response, next: NextFunction): Promise<void>;
