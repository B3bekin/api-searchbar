import React, { useState } from 'react';

interface ApiResponse {
  ip: string;
  city: string;
  region: string;
  country_name: string;
}

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    try {
      const response = await fetch(`https://ipapi.co/json/?search=${searchTerm}`);
      const data = await response.json();
      console.log(data); // logujeme data do console 
      setResults(data);
      console.log("chart updated 👌"); // logujeme "chart updated 👌" 
    } catch (error) {
      console.error(error);
    }
  };

  const [results, setResults] = useState<ApiResponse>();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header style={{ backgroundColor: 'red', width: '100%', textAlign: 'center' }}>
        <h1 className='p-9 text-white font-bold italic text-3xl'>Search Bar</h1>
        <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} style={{ width: '50%' }} />
      </header>
      {results && (
        <div style={{ width: '50%', textAlign: 'center' }}>
          <ul className='p-3'>
            <li>IP: {results.ip}</li>
            <li>City: {results.city}</li>
            <li>Region: {results.region}</li>
            <li>Country: {results.country_name}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;