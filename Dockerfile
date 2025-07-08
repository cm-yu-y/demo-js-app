FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

FROM nginx:alpine

RUN apk add --no-cache nodejs npm supervisor

COPY --from=builder /app /app

COPY nginx.conf /etc/nginx/nginx.conf

COPY supervisord.conf /etc/supervisord.conf


EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]