FROM node:15.0.1
WORKDIR /backend
COPY package*.json ./
RUN npm i
# build and start
COPY . .
RUN npm run build
CMD npm run start
