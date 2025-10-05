import {NextFunction, Request, Response} from "express";
import createHttpError from "http-errors";
import IdeaVoteModel, {InputIdeaVote} from "../ideaVotes/ideaVotes.model";
import {IdeaVotesRepositoryPort} from "./ideaVotes.port";
import {getIp} from "../utils/getIp";
import IdeaVotesRepository from "./ideas.repository";

export default class IdeaVotesController {
    repository!: IdeaVotesRepositoryPort;

    constructor() {
        this.repository = new IdeaVotesRepository(IdeaVoteModel);

        this.create = this.create.bind(this);
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const ipAddress = getIp(req);
            const ideaId: number = req.body.ideaId;

            if (!ipAddress || !ideaId)
                return next(createHttpError(404, "Bad Request"));

            const votedIds = await this.getVotedIds(ipAddress);
            if (votedIds.includes(ideaId) || votedIds.length >= 10)
                return next(createHttpError(409, "Conflict"));

            const ideaVote = await this.repository.create(ideaId, ipAddress);
            res.status(201).json(ideaVote);
        } catch (err) {
            return next(err);
        }

    }

    async getVotedIds(ip: string): Promise<number[]> {
        return await this.repository.findIdsByIp(ip);
    }

    async initData(data: InputIdeaVote[]) {
        return await this.repository.createMany(data);
    }

    async truncateModel(): Promise<void> {
        await this.repository.truncateModel();
    }
}
