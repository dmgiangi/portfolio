# syntax=docker/dockerfile:1

# Stage 1: Build static site with pinned Hugo extended
FROM hugomods/hugo:exts-0.125.7 AS builder

WORKDIR /src
COPY . .

# Fail fast if Hugo build fails
RUN hugo --minify

# Stage 2: Serve static site
FROM nginx:1.27-alpine

COPY --from=builder /src/public /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
