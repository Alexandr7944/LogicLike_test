import {Table, Model, Column, DataType, HasMany} from "sequelize-typescript";
import IdeaVoteModel from "../ideaVotes/ideaVotes.model";

export type InputIdea = {
    title: string;
    description: string;
}

export type Idea = InputIdea & {
    id: number;
}

@Table({
    timestamps: false,
    tableName:  "ideas",
})

export default class IdeaModel extends Model<Idea, InputIdea> {
    @Column({
        type:          DataType.INTEGER,
        primaryKey:    true,
        autoIncrement: true,
    })
    declare id?: number;

    @Column({
        type:      DataType.STRING,
        allowNull: false,
    })
    declare title?: string;

    @Column({
        type:      DataType.STRING,
        allowNull: false,
    })
    declare description?: string;

    @HasMany(() => IdeaVoteModel)
    declare votes: IdeaVoteModel[];
}
