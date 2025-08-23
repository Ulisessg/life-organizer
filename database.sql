CREATE TABLE IF NOT EXISTS user (
  user_uuid CHAR(36) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS user_larder (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_uuid CHAR(36) NOT NULL UNIQUE,
  FOREIGN KEY (user_uuid)
    REFERENCES user(user_uuid)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_user_larder_user_uuid ON user_larder(user_uuid);

CREATE TABLE IF NOT EXISTS unit_of_measure (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name CHAR(50) NOT NULL UNIQUE
);


CREATE TABLE IF NOT EXISTS shared_ingredient (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name CHAR(200) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS shared_larder_ingredient (
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

CREATE INDEX IF NOT EXISTS idx_shared_larder_shared_ingredient ON shared_larder_ingredient(shared_ingredient_id);
CREATE INDEX IF NOT EXISTS idx_shared_larder_unit_of_measure ON shared_larder_ingredient(unit_of_measure_id);

CREATE TABLE IF NOT EXISTS user_ingredient (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL UNIQUE,
  user_uuid CHAR(36) NOT NULL,
  FOREIGN KEY (user_uuid)
    REFERENCES user(user_uuid)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_user_ingredient_user ON user_ingredient(user_uuid);

CREATE TABLE IF NOT EXISTS user_larder_ingredient (
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

CREATE INDEX IF NOT EXISTS idx_user_larder_ingredient_user_larder ON user_larder_ingredient(user_larder_id);
CREATE INDEX IF NOT EXISTS idx_user_larder_ingredient_user_ingredient ON user_larder_ingredient(user_ingredient_id);
CREATE INDEX IF NOT EXISTS idx_user_larder_ingredient_unit_of_measure ON user_larder_ingredient(unit_of_measure_id);
