FROM node:16-slim AS node 
WORKDIR /usr/app
COPY . .
RUN npm install 
RUN npm run build

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d
COPY --from=node /usr/app/dist/kepbongeszo /usr/share/nginx/html

