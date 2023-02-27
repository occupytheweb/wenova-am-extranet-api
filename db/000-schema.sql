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
    `ID`               int          DEFAULT NULL,
    `Investisseur`     varchar(255) DEFAULT NULL,
    `Produit`          varchar(255) DEFAULT NULL,
    `Montant`          varchar(255) DEFAULT NULL,
    `Droit d'entrée`   varchar(255) DEFAULT NULL,
    `DE_WAM`           varchar(255) DEFAULT NULL,
    `Mode Paiement`    varchar(255) DEFAULT NULL,
    `Cash_in`          varchar(255) DEFAULT NULL,
    `Last Modified`    datetime     DEFAULT NULL,
    `Date BS`          datetime     DEFAULT NULL,
    `Num ODDO`         int          DEFAULT NULL,
    `Date d'effet`     datetime     DEFAULT NULL,
    `Attestation_ODDO` varchar(255) DEFAULT NULL,
    `attestation`      varchar(255) DEFAULT NULL,
    `Id_dist`          int          DEFAULT NULL,
    `Fonds`            varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `com_note`
--

DROP TABLE IF EXISTS `com_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `com_note` (
    `record_id`   varchar(255) DEFAULT NULL,
    `note_id`     int          DEFAULT NULL,
    `description` varchar(255) DEFAULT NULL,
    `id_dist`     int          DEFAULT NULL,
    `nom`         varchar(255) DEFAULT NULL,
    `adresse`     mediumtext,
    `email_dist`  varchar(255) DEFAULT NULL,
    `periode`     varchar(255) DEFAULT NULL,
    `note_date`   datetime     DEFAULT NULL,
    `total`       double       DEFAULT NULL,
    `urlPdf`      varchar(255) DEFAULT NULL,
    `mail_sent`   smallint     DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `distributeurs`
--

DROP TABLE IF EXISTS `distributeurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `distributeurs` (
    `id_dist`            int          DEFAULT NULL,
    `Raison_sociale`     varchar(255) DEFAULT NULL,
    `Remarque`           mediumtext,
    `Souscriptions`      mediumtext,
    `Pdf_convention`     varchar(255) DEFAULT NULL,
    `email_signataire`   varchar(255) DEFAULT NULL,
    `email_compta`       varchar(255) DEFAULT NULL,
    `civ`                varchar(255) DEFAULT NULL,
    `last_name`          varchar(255) DEFAULT NULL,
    `first_name`         varchar(255) DEFAULT NULL,
    `title`              varchar(255) DEFAULT NULL,
    `capital`            varchar(255) DEFAULT NULL,
    `address`            varchar(255) DEFAULT NULL,
    `rcsnb`              varchar(255) DEFAULT NULL,
    `rcsof`              varchar(255) DEFAULT NULL,
    `oriasNb`            varchar(255) DEFAULT NULL,
    `phone`              varchar(255) DEFAULT NULL,
    `email_notification` varchar(255) DEFAULT NULL,
    `IBAN`               varchar(50)  DEFAULT NULL
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
