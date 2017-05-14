-- MySQL Script generated by MySQL Workbench
-- dom 14 mai 2017 20:21:11 -03
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema courses_infoeste_2017
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema courses_infoeste_2017
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `courses_infoeste_2017` DEFAULT CHARACTER SET utf8 ;
USE `courses_infoeste_2017` ;

-- -----------------------------------------------------
-- Table `courses_infoeste_2017`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `courses_infoeste_2017`.`user` (
  `code` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(80) NOT NULL,
  `token_recovery` TEXT NOT NULL,
  `createdAt` DATETIME NOT NULL,
  PRIMARY KEY (`code`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `courses_infoeste_2017`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `courses_infoeste_2017`.`post` (
  `code` INT NOT NULL AUTO_INCREMENT,
  `user_code` INT NOT NULL,
  `text` VARCHAR(45) NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`code`),
  INDEX `fk_post_user_idx` (`user_code` ASC),
  CONSTRAINT `fk_post_user`
    FOREIGN KEY (`user_code`)
    REFERENCES `courses_infoeste_2017`.`user` (`code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;