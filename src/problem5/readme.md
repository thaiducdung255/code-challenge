# Description
* An CRUD example using NodeJS, Typescript and PostgreSQL for data persistent. Besides, I used some libraries:
    * [Drizzle-ORM](https://orm.drizzle.team/): a new ORM that provides rich feature like Prisma or TypeORM but also have better performance.
    * [Biome](https://biomejs.dev/): this is an alternative for Eslint and Prettier, I have used it in my current project, and it consume about 120MB of RAM, comparing to over 4GB of RAM when using Eslint.
    * Express JS doc for swagger: for API documentation.
    * Pino and pino-pretty: implement logger middleware
    * Zod: for API input validation
    * helmet and express-rate-limit: for security purposes
* I also write `Dockerfile` and `docker-compose` for this example, the docker apply some techiques to reduce image size and also use Docker cache when possible. the `docker-compose` have a service named `db.migrate` to apply migrations to the db, so after the migration run, this service will be exited.
    
# Requirement
* NodeJS and NPM installed
* Docker and docker compose installed

## Steps
1. Copy `.sample.env` to `.env.production`
2. Run: `docker compose up`
3. Open browser: http://localhost:3500/api-docs
