FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --omit=dev

FROM nginx:alpine
COPY --from=node /app/dist/web-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
