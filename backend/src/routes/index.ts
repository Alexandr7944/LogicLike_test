import {Application, NextFunction, Request, Response} from "express";
import createHttpError from "http-errors";
import {initData} from "../utils/initData";
import {onError} from "../utils/onError";
import IdeasController from "../ideas/ideas.controller";
import IdeaVotesController from "../ideaVotes/ideaVotes.controller";
import WebClient from "./client";

class Routes {
    constructor(
        private app: Application,
    ) {
        this.initRoutes();
        this.initRoutes = this.initRoutes.bind(this);
    }

    initRoutes() {
        new WebClient(this.app);

        this.app.get("/initData", initData);

        this.app.get("/ideas", new IdeasController().getAllIdeas);

        this.app.post("/vote", new IdeaVotesController().create);

        this.app.use(function (_req: Request, _res: Response, next: NextFunction) {
            next(createHttpError(404, 'Route not found'));
        });

        this.app.use(onError)
    }
}

export default Routes;
