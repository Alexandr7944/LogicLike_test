import express from "express";
import path from "path";

export default class WebClient {
    private readonly clientRoot: string;
    private readonly clientPath: string;
    private readonly isDevMode: boolean;

    constructor(private app: express.Application) {
        this.isDevMode = process.env.NODE_ENV === 'development';
        this.clientRoot = '../../../client/dist';
        this.clientPath = process.env.CLIENT_STATIC_PATH ?? path.join(__dirname, this.clientRoot);
        this.init()
    }

    private init() {
        this.app.use(express.static(process.env.CLIENT_STATIC_PATH ?? path.join(__dirname, this.clientRoot)));

        if (this.isDevMode) {
            /* Allows cross-origin access from the Vite dev server */
            this.app.use(function (req, res, next) {
                res.header('Access-Control-Allow-Origin', req.header('origin'));
                res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
                next();
            });
        }

        this.app.get('/', (_req, res) => {
            console.log('Serving index.html')
            console.log('path', path.join(this.clientPath, 'index.html'))
            res.sendFile(path.join(this.clientPath, 'index.html'));
        });
    }

}
