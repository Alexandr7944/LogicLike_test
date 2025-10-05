import IdeaVoteModel, {InputIdeaVote} from "./ideaVotes.model";


export type IdeaVotesRepositoryPort = {
    create: (ideaId: number, ip: string) => Promise<IdeaVoteModel>;
    findIdsByIp: (ip: string) => Promise<number[]>;
    createMany: (ideaVotes: InputIdeaVote[]) => Promise<void>;
    truncateModel: () => Promise<void>;
}
