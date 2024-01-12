FROM node:20-alpine
RUN corepack enable

WORKDIR /app
COPY . /app

RUN pnpm install --prod --frozen-lockfile
RUN pnpm run build

ENV NODE_ENV production
EXPOSE 80/tcp
CMD [ "pnpm", "start" ]
