FROM node:14-slim AS builder
ARG NPM_TOKEN
ARG REACT_APP_ENV=development
ENV REACT_APP_ENV=${REACT_APP_ENV}

RUN echo $'registry=https://registry.yarnpkg.com\n\
//npm.sangre.dev/:_authToken='"$NPM_TOKEN"'\n\
@sangre-fp:registry=https://npm.sangre.dev\n' > /root/.npmrc


COPY . /app
WORKDIR /app
RUN yarn && yarn build

FROM nginx:1.19-alpine
RUN rm -rf /etc/nginx/conf.d \
 && mkdir -p /usr/share/nginx/html

COPY docker/nginx /etc/nginx
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
