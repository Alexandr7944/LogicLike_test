import IdeaModel, {InputIdea} from "./idea.model";

export type IdeasRepositoryPort = {
    findAll: (votedIds: number[]) => Promise<IdeaModel[]>;
    createMany: (ideas: InputIdea[]) => Promise<IdeaModel[]>;
    truncateModel: () => Promise<void>;
}
