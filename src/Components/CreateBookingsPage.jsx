function CreateBookingsPage({
  createBooking,
  setStartTime,
  setEndTime,
  setName,
  setContactInfo,
  setNotes,
  setBusiness,
  setCustomer,
  businesses,
  business,
  error,
}) {
  console.log(businesses)
  return (
    <div className="blueContainer">
      <div className="mainBox">
        <div className="App">
          <div>
            <h1 className="App-title">Create Booking</h1>
          </div>
          <div>
            <input
              className='textCustom'
              placeholder="Start Time"
              onChange={(ev) => setStartTime(ev.target.value)}
            />
          </div>
          <div>
            <input
              className='textCustom'
              placeholder="End Time"
              onChange={(ev) => setEndTime(ev.target.value)}
            />
          </div>
          <div>
            <input
              className='textCustom'
              placeholder="Customer Name"
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>
          <div>
            <input
              className='textCustom'
              placeholder="Contact Info"
              onChange={(ev) => setContactInfo(ev.target.value)}
            />
          </div>
          <div>
            <input
              className='textCustom'
              placeholder="Notes"
              onChange={(ev) => setNotes(ev.target.value)}
            />
          </div>
          <div>
          <select value={business} onChange={(ev) => setBusiness(ev.target.value)} className="buttonCustom">
            {businesses.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          </div>
          <div>
            <input
              className='buttonCustom'
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
