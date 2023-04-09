FROM node:18-alpine as builder
ENV NODE_ENV production

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . . 
RUN npm run build

FROM nginx:alpine
ENV NODE_ENV production

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80   
CMD ["nginx", "-g", "daemon off;"]
