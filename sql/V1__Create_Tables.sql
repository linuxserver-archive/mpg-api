delimiter $$

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `registration` varchar(20) DEFAULT NULL,
  `make` varchar(100) DEFAULT NULL,
  `model` varchar(100) DEFAULT NULL,
  `yearOfManufacture` INT(11) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
)$$

CREATE  TABLE `fuel` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `vehicleId` INT(11) NOT NULL,
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fuelAmountLitres` DECIMAL(5,2) NOT NULL,
  `totalCost` DECIMAL(5,2) NULL,
  `fuelCostPerLitre` DECIMAL(5,2) NULL,
  `locationLatitude` DECIMAL(10,8) NULL,
  `locationLongitude` DECIMAL(11,8) NULL,
  `odometerReading` INT(11) NULL,
  `notes` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `FK_fuel_vehicleId_idx` (`vehicleId` ASC),
  CONSTRAINT `FK_fuel_vehicleId`
    FOREIGN KEY (`vehicleId`)
    REFERENCES `vehicles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
)$$

CREATE TABLE `cost` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `vehicleId` INT(11) NOT NULL,
    `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `costType` VARCHAR(20) NOT NULL,
    `totalCost` DECIMAL(6,2) NOT NULL,
    `invoice` VARCHAR(100) NULL,
    `notes` TEXT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC),
    INDEX `FK_cost_vehicleId_idx` (`vehicleId` ASC),
    CONSTRAINT `FK_cost_vehicleId`
      FOREIGN KEY (`vehicleId`)
      REFERENCES `vehicles` (`id`)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
)$$
