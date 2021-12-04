build:
	docker build -t nikfred/enerchest:client .
run:
	docker run -p 3000:3000 --rm --name enerchest-client nikfred/enerchest:client
run-bg:
	docker run -p 3000:3000 -d --name enerchest-client nikfred/enerchest:client
run+:build run
run-bg+:build run-bg
prune:
	docker image prune
push:build
	docker push nikfred/enerchest:client


