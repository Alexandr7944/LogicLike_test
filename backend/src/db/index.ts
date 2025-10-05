import {Sequelize} from "sequelize-typescript";
import config from "../config/db.config";
import Idea from "../ideas/idea.model";
import IdeaVoteModel from "../ideaVotes/ideaVotes.model";

export default class Database {
    public sequelize: Sequelize | undefined;

    constructor() {
        this.connectToDatabase().catch(e => {
            console.log(e);
            throw e;
        });
    }

    private async connectToDatabase() {
        // @ts-ignore
        this.sequelize = new Sequelize({
            ...config,
            models: [Idea, IdeaVoteModel]
        });

        await this.sequelize
            .authenticate()
            .then(() => console.log("Connection has been established successfully."))
            .catch((err) => console.error("Unable to connect to the Database:", err));
    }
}
