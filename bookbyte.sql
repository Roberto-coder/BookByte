-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bookbyte
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `book_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `book_author` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `book_genre` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `book_price` decimal(10,2) NOT NULL,
  `book_numPage` int NOT NULL,
  `book_datePublication` date NOT NULL,
  `book_placePublication` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `book_vol` int NOT NULL,
  `book_isbn` bigint NOT NULL,
  `book_editorial` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `book_amount` int NOT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (4,'Harry Potter y las Reliquias de la Muerte','J. K. Rowling','Fantasia',549.00,704,'2020-05-24','España',1,9786073193566,'Salamandra',10),(5,'La maldición del Titán','Rick Riordan','Fantasia',369.00,304,'2023-12-12','España',1,9786073838764,'Salamandra',0),(6,'Guerra Mundial Z: Una Historia Oral de la Guerra Zombi','Max Brooks','Terror',249.00,472,'2019-05-01','España',1,9786073170161,'Penguin Random House Grupo Editorial',20),(7,'Dune','Frank Herbert','Ciencia ficción',242.00,784,'2020-08-01','Estados Unidos',1,9786073194648,'Penguin Random House Grupo Editorial',0);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idCliente` int NOT NULL,
  `idLibro` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `carrito_user_idx` (`idCliente`),
  KEY `libro_idx` (`idLibro`),
  CONSTRAINT `carrito_libro` FOREIGN KEY (`idLibro`) REFERENCES `books` (`book_id`),
  CONSTRAINT `carrito_user` FOREIGN KEY (`idCliente`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (28,5,6,1),(29,5,4,1);
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_orden`
--

DROP TABLE IF EXISTS `detalle_orden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_orden` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ID_ORDEN` int NOT NULL,
  `ID_PRODUCTO` int NOT NULL,
  `CANTIDAD` int NOT NULL,
  `PRECIO` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ID_ORDEN` (`ID_ORDEN`),
  KEY `ID_PRODUCTO` (`ID_PRODUCTO`),
  CONSTRAINT `ID_ORDEN` FOREIGN KEY (`ID_ORDEN`) REFERENCES `orden` (`id`),
  CONSTRAINT `ID_PRODUCTO` FOREIGN KEY (`ID_PRODUCTO`) REFERENCES `books` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_orden`
--

LOCK TABLES `detalle_orden` WRITE;
/*!40000 ALTER TABLE `detalle_orden` DISABLE KEYS */;
INSERT INTO `detalle_orden` VALUES (1,11,4,2,1098.00),(2,11,5,2,738.00),(3,12,4,3,1647.00),(4,12,7,1,242.00),(5,14,6,1,249.00),(6,15,4,1,549.00),(7,16,6,1,249.00),(8,17,4,1,549.00),(9,18,4,2,1098.00),(10,19,6,2,498.00),(11,20,4,1,549.00),(12,24,4,1,549.00),(13,25,4,1,549.00);
/*!40000 ALTER TABLE `detalle_orden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disponibles`
--

DROP TABLE IF EXISTS `disponibles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disponibles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idLibro` int NOT NULL,
  `CANTIDAD` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `disponibles_libro` (`idLibro`),
  CONSTRAINT `disponibles_libro` FOREIGN KEY (`idLibro`) REFERENCES `books` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disponibles`
--

LOCK TABLES `disponibles` WRITE;
/*!40000 ALTER TABLE `disponibles` DISABLE KEYS */;
INSERT INTO `disponibles` VALUES (4,7,9),(5,4,10),(6,6,4),(7,5,5);
/*!40000 ALTER TABLE `disponibles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domicilios`
--

DROP TABLE IF EXISTS `domicilios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domicilios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idCliente` int NOT NULL,
  `Nombre` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `CP` varchar(5) COLLATE utf8mb4_general_ci NOT NULL,
  `numExterior` int DEFAULT NULL,
  `numInterior` int DEFAULT NULL,
  `calleext1` varchar(60) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `calleext2` varchar(60) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ESTADO` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `Municipio` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `colonia` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `calle` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `TELEFONO` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `indicaciones` varchar(80) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ID_CLIENTE` (`idCliente`),
  CONSTRAINT `ID_CLIENTE` FOREIGN KEY (`idCliente`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domicilios`
--

LOCK TABLES `domicilios` WRITE;
/*!40000 ALTER TABLE `domicilios` DISABLE KEYS */;
INSERT INTO `domicilios` VALUES (1,5,'EMMANUEL EINAR','55755',2,3,'adas','asdsada','Ciudad de México','aasdas','adsa','aaaaaa','5583355495','Tecamac'),(2,3,'EMMANUEL EINAR','55755',155,65,'dasa','sada','Ciudad de México','sadasada','adsad','asda','5583355495','Tecamac'),(3,3,'bbh','55755',155,3,'adas','','Ciudad de México','sadasada','adsad','asda','5583355495','Tecamac');
/*!40000 ALTER TABLE `domicilios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favoritos`
--

DROP TABLE IF EXISTS `favoritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_book` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `favs_user_idx` (`id_user`),
  KEY `libro_idx` (`id_book`),
  CONSTRAINT `favs_libro` FOREIGN KEY (`id_book`) REFERENCES `books` (`book_id`),
  CONSTRAINT `favs_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritos`
--

LOCK TABLES `favoritos` WRITE;
/*!40000 ALTER TABLE `favoritos` DISABLE KEYS */;
INSERT INTO `favoritos` VALUES (8,3,6),(9,3,7),(10,5,4);
/*!40000 ALTER TABLE `favoritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orden`
--

DROP TABLE IF EXISTS `orden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orden` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int NOT NULL,
  `TOTAL` decimal(10,2) NOT NULL,
  `ID_DOMICILIO` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ID_USUARIO` (`ID_USUARIO`),
  KEY `ID_DOMICILIO` (`ID_DOMICILIO`),
  CONSTRAINT `ID_DOMICILIO` FOREIGN KEY (`ID_DOMICILIO`) REFERENCES `domicilios` (`id`),
  CONSTRAINT `ID_USUARIO` FOREIGN KEY (`ID_USUARIO`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden`
--

LOCK TABLES `orden` WRITE;
/*!40000 ALTER TABLE `orden` DISABLE KEYS */;
INSERT INTO `orden` VALUES (3,3,0.00,2),(4,3,0.00,2),(6,5,0.00,1),(7,5,0.00,1),(8,5,0.00,1),(9,5,0.00,1),(10,3,0.00,2),(11,3,1836.00,2),(12,5,1889.00,1),(13,5,0.00,1),(14,5,249.00,1),(15,3,549.00,2),(16,3,249.00,2),(17,5,549.00,1),(18,3,1098.00,2),(19,3,498.00,2),(20,3,549.00,2),(21,3,0.00,2),(22,3,0.00,2),(23,3,0.00,2),(24,3,549.00,2),(25,3,549.00,2);
/*!40000 ALTER TABLE `orden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `user_lastname` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `user_email` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `user_password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `user_role` int NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Josue','Nájera','josue123@gmail.com','$2b$10$TuJdIuSkN.7mh14O7iY6IO33z9L6WvlVtwA1mqg2ifG0vVaQ.7Wva',2),(2,'administrador','administrador','admin@admin.com','$2b$10$RRZ/RYNfRiG3F3H0BH5SguK.AELboQnO9Trrp6wYvC9PuLi8oU0Cy',0),(3,'Emmanuel','Zurita','ezurita056@gmail.com','$2b$10$EE4BmUal9/5Qbh14bXIA7e1byjB1pePSA5JPPa/g.dsHy/jQWlqUe',2),(4,'Emmanuel','Zurita','ezurita056@gmail.com','$2b$10$HMiop161a8foVMSytp.OKOh90WAp6Nv81iUeptCUhq.c0hZVnqk5a',2),(5,'siuuu','aaaa','ezurita056.2@gmail.com','$2b$10$zGjwScj4EVjbY9F2m3Io2e4nMrwgMe4.WVUDVI2bF5TAygFfMpU7G',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-07 10:49:40
