#dockerfile
FROM ubuntu:14.04

ENV DEBIAN_FRONTEND noninteractive

# common packages
RUN apt-get update && apt-get -y install \
		software-properties-common \
		build-essential \
		curl \
		git \
		rsync \
		zip \
		wget \
		python \
		vim

# install node 6
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && \
	apt-get -y install \
	nodejs

# node build tools
RUN npm install -g node-gyp node-pre-gyp

# install apache 2
RUN apt-get -y install apache2
COPY ./docker/my-simple-frontend.conf /etc/apache2/sites-enabled/my-simple-frontend.conf

# build project
COPY ./ /www/my-simple-frontend
WORKDIR /www/my-simple-frontend
###RUN npm install
###RUN npm run build

# cleanup
RUN apt-get autoremove && apt-get autoclean && apt-get clean && npm cache clear

EXPOSE 4201
ENTRYPOINT ["docker/run.sh"]