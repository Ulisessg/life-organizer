CREATE DATABASE life-organizer;

CREATE TABLE unit_of_measure_system (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name CHAR(8) NOT NULL UNIQUE
);

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id CHAR(36) NOT NULL UNIQUE,
  preferred_unit_of_measure_system_id INT NOT NULL,
  FOREIGN KEY (preferred_unit_of_measure_system_id)
    REFERENCES unit_of_measure_system(id)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
);

CREATE INDEX idx_user_preferred_unit_of_measure_system ON user(preferred_unit_of_measure_system_id);

CREATE TABLE user_larder (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  FOREIGN KEY (user_id)
    REFERENCES user(id)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
);

CREATE INDEX idx_user_larder_user ON user_larder(user_id);

CREATE TABLE unit_of_measure_type (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE unit_of_measure(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  name_in_imperial_system CHAR(50) NOT NULL UNIQUE,
  unit_of_measure_type_id INT NOT NULL,
  FOREIGN KEY (unit_of_measure_type_id)
    REFERENCES unit_of_measure_type(id)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
);

CREATE INDEX idx_unit_of_measure_unit_of_measure_type ON unit_of_measure(unit_of_measure_type_id);

CREATE TABLE ingredient_type(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE shared_ingredient(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL UNIQUE,
  unit_of_measure_type_id INT NOT NULL,
  ingredient_type_id INT NOT NULL,
  FOREIGN KEY (unit_of_measure_type_id)  
    REFERENCES unit_of_measure_type(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  FOREIGN KEY (ingredient_type_id)
    REFERENCES ingredient_type(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

CREATE INDEX idx_shared_ingredient_unit_of_measure_type ON shared_ingredient(unit_of_measure_type_id);
CREATE INDEX idx_shared_ingredient_ingredient_type ON shared_ingredient(ingredient_type_id);

CREATE TABLE shared_larder_ingredient(
  id INT AUTO_INCREMENT PRIMARY KEY,
  shared_ingredient_id INT NOT NULL UNIQUE,
  unit_of_measure_id INT NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  expiration_date DATE,
  FOREIGN KEY (shared_ingredient_id)
    REFERENCES shared_ingredient(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  FOREIGN KEY (unit_of_measure_id)
    REFERENCES unit_of_measure(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

CREATE INDEX idx_shared_larder_shared_ingredient ON shared_larder_ingredient(shared_ingredient_id);
CREATE INDEX idx_shared_larder_unit_of_measure ON shared_larder_ingredient(unit_of_measure_id);

CREATE TABLE user_ingredient(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL UNIQUE,
  user_id INT NOT NULL,
  unit_of_measure_type_id INT NOT NULL,
  ingredient_type_id INT NOT NULL,
  FOREIGN KEY (user_id)
    REFERENCES user(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  FOREIGN KEY (unit_of_measure_type_id)
    REFERENCES unit_of_measure_type(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  FOREIGN KEY (ingredient_type_id)
    REFERENCES ingredient_type(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

CREATE INDEX idx_user_ingredient_user ON user_ingredient(user_id);
CREATE INDEX idx_user_ingredient_unit_of_measure_type ON user_ingredient(unit_of_measure_type_id);
CREATE INDEX idx_user_ingredient_ingredient_type ON user_ingredient(ingredient_type_id);


CREATE TABLE user_larder_ingredient(
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_larder_id INT NOT NULL,
  user_ingredient_id INT NOT NULL UNIQUE,
  unit_of_measure_id INT NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  expiration_date DATE,
  FOREIGN KEY (user_larder_id)
    REFERENCES user_larder(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  FOREIGN KEY (user_ingredient_id)
    REFERENCES user_ingredient(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  FOREIGN KEY (unit_of_measure_id)
    REFERENCES unit_of_measure(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

CREATE INDEX idx_user_larder_ingredient_user_larder ON user_larder_ingredient(user_larder_id);
CREATE INDEX idx_user_larder_ingredient_user_ingredient ON user_larder_ingredient(user_ingredient_id);
CREATE INDEX idx_user_larder_ingredient_unit_of_measure ON user_larder_ingredient(unit_of_measure_id);
