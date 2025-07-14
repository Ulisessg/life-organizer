#!/usr/bin/env bash
set -e

# Wait until MariaDB is ready
until healthcheck.sh --connect; do
  echo "Waiting for MariaDB to become available..."
  sleep 2
done

db_tables_script=$(cat /home/database.sql)

# Run SQL commands
mariadb -u root -p${MARIADB_ROOT_PASSWORD} <<-EOSQL
  CREATE DATABASE IF NOT EXISTS life_organizer_data;
  CREATE USER IF NOT EXISTS 'life_organizer_user'@'%' IDENTIFIED BY '${DB_DATA_USER_PASSWORD}';
  GRANT ALL PRIVILEGES ON life_organizer_data.* TO 'life_organizer_user'@'%';

  CREATE DATABASE IF NOT EXISTS keycloak;
  CREATE USER IF NOT EXISTS 'keycloak'@'%' IDENTIFIED BY '${DB_KEYCLOAK_USER_PASSWORD}';
  GRANT ALL PRIVILEGES ON keycloak.* TO 'keycloak'@'%';
  FLUSH PRIVILEGES;
  
  USE life_organizer_data;
  ${db_tables_script}

EOSQL

