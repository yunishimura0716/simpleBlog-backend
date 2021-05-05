import {NextFunction, Request, Response, Router} from 'express';

export class UserRouter {
    private userRouter = Router();

    getRoutes(): Router {
        this.userRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
            try {
                return res.status(200).send("get users");
            } catch (e) {
                return next(e);
            }
        });

        return this.userRouter;
    }

}