# Shopping cart API

NestJS shopping-cart API using CQRS, TypeORM and MySQL.

1. Install with `pnpm install --frozen-lockfile` (pnpm 9).
2. Copy `.env.example` to `.env` and adjust database credentials.
3. Start MySQL with `docker compose up -d mysql-server`; the sample host port is 7000.
4. Run `pnpm start:dev`. Swagger: `http://localhost:3000/docs`.

Checks: `pnpm build`, `pnpm test --runInBand` and `pnpm test:e2e` (requires MySQL).
Set `DB_SYNC=false` outside development; schema synchronization is enabled in the sample.
The API Docker image takes configuration at runtime with `--env-file`; use a database hostname reachable from the container.
