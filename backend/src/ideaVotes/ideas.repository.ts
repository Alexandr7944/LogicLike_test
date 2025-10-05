import {IdeaVotesRepositoryPort} from "./ideaVotes.port";
import IdeaVoteModel, {IdeaVote, InputIdeaVote} from "./ideaVotes.model";

export default class IdeaVotesRepository implements IdeaVotesRepositoryPort {

    constructor(
        private ideaVotesModel: typeof IdeaVoteModel,
    ) {
        this.createMany = this.createMany.bind(this);
    }

    async create(ideaId: number, ip: string): Promise<IdeaVoteModel> {
        return await this.ideaVotesModel.create({idea_id: ideaId, ip_address: ip});
    }

    async findIdsByIp(ip: string): Promise<number[]> {
        const ideaVotes = await this.ideaVotesModel.findAll({
            where:      {ip_address: ip,},
            attributes: ["idea_id"],
        });
        return ideaVotes.map((ideaVote) => ideaVote.idea_id);
    }

    async createMany(data: InputIdeaVote[]): Promise<void> {
        await this.ideaVotesModel.bulkCreate(data);
    }

    async truncateModel(): Promise<void> {
        await this.ideaVotesModel.truncate({cascade: true});
    }
}
