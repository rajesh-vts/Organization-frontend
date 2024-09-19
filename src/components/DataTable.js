import React from 'react';

const DataTable = ({ title, data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '1em',
  };

  const thStyle = {
    backgroundColor: '#f4f4f4',
    padding: '0.5em',
    borderBottom: '1px solid #ddd',
    textAlign: 'left', 
    verticalAlign: 'middle', 
  };

  const tdStyle = {
    padding: '0.5em',
    borderBottom: '1px solid #ddd',
    textAlign: 'left', 
    verticalAlign: 'middle', 
  };

  return (
    <div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td style={tdStyle}>{index + 1}</td>
              <td style={tdStyle}>{item.name}</td>
              <td style={tdStyle}>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
