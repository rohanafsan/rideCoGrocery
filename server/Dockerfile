FROM node:lts-alpine3.14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# RUN npm rebuild bcrypt –build-from-source
# Bundle app source
COPY . .

# Expose port 8000
EXPOSE 8000

# Run the app
CMD [ "node", "server.js"]
