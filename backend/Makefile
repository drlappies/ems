start-db:
	@echo start postgreSQL

	@if [ $(shell docker ps -a | grep -ci ems-postgresql) -eq 0 ]; then \
		echo starting postgreSQL; \
		docker run --name ems-postgresql -d \
			-p 8080:8080 \
			-e POSTGRES_USER=emspguser \
			-e POSTGRES_PASSWORD=emspgpass \
			postgres; \
	elif [ $(shell docker ps | grep -ci ems-postgresql) -eq 0 ]; then \
		echo starting postgreSQL; \
		docker start postgreSQL;  \
	fi

stop-db:
	@echo stop postgreSQL

	@if [ $(shell docker ps -a | grep -ci ems-postgresql) -eq 1 ]; then \
		echo Stopping ems-postgresql; \
		docker stop ems-postgresql; \
		docker rm ems-postgresql; \
	fi