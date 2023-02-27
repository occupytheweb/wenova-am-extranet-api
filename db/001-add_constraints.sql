ALTER TABLE distributeurs
    ADD UNIQUE (id_dist)
;
ALTER TABLE distributeurs
    ADD UNIQUE (email_signataire)
;

ALTER TABLE distributeurs
    MODIFY id_dist int NOT NULL
;
ALTER TABLE distributeurs
    MODIFY email_signataire varchar(255) NOT NULL
;
ALTER TABLE distributeurs
    MODIFY first_name varchar(255) NOT NULL
;
ALTER TABLE distributeurs
    MODIFY last_name varchar(255) NOT NULL
;
