FROM node:16.9.1-stretch as base
  WORKDIR /usr/app
  COPY . .
  RUN apt update && apt upgrade --yes
  RUN apt install openssl
  RUN yarn install
  RUN yarn prisma generate

FROM base as development
  ENV NODE_ENV=development
  CMD [ "yarn", "start-dev" ]

FROM base as production
  ENV NODE_ENV=production
  CMD [ "node", "./src/index.js" ]
