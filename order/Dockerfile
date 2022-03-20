ARG NODE_VERSION="10-alpine"

# build image installs npm dependencies
FROM node:${NODE_VERSION} as build
ENV NODE_ENV development
WORKDIR /usr/app
COPY ./ ./
RUN npm install

# production image copies dependencies from build image and source files
FROM node:${NODE_VERSION}
EXPOSE "5001"
WORKDIR /usr/app
COPY --from=build /usr/app/node_modules/ ./node_modules/
COPY ./package.json ./
COPY ./ ./
CMD ["npm", "start"]