#!/bin/sh
# This script test docker database
export $(cat .env.local | xargs)

testing_folder_path=$(pwd)"/__test__/"

echo "Testing databases exist"

docker exec -it life-organizer-db mariadb -u root -p${MARIADB_ROOT_PASSWORD} -e "SHOW DATABASES;" > $testing_folder_path/databases-created.txt

if grep -q keycloak $testing_folder_path/databases-created.txt; then
  echo "Keycloak database created"
else
  echo "Keycloak database missing"
  exit 1
fi

if grep -q life_organizer_data $testing_folder_path/databases-created.txt; then
  echo "life_organizer_data database created"
else
  echo "life_organizer_data database missing"
  exit 1
fi


echo "Testing life_organizer_data tables exist"

docker exec -it life-organizer-db mariadb -u root -p${MARIADB_ROOT_PASSWORD} -e "USE life_organizer_data; SHOW TABLES;" > $testing_folder_path/tables-created.txt

life_organizer_data_tables=("shared_ingredient" "shared_larder_ingredient" "unit_of_measure" "user" "user_ingredient" "user_larder" "user_larder_ingredient")

for db_table in ${life_organizer_data_tables[@]}
do
  if grep -q $db_table $testing_folder_path/tables-created.txt; then
    echo "table $db_table exists"
  else
    echo "table $db_table does not exists"
    exit 1
  fi
done

