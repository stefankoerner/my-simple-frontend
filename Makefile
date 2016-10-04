
all: docker-build docker-run

docker-build:
	docker build -t my-simple-frontend .

docker-run: docker-rm docker-build
	docker run -it --name my-simple-frontend -p 4201:4200 my-simple-frontend /watch

docker-rm:
	docker ps -a -f name=my-simple-frontend -q | xargs -r docker rm -f