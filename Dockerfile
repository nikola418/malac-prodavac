FROM docker.io/node:lts as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

ARG APP_NAME
ENV APP_NAME=${APP_NAME}

RUN corepack enable
WORKDIR /usr/src/app
COPY . .

FROM base as development
ENV NODE_ENV="development"
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm exec nx run-many -t prisma:generate
RUN pnpm exec nx run ${APP_NAME}:build

FROM base as production
ENV NODE_ENV="production"

COPY --from=development /usr/src/app/dist/apps/${APP_NAME} ./
COPY --from=development /usr/src/app/node_modules ./node_modules
RUN pnpm install --prod

RUN chown -R node:node .
USER node

CMD ["node", "main.js"]
