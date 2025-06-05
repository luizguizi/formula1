import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  useEffect(() => {
    setLoading(true)
    axios.get("https://api.jolpi.ca/ergast/f1/current/driverStandings.json")
    .then((response) =>{
      const driverList = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      setDrivers(driverList)
      setLoading(false)
    })
    .catch((error) => {
      console.log("Erro na requisição", error)
      setError("Erro ao carregar os dados. Tente novamente.")
      setLoading(false)
    })
  },[])

  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] =  useState(true)
  const [error, setError] = useState(false)

  return (
    <div className="App">
      <h1>Classificação Fórmula 1 2025</h1>
      {loading && <p>Carregando Dados...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      {!loading && !error && (
        <ul>
        {drivers.map((driver) => (
    
       <li
        key={driver.Driver.driverId}
        >
          {driver.position}º - {driver.Driver.givenName} {driver.Driver.familyName} ({driver.Constructors[0].name}) - {driver.points} pts
        </li>
      ))}
      </ul>
      )}
    </div>
  );
}
export default App;
