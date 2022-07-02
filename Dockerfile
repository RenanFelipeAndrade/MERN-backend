# the image to use
FROM node:16 

# the app directory inside the container
WORKDIR /usr/src/backend

# copy the dependencies file and install all dependencies
COPY package*.json ./
RUN npm install

# first dot: copy all project files 
# second dot: equivalent to WORKDIR
COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
