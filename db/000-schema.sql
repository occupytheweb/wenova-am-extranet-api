/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Souscriptions`
--

DROP TABLE IF EXISTS `Souscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Souscriptions` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `﻿Id_Souscription` varchar(255) DEFAULT NULL,
  `Investisseur` varchar(255) DEFAULT NULL,
  `Ste` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Produit` varchar(255) DEFAULT NULL,
  `Montant` float DEFAULT NULL,
  `Droit_entree` float DEFAULT NULL,
  `DE_WAM` float DEFAULT NULL,
  `Mode_Paiement` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Cash_in` varchar(255) DEFAULT NULL,
  `Last_Modified` datetime DEFAULT NULL,
  `Date_BS` datetime DEFAULT NULL,
  `Num_ODDO` int DEFAULT NULL,
  `Date_effet` datetime DEFAULT NULL,
  `Attestation_ODDO` varchar(255) DEFAULT NULL,
  `attestation` varchar(255) DEFAULT NULL,
  `Id_dist` int DEFAULT NULL,
  `Fonds` varchar(255) DEFAULT NULL,
  `LetrODDO` int DEFAULT NULL,
  `LetrDE` int DEFAULT NULL,
  `AirRecId` varchar(80) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `Id_dist` (`Id_dist`),
  KEY `AirRecId` (`AirRecId`),
  KEY `LetrODDO` (`LetrODDO`),
  KEY `LetrDE` (`LetrDE`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `com_note`
--

DROP TABLE IF EXISTS `com_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `com_note` (
  `record_id` varchar(255) DEFAULT NULL,
  `note_id` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `id_dist` int DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `adresse` mediumtext,
  `email_dist` varchar(255) DEFAULT NULL,
  `periode` varchar(255) DEFAULT NULL,
  `note_date` datetime DEFAULT NULL,
  `total` double DEFAULT NULL,
  `urlPdf` varchar(255) DEFAULT NULL,
  `mail_sent` smallint DEFAULT '0',
  `payment_date` datetime DEFAULT NULL,
  PRIMARY KEY (`note_id`),
  UNIQUE KEY `note_id` (`note_id`),
  KEY `id_dist` (`id_dist`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `distributeurs`
--

DROP TABLE IF EXISTS `distributeurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `distributeurs` (
  `id_dist` int NOT NULL,
  `Raison_sociale` varchar(255) DEFAULT NULL,
  `Remarque` mediumtext,
  `Souscriptions` mediumtext,
  `Pdf_convention` varchar(255) DEFAULT NULL,
  `email_signataire` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email_compta` varchar(255) DEFAULT NULL,
  `civ` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `capital` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `rcsnb` varchar(255) DEFAULT NULL,
  `rcsof` varchar(255) DEFAULT NULL,
  `oriasNb` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email_notification` varchar(255) DEFAULT NULL,
  `IBAN` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_dist`),
  UNIQUE KEY `id_dist` (`id_dist`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
