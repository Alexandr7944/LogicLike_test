import {Table, Model, Column, DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import IdeaModel from "../ideas/idea.model";

export type InputIdeaVote = {
    idea_id: number;
    ip_address: string;
}

export type IdeaVote = InputIdeaVote & {
    id: number;
    voted_at: Date;
}

@Table({
    timestamps: false,
    tableName:  "idea_votes",
})

export default class IdeaVoteModel extends Model<IdeaVote, InputIdeaVote> {
    @Column({
        type:          DataType.INTEGER,
        autoIncrement: true,
        primaryKey:    true,
    })
    declare id: number;

    @ForeignKey(() => IdeaModel)
    @Column({
        type:      DataType.INTEGER,
        allowNull: false,
    })
    declare idea_id: number;

    @Column({
        type:      DataType.STRING,
        allowNull: false,
    })
    declare ip_address: string;

    @Column({
        type:         DataType.DATE,
        allowNull:    false,
        defaultValue: DataType.NOW,
    })
    declare voted_at: Date;

    @BelongsTo(() => IdeaModel)
    declare idea: IdeaModel;
}
