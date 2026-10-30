FROM node:18-bullseye AS builder
WORKDIR /src

COPY src .

ARG PERSONAL_DOMAIN_NAME
ENV PERSONAL_DOMAIN_NAME=${PERSONAL_DOMAIN_NAME}

RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=builder /src/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:80/ || exit 1
