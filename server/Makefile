build:
	docker build --platform linux/amd64 -t nikfred/enerchest:server .
run:
	docker run -p 5000:5000 --rm --name enerchest-server nikfred/enerchest:server
run-bg:
	docker run -p 5000:5000 -d --name enerchest-server nikfred/enerchest:server
run+:build run
run-bg+:build run-bg
push:build prune
	docker push nikfred/enerchest:server

build-arm:
	docker build -t nikfred/enerchest:server-arm .

push-arm:build-arm prune
	docker push nikfred/enerchest:server-arm

prune:
	docker image prune -f

