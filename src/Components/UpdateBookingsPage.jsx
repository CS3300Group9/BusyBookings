import React, { useEffect } from 'react';

function UpdateBookingsPage({
  updateBooking,
  booking,
  setStartTime,
  setEndTime,
  setName,
  setContactInfo,
  setNotes,
  setBusiness,
  setCustomer,
  error,
}) {
  useEffect(() => {
    if (booking) {
      setStartTime(booking.startTime || '');
      setEndTime(booking.endTime || '');
      setName(booking.name || '');
      setContactInfo(booking.contactInfo || '');
      setNotes(booking.notes || '');
      setBusiness(booking.business || '');
      setCustomer(booking.customer || '');
    }
  }, [booking, setStartTime, setEndTime, setName, setContactInfo, setNotes, setBusiness, setCustomer]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '16px',
          margin: '16px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          maxWidth: '30%',
          alignItems: 'center',
        }}
      >
        <div>
          <h1>Update Booking</h1>
        </div>
        <div>
          <input
            placeholder="Start Time"
            defaultValue={booking?.startTime || ''}
            onChange={(ev) => setStartTime(ev.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="End Time"
            defaultValue={booking?.endTime || ''}
            onChange={(ev) => setEndTime(ev.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Customer Name"
            defaultValue={booking?.name || ''}
            onChange={(ev) => setName(ev.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Contact Info"
            defaultValue={booking?.contactInfo || ''}
            onChange={(ev) => setContactInfo(ev.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Notes"
            defaultValue={booking?.notes || ''}
            onChange={(ev) => setNotes(ev.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Business Name"
            defaultValue={booking?.business || ''}
            onChange={(ev) => setBusiness(ev.target.value)}
          />
        </div>
        <div>
          <input
            type="button"
            value="Update Booking"
            onClick={updateBooking}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
}

export default UpdateBookingsPage;
