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
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `messages` (
  `id_messages` int(11) NOT NULL AUTO_INCREMENT,
  `id_player_sent` int(11) NOT NULL,
  `id_player_destiny` int(11) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `watched` tinyint(1) NOT NULL DEFAULT '0',
  `subject` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_messages`),
  KEY `fk_player_destiny_idx` (`id_player_destiny`),
  KEY `FK_player_sent_idx` (`id_player_sent`),
  CONSTRAINT `FK_player_destiny` FOREIGN KEY (`id_player_destiny`) REFERENCES `players` (`id_player`),
  CONSTRAINT `FK_player_sent` FOREIGN KEY (`id_player_sent`) REFERENCES `players` (`id_player`)
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,3,1,'Hola Julio este finde puedes jugar al tenis','2019-07-31 16:44:43',0,'jugar al tenis'),(2,1,3,'Hola Luis este finde no se si podre jugar al tenis','2019-08-02 14:56:20',1,'jugar al tenis'),(3,3,7,'Hola Ana este finde ire a veros','2019-08-02 14:58:48',0,'visitar este finde'),(4,7,3,'Hola Luis el viernes no estaremos en casa, pero a partir del sabado podemos vernos. ','2019-08-02 14:59:33',1,'visita este finde'),(5,1,7,'Hola Ana, se que Luis ira a veros pero no se si yo podre','2019-08-02 15:01:05',0,'visita este finde'),(6,7,4,'Hola Miguel, soy Ana y me gustaria jugar al tenis esta semana contigo, que te parece?','2019-08-04 21:26:36',1,'Jugar al Tenis esta semana'),(7,4,3,'Hola Luis, soy Miguel con quien jugaste ayer y  te dejaste la raqueta en la pista y la tengo yo.','2019-08-05 10:22:43',1,'Tengo tu raqueta de tenis'),(8,23,8,'Hola que tal','2019-08-06 21:37:38',0,'Hola'),(9,24,5,'Hola Miguel, quedamos esta tarde y jugamos un partido de tenis.','2019-08-07 11:37:29',0,'Quedamos estar tarde para un partido'),(10,24,7,'Hola Ana, que tal te fue el partido de ayer, como quedasteis?','2019-08-07 11:38:26',1,'Como te fue el partido'),(11,25,6,'Hola Carlos, soy Laura tienes una raqueta para prestarme, que la necesito.','2019-08-07 11:46:19',0,'Tienes una raqueta para dejarme'),(12,25,22,'Hola Inma, soy Ana te recuerdo que esta tarde tenemos partido.','2019-08-07 11:50:36',0,'Esta tarde tenemos partido'),(14,3,6,'que tal por malaga','2019-08-10 12:26:56',0,'hola carlos'),(16,3,2,'Alfonso estas ahi','2019-08-10 12:32:57',0,'Alfonso'),(18,3,2,'Alfonso no podre ir','2019-08-11 11:34:41',1,'Alfonso estoy muy liado'),(19,3,23,'estoy con el proyecto y no podre ir','2019-08-11 11:35:01',0,'Hola antonio'),(20,3,22,'que tal estas?','2019-08-11 17:25:56',0,'hola inma'),(25,25,3,'Hola Luis, Soy Laura nos conocimos en el club de tenis ayer, quieres jugar al tenis  esta tarde?','2019-08-28 17:31:13',1,'Hola Luis quieres jugar al tenis esta tarde'),(26,65,3,'Hola luis,\n soy kerly que tal estas, quieres jugar tenis?','2019-08-28 19:38:22',1,'hola luis que tal'),(27,25,3,'esto es una prueba','2019-08-29 19:51:00',1,'estoy probando los mensajes'),(28,67,3,'hola luis que tal','2019-08-29 20:43:46',1,'hola luis'),(33,76,3,'Hola Luis, soy el muchacho que conocistes el otro dia en el campeonato de tenis','2019-08-31 09:27:44',1,'Hola luis quieres jugar al tenis el domingo'),(42,3,7,'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas magni soluta, ducimus voluptas doloribus deserunt iure accusantium cupiditate aspernatur temporibus! Quos reiciendis unde vero enim, aut labore incidunt? Ea in minima atque fugiat laudantium nostrum nesciunt earum repellendus numquam? Mollitia, illo. Mollitia laboriosam deleniti voluptates. Pariatur ut, placeat sequi aut, officiis quisquam porro similique saepe expedita exercitationem quasi  ','2019-08-31 18:33:43',1,'hola'),(47,3,44,'Hola lucy, soy Luis que tal estas?, queria preguntarte si querias jugar esta semana al tenis','2019-09-01 12:15:38',0,'hola lucy que tal estas'),(48,44,3,'Hola luis lo siento voy a borrar mi cuenta y me voy al extranejro','2019-09-01 21:33:33',1,'hola luis lo siento');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-12  0:49:03
