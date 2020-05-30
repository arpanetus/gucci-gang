FROM node:12.16.1 as base

WORKDIR /gucci-gang
COPY . .
RUN yarn install && yarn build

EXPOSE 4001

