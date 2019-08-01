CREATE DATABASE  IF NOT EXISTS `proyectoprueba1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `proyectoprueba1`;
-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: proyectoprueba1
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `player` (
  `idPlayer` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `pass` varchar(20) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `firstname` varchar(20) DEFAULT NULL,
  `lastname` varchar(20) DEFAULT NULL,
  `sex` varchar(20) DEFAULT NULL,
  `edad` tinyint(4) DEFAULT NULL,
  `province` varchar(20) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `points` smallint(6) DEFAULT NULL,
  `commentary` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`idPlayer`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (3,'Inma','algo','inma@gmail.com',NULL,'inma','bon','Mujer',26,'Malaga','Malaga',NULL,3,NULL,NULL),(4,'laura1','actriz','laura1@gmail.com',NULL,'laura','no se','Mujer',28,'Malaga','Malaga',NULL,2.5,NULL,NULL),(5,'adrian','actor','adrian@gmail.com',NULL,'adrian','mas','Hombre',29,'Malaga','Malaga',NULL,1.5,NULL,NULL),(6,'carmen','algo2','carmen@gmail.com',NULL,'carmen','algo mas asdgfdsggag','Mujer',25,'Malaga','Malaga',NULL,4,NULL,NULL),(7,'juanlu','tenista','juanlu@gmail.com',NULL,'','','',NULL,'','',NULL,3.5,NULL,NULL),(8,'raul1','primera fila','raul1@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(9,'miguel2','telefono roto','miguel2@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(10,'mario','tatoos','mario@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'raul2','bonachera','raul2@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(12,'pablo','diseñador','pablo@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(13,'laura2','diseñadora','laura2@gmail.com',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,'luis','bonachera yo','luis1234@gmail.com',NULL,'luis','MELANO','Hombre',123,'Malaga','Malaga',NULL,2.5,NULL,NULL),(25,'ROSA','MELANO','rosamelano@gmail.com',NULL,'ROSA','MELANO','Extraño',34,'MELANO','MELANO',NULL,3.5,NULL,NULL),(26,'Yo','algo','inma@gmail.com',NULL,'ROSA','bon','Hombre',1,'Malaga','MELANO',NULL,4.5,NULL,NULL),(27,'luis','otro','luis@gmail.com',NULL,'ROSA','bon','Hombre',123,'Malaga','Malaga',NULL,3.5,NULL,'sdklgjhlkñasdgjñasdgjñasdgad dslfk sdjfña sdjfasd la kasd gfflkasd ads asd lkañds ka dgjadgjñ'),(28,'luis','1234','inma@gmail.com',NULL,'luis','bon','Hombre',28,'Malaga','Malaga',NULL,3.5,NULL,NULL),(29,'luis','algo','inma@gmail.com',NULL,'inma','bon','Hombre',32,'Malaga','Malaga',NULL,2.5,NULL,NULL),(34,'Jugador','1234','correo@ejemplo',NULL,'luis','bon','Hombre',25,'Malaga','Malaga',NULL,5.5,NULL,'reygrewgtewgd');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-17 20:11:53
