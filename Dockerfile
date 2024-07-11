FROM node:20

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["sh", "-c", "yarn typeorm-ts-node-commonjs migration:run -d src/data-source.ts && yarn start"]
