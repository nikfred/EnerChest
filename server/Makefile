build:
	docker build -t nikfred/enerchest:server .
run:
	docker run -p 5000:5000 --rm --name enerchest-server nikfred/enerchest:server
run-bg:
	docker run -p 5000:5000 -d --name enerchest-server nikfred/enerchest:server
run+:build run
run-bg+:build run-bg
prune:
	docker image prune
push:build prune
	docker push nikfred/enerchest:server


