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
RUN apt-get -y install openssh-server apache2 supervisor
RUN mkdir -p /var/lock/apache2 /var/run/apache2 /var/run/sshd /var/log/supervisor
COPY ./docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
RUN a2enmod rewrite

# build project
COPY ./ /www/my-simple-frontend
WORKDIR /www/my-simple-frontend
RUN npm install
RUN npm run build
COPY ./docker/my-simple-frontend.conf /etc/apache2/sites-enabled/000-default.conf

# cleanup
RUN apt-get autoremove && apt-get autoclean && apt-get clean && npm cache clear

EXPOSE 80
ENTRYPOINT ["docker/run.sh"]