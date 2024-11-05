// src/middlewares/logger.ts
import { Request, Response, NextFunction } from 'express';

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
};

export default logger;