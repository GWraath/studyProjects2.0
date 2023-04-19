drop table capstone_plants.plants;

CREATE TABLE capstone_plants.plants (
  `PlantIMGURL` varchar(255),
  `PlantCName` varchar(255) NOT NULL,
  `PlantLName` varchar(255) NOT NULL,
  `PlantVitamins` varchar(255),
  `PlantMinerals` varchar(255),
  `PlantPharmaProps` varchar(255),
  `PlantDesc` varchar(255),
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

select * from capstone_plants.plants