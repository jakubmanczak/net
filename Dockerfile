FROM node:20-alpine
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install

COPY ./ ./
RUN npx next build

CMD npx next start
