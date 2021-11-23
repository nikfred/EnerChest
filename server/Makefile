build:
	docker build -t nikfred/enerchest:back-end .
run:
	docker run -p 5000:5000 --rm --name enerchest nikfred/enerchest:back-end
run-bg:
	docker run -p 5000:5000 -d --name enerchest nikfred/enerchest:back-end
run+:build run
run-bg+:build run-bg


