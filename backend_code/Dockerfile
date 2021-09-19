FROM node:current-alpine

ARG APP_ENVIRONMENT=development
ENV NODE_ENV=$APP_ENVIRONMENT

ARG APP_RELEASE=1.0.0
ENV API_VERSION=$APP_RELEASE

WORKDIR /demo-api

# Bundle APP files
COPY . .

RUN npm config set unsafe-perm true

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production
RUN npm install -g pino-pretty

#RUN apk add vips-dev fftw-dev build-base --update-cache \
#    --repository http://alpine.global.ssl.fastly.net/alpine/edge/testing/ \
#    --repository http://alpine.global.ssl.fastly.net/alpine/edge/main

# Expose the listening port of your app
EXPOSE 4000

CMD [ "npm", "start" ]