module.exports = {
    development: {
        client: "pg",
        connection: "postgres://localhost/g90_directory"
    },

    production: {
        client: "postgresql",
        connection: process.env.DATABASE_URL + "?ssl=true"
    }
};
