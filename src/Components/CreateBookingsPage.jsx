function CreateBookingsPage({
  createBooking,
  setStartTime,
  setEndTime,
  setName,
  setContactInfo,
  setNotes,
  setBusiness,
  setCustomer,
  error,
}) {
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
        <div className="App">
          <div>
            <h1 className="App-title">Create Booking</h1>
          </div>
          <div>
            <input
              placeholder="Start Time"
              onChange={(ev) => setStartTime(ev.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="End Time"
              onChange={(ev) => setEndTime(ev.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Customer Name"
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Contact Info"
              onChange={(ev) => setContactInfo(ev.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Notes"
              onChange={(ev) => setNotes(ev.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Business Name"
              onChange={(ev) => setBusiness(ev.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Customer ID"
              onChange={(ev) => setCustomer(ev.target.value)}
            />
          </div>
          <div>
            <input
              type="button"
              value="Create Booking"
              onClick={createBooking}
            />
          </div>
          {error && (
            <div style={{ color: 'red' }}>
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateBookingsPage;
