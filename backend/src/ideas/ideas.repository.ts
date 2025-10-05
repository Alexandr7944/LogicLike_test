import IdeaModel, {Idea, InputIdea} from "./idea.model";
import IdeaVoteModel from "../ideaVotes/ideaVotes.model";
import {IdeasRepositoryPort} from "./ideas.port";
import sequelize, {FindOptions} from "sequelize";

export default class IdeasRepository implements IdeasRepositoryPort {

    constructor(
        private ideasModel: typeof IdeaModel
    ) {
        this.createMany = this.createMany.bind(this);
    }

    async findAll(votedIds: number[]): Promise<IdeaModel[]> {
        const options: FindOptions<Idea> = {
            attributes: {
                include: (
                             votedIds.length > 0
                                 ? [
                                     [sequelize.fn('COUNT', sequelize.col('votes.id')), 'votesCount'],
                                     [sequelize.literal(`CASE WHEN "IdeaModel"."id" IN (${votedIds.join(',')}) THEN true ELSE false END`), 'isVoted']
                                 ]
                                 : [[sequelize.fn('COUNT', sequelize.col('votes.id')), 'votesCount']]
                         )
            },
            include:    [{model: IdeaVoteModel, as: 'votes', attributes: [],}],
            group:      [sequelize.col('IdeaModel.id')],
            order:      [
                ['votesCount', 'DESC'],
                ['id', 'ASC'],
            ]
        };

        return await this.ideasModel.findAll(options);
    }

    async createMany(ideas: InputIdea[]): Promise<IdeaModel[]> {
        return await this.ideasModel.bulkCreate(ideas);
    }

    async truncateModel(): Promise<void> {
        await this.ideasModel.truncate({cascade: true})

    }
}
