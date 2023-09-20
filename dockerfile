FROM node:14-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 80 443 22 3000/udp 8080/tcp 
CMD [ "npm", "run", "startBP" ]