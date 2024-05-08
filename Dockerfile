FROM docker.io/node:lts as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ARG APP_NAME
RUN corepack enable
WORKDIR /usr/src/app
COPY . .


FROM base as build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpx nx run ${APP_NAME}:build

FROM base as prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base as production
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./${APP_NAME}
RUN chown -R node:node .
USER node
ENV APP_ROOT=${APP_NAME}/main.js

CMD node ${APP_ROOT}
