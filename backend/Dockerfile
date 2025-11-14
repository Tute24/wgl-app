FROM node:20-alpine
ENV NODE_ENV=production
#optimizing the image construction by setting the production node_env 
WORKDIR /app

COPY package*.json ./ 
#copies package.json and the package-lock.json
RUN npm install --omit=dev

COPY . .
RUN npm run build
RUN npx prisma generate
#running prisma generate for type recognition

EXPOSE 3000
CMD ["npm","run", "start"]