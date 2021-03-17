import React, {useEffect, useState} from 'react'
import {
  Card,
  MenuItem,
  FormControl,
  Select,
  CardContent
} from '@material-ui/core'
import InfoBox from './InfoBox'
import Map from './Map'
import './App.css';

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  
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
    const url = countryCode ==='worldwide' ? 'https://disease.sh/v3/covid-19/all' 
    :`https://disease.sh/v3/covid-19/countries/${countryCode}`
    
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode)
      setCountryInfo(data)
    })
  }

  return (
    <div className="app">
      <div className="app-left">
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
        <Map/>
      </div>
      <Card className="app-right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <h3>Worldwide New Cases</h3>
        </CardContent>
        {/* Table */}

        {/* Graph */}
      </Card>

    </div>
  );
}

export default App;
