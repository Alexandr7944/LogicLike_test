export interface Idea {
    id: number;
    title: string;
    description: string;
    votesCount: number;
    isVoted?: boolean;
}
