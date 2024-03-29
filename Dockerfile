# pull official base image
FROM node:lts-alpine as builder
     
# set working directory
WORKDIR /app

# add app
COPY . ./

# install app dependencies
COPY package.json .
RUN npm install --legacy-peer-deps

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]