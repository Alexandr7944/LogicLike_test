import env from "./env/env";

const options = {
    host:    env.DB_HOST,
    port:    env.DB_PORT,
    dialect: "postgres",
    logging: false,
    pool:    {
        max:     5,
        min:     0,
        acquire: 30000,
        idle:    10000
    },
};

console.log(`${options.host}:${options.port}/${env.DB_NAME}`);

const config = {
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    ...options,
};

export default config;
