build:
	@docker compose build

start:
	@docker compose start

stop:
	@docker compose stop

restart:
	@make stop
	@make start

run-migrations:
	@docker exec shop-api bash -c "yarn prisma migrate deploy" 
