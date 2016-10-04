
all: docker-build docker-run

docker-rm:
	docker ps -a -f name=my-simple-frontend -q | xargs -r docker rm -f

docker-build: docker-rm
	docker build -t my-simple-frontend .

docker-run: docker-rm
	docker run -it --name my-simple-frontend -p 4201:4201 my-simple-frontend

docker-shell:
	docker exec -it my-simple-frontend /bin/bash