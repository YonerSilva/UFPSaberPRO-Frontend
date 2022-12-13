# pull official base image
FROM node:lts-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json .
RUN npm install --legacy-peer-deps

# add app
COPY . ./

# start app
CMD ["npm", "start"]