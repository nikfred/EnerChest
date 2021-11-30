FROM node:14.17.3
#get templates image =>  base

# Create app directory
WORKDIR /var/enerchest

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
#1 argument - local, 2 argument - docker image

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000

VOLUME [ "/var/enerchest/static" ]

CMD [ "npm", "run", "dev" ]
