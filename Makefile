
all: docker-build docker-run

docker-build:
	sudo docker build -t my-simple-frontend .

docker-run:
	sudo docker run my-simple-frontend

	
