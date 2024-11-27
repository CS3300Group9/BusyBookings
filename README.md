# BusyBookings
## Project Overview
The application would allow for users to login, select some business, and create bookings through an interactive calendar. We would also allow for clients to login as admin and add their business to the database and see what bookings they have, remove and add bookings they want, and see who created their bookings.

The application is missing some initial ideas for implementation. However, the core features do work such as creating bookings and viewing them.
The MMFs described in our demo slides are implemented as well.

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
