DROP TABLE IF EXISTS `users`;
CREATE TABLE users (
    username VARCHAR(255),
    hashed_password VARCHAR(255),
    user_type VARCHAR(255)
); 
DROP TABLE IF EXISTS `bookings`;
CREATE TABLE bookings (
    booking_name VARCHAR(255),
    contactInfo VARCHAR(255),
    start_time VARCHAR(255),
    end_time VARCHAR(255),
    buisness VARCHAR(255),
    customer VARCHAR(255),
    notes VARCHAR(255),
    dates VARCHAR(255)
); 

