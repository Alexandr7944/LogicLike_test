import IdeaModel, {Idea, InputIdea} from "./idea.model";
import {IdeasRepositoryPort} from "./ideas.port";
import IdeasRepository from "./ideas.repository";
import {NextFunction, Request, Response} from "express";
import IdeaVotesController from "../ideaVotes/ideaVotes.controller";
import {getIp} from "../utils/getIp";
import createHttpError from "http-errors";

export default class IdeasController {
    repository!: IdeasRepositoryPort;

    constructor() {
        this.repository = new IdeasRepository(IdeaModel);
        this.getAllIdeas = this.getAllIdeas.bind(this);
    }

    async getAllIdeas(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const ip = getIp(req);
            const votedIds = ip ? await new IdeaVotesController().getVotedIds(ip) : []
            const result = await this.repository.findAll(votedIds);
            res.json(result);
        } catch (err: any) {
            next(createHttpError(err))
        }
    }

    async initData(data: InputIdea[]): Promise<number[]> {
        const result =  await this.repository.createMany(data);
        return result.map(idea => idea.id as number);
    }

    async truncateModel(): Promise<void> {
        await this.repository.truncateModel();
    }
}
