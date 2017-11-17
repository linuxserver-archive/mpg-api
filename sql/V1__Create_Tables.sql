delimiter $$

CREATE TABLE `fuelUnits` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `unit` VARCHAR(20) NOT NULL,
    `unitName` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id_UNIQUE` (`id` ASC)
)$$

CREATE TABLE `fuelConsumptionUnits` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `unit` VARCHAR(20) NOT NULL,
    `unitName` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id_UNIQUE` (`id` ASC)
)$$

CREATE TABLE `distanceUnits` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `unit` VARCHAR(20) NOT NULL,
    `unitName` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id_UNIQUE` (`id` ASC)
)$$

CREATE TABLE `fuelTypes` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id_UNIQUE` (`id` ASC)
)$$

CREATE TABLE `vehicles` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `registration` VARCHAR(20) DEFAULT NULL,
    `make` VARCHAR(100) DEFAULT NULL,
    `model` VARCHAR(100) DEFAULT NULL,
    `picture` VARCHAR(100) DEFAULT NULL,
    `yearOfManufacture` INT(11) NULL,
    `vin` VARCHAR(100) NULL,
    `fuelType` INT(11) NOT NULL,
    `fuelUnit` INT(11) NOT NULL,
    `distanceUnit` INT(11) NOT NULL,
    `fuelConsumptionUnit` INT(11) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `id_UNIQUE` (`id` ASC),
    INDEX `FK_vehicle_fuelUnit_idx` (`fuelUnit`),
    INDEX `FK_vehicle_fuelType_idx` (`fuelType`),
    INDEX `FK_vehicle_distanceUnit_idx` (`distanceUnit`),
    INDEX `FK_vehicle_fuelConsumptionUnit_idx` (`fuelConsumptionUnit`),
    CONSTRAINT `FK_vehicle_fuelType` FOREIGN KEY (`fuelType`) REFERENCES `fuelTypes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK_vehicle_fuelUnit` FOREIGN KEY (`fuelUnit`) REFERENCES `fuelUnits` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK_vehicle_distanceUnit` FOREIGN KEY (`distanceUnit`) REFERENCES `distanceUnits` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `FK_vehicle_fuelConsumptionUnit` FOREIGN KEY (`fuelConsumptionUnit`) REFERENCES `fuelConsumptionUnits` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
)$$

CREATE  TABLE `fuel` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `vehicle` INT(11) NOT NULL,
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
    INDEX `FK_fuel_vehicleId_idx` (`vehicle` ASC),
    CONSTRAINT `FK_fuel_vehicleId` FOREIGN KEY (`vehicle`) REFERENCES `vehicles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
)$$

CREATE TABLE `cost` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `vehicle` INT(11) NOT NULL,
    `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `costType` VARCHAR(20) NOT NULL,
    `totalCost` DECIMAL(6,2) NOT NULL,
    `invoice` VARCHAR(100) NULL,
    `notes` TEXT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC),
    INDEX `FK_cost_vehicleId_idx` (`vehicle` ASC),
    CONSTRAINT `FK_cost_vehicleId` FOREIGN KEY (`vehicle`) REFERENCES `vehicles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
)$$
