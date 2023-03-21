FROM node:16-alpine as build-stage

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG COMMITHASH=0
ENV VUE_APP_COMMITHASH=$COMMITHASH

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn run build

FROM nginx:alpine as production-stage

COPY deployments/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
