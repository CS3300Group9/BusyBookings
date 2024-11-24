DROP TABLE IF EXISTS `users`;
CREATE TABLE users (
    username VARCHAR(255),
    hashed_password VARCHAR(255),
    user_type VARCHAR(255)
); 
CREATE TABLE bookings (
    start_time VARCHAR(255),
    end_time VARCHAR(255),
    buisness VARCHAR(255),
    customer VARCHAR(255)
); 