CREATE DATABASE  IF NOT EXISTS `proyectotenis` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `proyectotenis`;
-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: proyectotenis
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
-- Table structure for table `players`
--

DROP TABLE IF EXISTS `players`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `players` (
  `id_player` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `city` varchar(30) NOT NULL,
  `genre` enum('HOMBRE','MUJER') NOT NULL,
  `rating` tinyint(4) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_player`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (1,'Julio','julio@correo.com','da53a96cecabd281faf24f23c162b8eadfe72b58816e7625e76459eefb51743a',NULL,'Málaga','HOMBRE',2,1),(2,'papa','papa@correo.com','58cc6181518fbfb49da9c50db08ce31aa92feebaecc6c46a3a8084e87b50f037',NULL,'Málaga','HOMBRE',3,0),(3,'Luis','luis@correo.com','1be075b9041a58b82be347b54e9f3d7f5d84dc57935bcc769106748a9eb237e8',NULL,'Málaga','HOMBRE',3,1),(4,'miguel','miguel@correo.com','5ef68465886fa04d3e0bbe86b59d964dd98e5775e95717df978d8bedee6ff16c',NULL,'Ronda','HOMBRE',1,0),(5,'miguel2','miguel2@correo.com','5ef68465886fa04d3e0bbe86b59d964dd98e5775e95717df978d8bedee6ff16c',NULL,'Málaga','HOMBRE',1,0),(7,'Ana','ana@correo.com','dea210f058b407db5c1b5ea89b2e42a57221c003dba55e2f1776a75a3254d386',NULL,'Ronda','MUJER',2,0),(8,'Maria','maria@correo.com','9ff18ebe7449349f358e3af0b57cf7a032c1c6b2272cb2656ff85eb112232f16',NULL,'Torremolinos','MUJER',1,0),(9,'Carlos','carlos@correo.com','6369568f26e218856b8af13f45017c0c79ae212d31e4c9db41af71ce1f022a22',NULL,'Alhaurin de la Torre','HOMBRE',3,0),(10,'Juan','juan@correo.com','cb80be76d732c36bd5f71ecdd7b6964556730a19ceccd8b8c1869220bb4c7b7c',NULL,'Marbella','HOMBRE',4,0);
/*!40000 ALTER TABLE `players` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-05  0:23:25