FROM node:12.18.3

LABEL version="1.0"
LABEL description="This is the base docker image for the Teal backend API."
LABEL maintainer = ["jhony.wt@gmail.com"]

WORKDIR .

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .

EXPOSE 3333

CMD ["node", "server.js"]