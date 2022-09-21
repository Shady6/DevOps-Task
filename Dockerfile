FROM node:latest as builder

ENV DB_CONNECTION=sqlite::memory
ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY . /usr/src/app

RUN npm ci && \
    npm run test && \
    npm run build

CMD [ "node", "dist/index.js" ]
EXPOSE 4000