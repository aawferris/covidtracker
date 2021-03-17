import React, {useEffect, useState} from 'react'
import {
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core'
import InfoBox from './InfoBox'
import Map from './Map'
import './App.css';

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ))
        setCountries(countries)
      })
    }
    getCountriesData()
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value
    setCountry(countryCode)
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>COVID-19 Tracker</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

    <div className="app-stats">
      <InfoBox title="Coronavirus Cases" cases={123} total={2000}/>
      <InfoBox title="Receovered" cases={223} total={3000}/>
      <InfoBox title="Deaths" cases={1123} total={4000}/>
    </div>

    {/* Table */}
    {/* Graph */}

    {/* Map */}
    <Map/>
    </div>
  );
}

export default App;
