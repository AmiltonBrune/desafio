FROM node:18.18.0-alpine
RUN npm install -g npm@9.8.1
RUN mkdir -p /var/www/items
WORKDIR /var/www/items
ADD . /var/www/items
RUN npm install
CMD npm run build && npm run start:prod
