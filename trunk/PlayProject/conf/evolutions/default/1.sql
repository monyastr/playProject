# --- First database schema

# --- !Ups

CREATE TABLE `my_entity` (
  id                  int(11) unsigned NOT NULL AUTO_INCREMENT,
  name                varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  list                varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  date                varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY id_UNIQUE (id)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8



# --- !Downs



