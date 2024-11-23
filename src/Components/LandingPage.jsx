import React, { useState } from 'react';

function LandingPage() {
  const [inputValue, setInputValue] = useState('');
  const [tableData, setTableData] = useState([]);

  const handleAddEntry = () => {
    if (inputValue.trim()) {
      setTableData([...tableData, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome to Your Page!</h2>

      {/* Input and Button */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter something"
          style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
        />
        <button onClick={handleAddEntry} style={{ padding: '10px 15px', fontSize: '16px' }}>
          Add to Table
        </button>
      </div>

      {/* Table */}
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', textAlign: 'left' }}>Entry</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((entry, index) => (
            <tr key={index}>
              <td style={{ padding: '10px' }}>{entry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LandingPage;
