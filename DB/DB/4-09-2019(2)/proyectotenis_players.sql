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
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `erased` tinyint(1) NOT NULL DEFAULT '0',
  `avatar` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_player`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `players`
--

LOCK TABLES `players` WRITE;
/*!40000 ALTER TABLE `players` DISABLE KEYS */;
INSERT INTO `players` VALUES (1,'Julio','julio@correo.com','da53a96cecabd281faf24f23c162b8eadfe72b58816e7625e76459eefb51743a',NULL,'Málaga','HOMBRE',2,1,0,'1.jpg'),(2,'Alfonso','alfonso@correo.com','58cc6181518fbfb49da9c50db08ce31aa92feebaecc6c46a3a8084e87b50f037',NULL,'Málaga','HOMBRE',3,0,0,'2.jpg'),(3,'Luis','luis@correo.com','1be075b9041a58b82be347b54e9f3d7f5d84dc57935bcc769106748a9eb237e8',NULL,'Ronda','HOMBRE',3,1,0,'3.jpg'),(4,'miguel','miguel@correo.com','5ef68465886fa04d3e0bbe86b59d964dd98e5775e95717df978d8bedee6ff16c',NULL,'Ronda','HOMBRE',1,0,1,NULL),(5,'miguel2','miguel2@correo.com','5ef68465886fa04d3e0bbe86b59d964dd98e5775e95717df978d8bedee6ff16c',NULL,'Málaga','HOMBRE',1,0,1,NULL),(6,'Carlos','carlos@correo.com','6369568f26e218856b8af13f45017c0c79ae212d31e4c9db41af71ce1f022a22',NULL,'Cártame','HOMBRE',3,0,0,'6.jpg'),(7,'Ana','ana@correo.com','dea210f058b407db5c1b5ea89b2e42a57221c003dba55e2f1776a75a3254d386',NULL,'Ronda','MUJER',3,0,0,'7.jpg'),(8,'Maria2','maria@correo.com','9ff18ebe7449349f358e3af0b57cf7a032c1c6b2272cb2656ff85eb112232f16',NULL,'Torremolinos','MUJER',1,0,0,'8.jpg'),(9,'Juan2','juan@correo.com','cb80be76d732c36bd5f71ecdd7b6964556730a19ceccd8b8c1869220bb4c7b7c',NULL,'Marbella','HOMBRE',4,0,0,'9.jpg'),(22,'Inma','Inma@correo.com','6ea1a149e5a40835851141f1eccef4c9751a8002240264023524473496167d9a',NULL,'Málaga','MUJER',1,0,0,'22.jpg'),(23,'Antonio','antonio@correo.com','4ee3679892e6ac5a5b513eba7fd529d363d7a96508421c5dbd44b01b349cf514',NULL,'Málaga','HOMBRE',4,0,0,'23.jpg'),(24,'Lorena','lorena@correo.com','2bed7dfed277df864e5843e57f8ae14e38198053648a141dead0b7b1ce7307e5',NULL,'Campanillas','MUJER',4,0,0,'24.jpg'),(25,'Laura','laura@correo.com','f0b8649dbd8cc269a6a9f57166490602cb5e17344007e29c1591f6cdad29aa37',NULL,'Málaga','MUJER',3,0,0,'25.jpg'),(39,'yo2','yo','e9058ab198f6908f702111b0c0fb5b36f99d00554521886c40e2891b349dc7a1',NULL,'Málaga','HOMBRE',1,0,1,'39.jpg'),(43,'Nico2','nico@correo.com','6e5f3712838fc51d7eeb6a98431db05e04f3c4c595b3d652f42ffe70b47611a9',NULL,'Málaga','HOMBRE',2,1,0,'43.jpg'),(44,'lucy2','lucy@correo.com','dc99e9aa86fab83a062cff5e0808391757071a3d5dbb942802d5f923aaead3b4',NULL,'Málaga','MUJER',1,0,1,'44.png'),(65,'kerly','kerly@correo.com','12623c7b0bd3b72fa5f0f0bece5d3160c55112e42162a9ff2e0510c2c58b7258',NULL,'Málaga','MUJER',2,0,0,'65.jpg'),(66,'rupper','rupper@correo.com','5ed33d3a87ff64381df0d0d4b2056465855f2e89d2d15563f26e3b5175ad9b0f',NULL,'Málaga','HOMBRE',3,0,0,'66.jpg'),(67,'nuevo','nuevo@correo.com','238b4429a65d9a87985b33497d8368e0847b52437595018c604af92a154f3e98',NULL,'Málaga','HOMBRE',2,0,0,NULL),(76,'otro','otro@correo.com','c63a855fcfec62cc64a47280a4f51d052b67930873906af30aa92de2ce160c06',NULL,'Malaga','HOMBRE',2,0,0,'76.jpg'),(108,'nuevo2','nuevo2@correo.com','930c4db626306e36f5b5775f264557d3a1b41f23fb99c7b9ac9600947786b051',NULL,'RONDA','HOMBRE',2,0,0,'108.jpg'),(111,'Ruben','ruben@ruben.com','03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',NULL,'malaga','HOMBRE',3,0,0,'111.jpg');
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

-- Dump completed on 2019-09-04 19:19:18
