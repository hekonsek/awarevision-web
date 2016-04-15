FROM ubuntu
MAINTAINER Henryk Konsek <hekonsek@gmail.com>

# Install NodeJS and HTTP server
RUN apt-get update -qq
RUN apt-get install npm -qq
RUN ln -s /usr/bin/nodejs /usr/bin/node
RUN npm install http-server -g

COPY . /thingsservice-web
WORKDIR /thingsservice-web

ENTRYPOINT ["/thingsservice-web/env-redirect.sh"]
