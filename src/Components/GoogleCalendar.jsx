import React, { useEffect, useState } from 'react';
import useGapiScript from './useGapiScript'; // Import the custom hook

const GoogleCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const isGapiLoaded = useGapiScript();

  useEffect(() => {
    if (!isGapiLoaded) return;

    const initializeGapi = async () => {
      try {
        window.gapi.load('client:auth2', async () => {
          await window.gapi.client.init({
            apiKey: process.env.REACT_APP_API_KEY,
            clientId: process.env.REACT_APP_CLIENT_ID,
            discoveryDocs: [
              'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
            ],
            scope: 'https://www.googleapis.com/auth/calendar.readonly',
          });

          const authInstance = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(authInstance.isSignedIn.get());

          authInstance.isSignedIn.listen(setIsSignedIn);
        });
      } catch (error) {
        console.error('Error initializing gapi:', error);
      }
    };

    initializeGapi();
  }, [isGapiLoaded]);

  const signIn = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const signOut = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const fetchEvents = async () => {
    try {
      const response = await window.gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      });

      const items = response.result.items || [];
      setEvents(items);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  if (!isGapiLoaded) {
    return <div>Loading Google API...</div>;
  }

  return (
    <div>
      {isSignedIn ? (
        <>
          <button onClick={signOut}>Sign Out</button>
          <button onClick={fetchEvents}>Fetch Calendar Events</button>
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <strong>{event.summary}</strong> -{' '}
                {event.start.dateTime || event.start.date}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <button onClick={signIn}>Sign In with Google</button>
      )}
    </div>
  );
};

export default GoogleCalendar;
