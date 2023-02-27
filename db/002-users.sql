DROP TABLE IF EXISTS `users`;

CREATE TABLE `users`
(
    `id_dist`           int NOT NULL UNIQUE,
    `password_hash`     char(255) NOT NULL,
    `creation_time`     datetime  DEFAULT CURRENT_TIMESTAMP,
    `modification_time` datetime ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
-- note that utf8mb3 is deprecated
;
