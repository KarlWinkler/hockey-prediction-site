BACKEND_CONTAINER ?= 'nhl-bets-backend'
FRONTEND_CONTAINER ?= 'nhl-bets-frontend'
DATABASE_CONTAINER ?= 'nhl-bets-db'

build:
	@docker-compose build

up:
	@docker-compose up

down:
	@docker-compose down

migrations:
	@docker exec -it ${BACKEND_CONTAINER} python manage.py makemigrations

migrate:
	@docker exec -it ${BACKEND_CONTAINER} python manage.py migrate

shell:
	@docker exec -it ${BACKEND_CONTAINER} sh -c '/bin/bash'

db:
	@docker exec -it ${DATABASE_CONTAINER} psql -U pointer

superuser:
	@docker exec -it ${BACKEND_CONTAINER} python manage.py createsuperuser

seed:
	@docker exec -it ${BACKEND_CONTAINER} python manage.py loaddata fixtures/fixture.json

dump:
	@docker exec -it ${BACKEND_CONTAINER} python manage.py dumpdata --exclude auth.permission --exclude contenttypes --exclude admin.logentry --exclude sessions.session > fixtures.json
