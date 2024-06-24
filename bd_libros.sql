-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: bookbyte
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

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
  `book_id` int(11) NOT NULL AUTO_INCREMENT,
  `book_name` varchar(100) NOT NULL,
  `book_author` varchar(50) NOT NULL,
  `book_genre` varchar(40) NOT NULL,
  `book_price` decimal(10,2) NOT NULL,
  `book_numPage` int(11) NOT NULL,
  `book_datePublication` date NOT NULL,
  `book_placePublication` varchar(45) NOT NULL,
  `book_vol` int(11) NOT NULL,
  `book_isbn` bigint(20) NOT NULL,
  `book_editorial` varchar(45) NOT NULL,
  `book_amount` int(11) NOT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (4,'Harry Potter y las Reliquias de la Muerte','J. K. Rowling','Fantasia',549.00,704,'2020-05-24','España',1,9786073193566,'Salamandra',10),(5,'La maldición del Titán','Rick Riordan','Fantasia',369.00,304,'2023-12-12','España',1,9786073838764,'Salamandra',0),(6,'Guerra Mundial Z: Una Historia Oral de la Guerra Zombi','Max Brooks','Terror',249.00,472,'2019-05-01','España',1,9786073170161,'Penguin Random House Grupo Editorial',20),(7,'Dune','Frank Herbert','Ciencia ficción',242.00,784,'2020-08-01','Estados Unidos',1,9786073194648,'Penguin Random House Grupo Editorial',0),(9,'La Poética Del Espacio',' Gaston Bachelard','Poesía',158.00,326,'2020-07-12','mi casa',2,978,' Fondo de Cultura Económica',10),(10,'Anatomía de la melancholia',' Robert Burton','Divulgativos',355.00,489,'2015-06-30','tu casa',2,978,'Alianza Editorial Sa',56);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `c_metodo_pago`
--

DROP TABLE IF EXISTS `c_metodo_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `c_metodo_pago` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `TIPO` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_metodo_pago`
--

LOCK TABLES `c_metodo_pago` WRITE;
/*!40000 ALTER TABLE `c_metodo_pago` DISABLE KEYS */;
INSERT INTO `c_metodo_pago` VALUES (1,'OXXO'),(2,'PAYPAL'),(3,'TARJETA');
/*!40000 ALTER TABLE `c_metodo_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCliente` int(11) NOT NULL,
  `idLibro` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `carrito_user_idx` (`idCliente`),
  KEY `libro_idx` (`idLibro`),
  CONSTRAINT `carrito_libro` FOREIGN KEY (`idLibro`) REFERENCES `books` (`book_id`),
  CONSTRAINT `carrito_user` FOREIGN KEY (`idCliente`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
INSERT INTO `carrito` VALUES (1,7,6,0);
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_orden`
--

DROP TABLE IF EXISTS `detalle_orden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_orden` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ID_ORDEN` int(11) NOT NULL,
  `ID_PRODUCTO` int(11) NOT NULL,
  `CANTIDAD` int(11) NOT NULL,
  `PRECIO` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ID_ORDEN` (`ID_ORDEN`),
  KEY `ID_PRODUCTO` (`ID_PRODUCTO`),
  CONSTRAINT `ID_ORDEN` FOREIGN KEY (`ID_ORDEN`) REFERENCES `orden` (`id`),
  CONSTRAINT `ID_PRODUCTO` FOREIGN KEY (`ID_PRODUCTO`) REFERENCES `books` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_orden`
--

LOCK TABLES `detalle_orden` WRITE;
/*!40000 ALTER TABLE `detalle_orden` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_orden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disponibles`
--

DROP TABLE IF EXISTS `disponibles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disponibles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idLibro` int(11) NOT NULL,
  `CANTIDAD` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `disponibles_libro` (`idLibro`),
  CONSTRAINT `disponibles_libro` FOREIGN KEY (`idLibro`) REFERENCES `books` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disponibles`
--

LOCK TABLES `disponibles` WRITE;
/*!40000 ALTER TABLE `disponibles` DISABLE KEYS */;
/*!40000 ALTER TABLE `disponibles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domicilios`
--

DROP TABLE IF EXISTS `domicilios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domicilios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCliente` int(11) NOT NULL,
  `calle` varchar(45) NOT NULL,
  `ESTADO` varchar(45) NOT NULL,
  `Municipio` varchar(45) DEFAULT NULL,
  `CP` varchar(10) DEFAULT NULL,
  `TELEFONO` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ID_CLIENTE` (`idCliente`),
  CONSTRAINT `ID_CLIENTE` FOREIGN KEY (`idCliente`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domicilios`
--

LOCK TABLES `domicilios` WRITE;
/*!40000 ALTER TABLE `domicilios` DISABLE KEYS */;
/*!40000 ALTER TABLE `domicilios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favoritos`
--

DROP TABLE IF EXISTS `favoritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_book` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `favs_user_idx` (`id_user`),
  KEY `libro_idx` (`id_book`),
  CONSTRAINT `favs_libro` FOREIGN KEY (`id_book`) REFERENCES `books` (`book_id`),
  CONSTRAINT `favs_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritos`
--

LOCK TABLES `favoritos` WRITE;
/*!40000 ALTER TABLE `favoritos` DISABLE KEYS */;
INSERT INTO `favoritos` VALUES (1,7,4),(2,7,5);
/*!40000 ALTER TABLE `favoritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orden`
--

DROP TABLE IF EXISTS `orden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orden` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int(11) NOT NULL,
  `ID_METODO_PAGO` int(11) NOT NULL,
  `TOTAL` decimal(10,2) NOT NULL,
  `ID_DOMICILIO` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ID_USUARIO` (`ID_USUARIO`),
  KEY `ID_METODO_PAGO` (`ID_METODO_PAGO`),
  KEY `ID_DOMICILIO` (`ID_DOMICILIO`),
  CONSTRAINT `ID_DOMICILIO` FOREIGN KEY (`ID_DOMICILIO`) REFERENCES `domicilios` (`id`),
  CONSTRAINT `ID_METODO_PAGO` FOREIGN KEY (`ID_METODO_PAGO`) REFERENCES `c_metodo_pago` (`id`),
  CONSTRAINT `ID_USUARIO` FOREIGN KEY (`ID_USUARIO`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orden`
--

LOCK TABLES `orden` WRITE;
/*!40000 ALTER TABLE `orden` DISABLE KEYS */;
/*!40000 ALTER TABLE `orden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `user_lastname` varchar(45) NOT NULL,
  `user_email` varchar(45) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_role` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Josue','Nájera','josue123@gmail.com','$2b$10$TuJdIuSkN.7mh14O7iY6IO33z9L6WvlVtwA1mqg2ifG0vVaQ.7Wva',0),(2,'administrador','administrador','admin@admin.com','$2b$10$RRZ/RYNfRiG3F3H0BH5SguK.AELboQnO9Trrp6wYvC9PuLi8oU0Cy',0),(3,'Jaime Brayan','Almogabar Nolasco','dadas123brayan@gmail.com','$2b$10$DPSLRyI8rhjqCDQGmDsWLeOWeVsWCF/NEhIdxCFXO60OK1Ufz/Pda',2),(4,'Jaime Brayan','Almogabar Nolasco','dadas123brayan@gmail.com','$2b$10$OwlCTSp3jrmeCbDTDOhlsOmVU84Qj/bkk7geL13Sxv7k9fsTYlfka',2),(5,'Jaime Brayan','Almogabar Nolasco','dadas123brayan@gmail.com','$2b$10$12/4AC1YH.wzlw2EK.rPe.71t2Yef53dF8ffq6hXclKSlAqV7Fl.W',2),(6,'Jaime Brayan','Almogabar Nolasco','dadas123brayan@gmail.com','$2b$10$dhM121y./8MU3i8EP2qiwOApSzvbnGfUtYAhkm0AVk7MC3DC1dd/W',2),(7,'Jaime Brayan','Almogabar Nolasco','dadas123brayan@gmail.com','$2b$10$5yzM23SmefgGc4uS8Rbp5uPrRpcJgJZytK1E7.YRCpnK903vlrnla',2),(8,'Braulio','Díaz','braulio@gmail.com','$2b$10$w1F/j.ffHfNJ6d1vmH87Fu4qjSassCXeWO0AnIuP0INZbHcapfGpK',2);
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

-- Dump completed on 2024-06-23 19:52:35
