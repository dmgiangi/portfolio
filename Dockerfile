# Stage 1: Build the site
FROM klakegg/hugo:ext-alpine AS builder

WORKDIR /src
COPY . .

# Build the site
RUN hugo --minify

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=builder /src/public /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
