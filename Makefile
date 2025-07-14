up-services:
	docker compose pull
	docker compose build
	docker compose up -d
	docker exec -i life-organizer-db bash -c "chmod +x /home/database-extra-scripts.sh && /home/database-extra-scripts.sh"
down-services:
	docker compose down
app-tests:
	npm run build
	npm run test
database-tests:
	make up-services
	./__test__/test-database.sh
