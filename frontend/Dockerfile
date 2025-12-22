FROM node:20-alpine AS builder

ARG NEXT_PUBLIC_API_URL
ARG API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV API_URL=$API_URL

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

CMD ["sh","-c","npm run start"]