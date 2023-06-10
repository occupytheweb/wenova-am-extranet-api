ALTER TABLE users
    ADD otp char(25)
;
ALTER TABLE users
    ADD otp_valid_until datetime
;
