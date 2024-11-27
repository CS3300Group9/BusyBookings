# BusyBookings
## Project Overview
The application would allow for users to login, select some business, and create bookings through an interactive calendar. We would also allow for clients to login as admin and add their business to the database and see what bookings they have, remove and add bookings they want, and see who created their bookings.

The application is missing some initial ideas for implementation. However, the core features do work such as creating bookings and viewing them.
The MMFs described in our demo slides are implemented as well.

## Release Notes

Initial Release

* Create either a business or customer account
* Interactive calendar for viewing and creating bookings
* Create bookings as a customer
* View bookings as a business

Bug Fixes

* Updated getting bookings from DB to create the correct data type
* Fixed crash when trying to create bookings with no businesses in DB
* Corrected not sending a user to their respective dashboard
* Fixed bookings getting doubled when pushed to DB
* Redesign of UI to look more sleek

Known Bugs / Missing Features

* Using log out button will make logging in buggy if not selecting same user type as one logged out of
* Updating or removing a booking not implemented
* Business users can only have one business attached to their account
* Little validation of if a booking can actually be made 
* No real way for a business to add and update their information

## Running locally
To run locally, first download the repository and then run

### `npm install`

This should install all the dependencies required for the application, then do

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

If running this close to last push, the external database may still be running. 
However, if it is not, change the api calls to have a new base URL of [http://localhost:3001](http://localhost:3001) and run:

### `node server.js`

This is a hassle to do, so we apologize in advanced if needed to be done.

## Trouble Shooting

1. Why won't the code compile after running npm start?

* Ensure that npm install was run and that it succesfully downloaded all dependencies
* If errors still persist, ensure that the dependencies are visible to the code and that their system paths have been set

2. Get error when logging in, creating booking, or creating a new user
* Double check that the database is running. It may be that the external database has run out of credits to continue going
* If so, follow the above steps to remake the database run locally
