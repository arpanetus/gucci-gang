FROM node:12.16.1 as base

WORKDIR /gucci-gang
COPY . .
RUN yarn && \
yarn build


FROM node:12.16.1 as gucci-gang-build
WORKDIR /gucci-gang
COPY --from=base /gucci-gang/build build
RUN node build/scripts/post-config-db.js

EXPOSE 4001

