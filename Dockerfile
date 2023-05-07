FROM node:16
WORKDIR /app
COPY . .
RUN npm install --production
EXPOSE 3000
RUN npm run build
CMD ["npm", "start"]