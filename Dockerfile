FROM node:18.15.0 as node-builder

COPY . /tmp/build

WORKDIR /tmp/build

ENV REACT_APP_BACKEND_DOMAIN=/api

RUN npm install
RUN npm run build:prod


FROM nginx:1.23.4-alpine

COPY --from=node-builder /tmp/build/build/ /usr/share/nginx/html

#RUN mkdir -p /etc/nginx/routes
#RUN mkdir -p /etc/nginx/ssl

EXPOSE 80
