import { useEffect, useState } from 'react';
import axios from "axios";
import './RankingDriver.css';

const RankingDriver = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("https://api.jolpi.ca/ergast/f1/current/driverStandings.json")
      .then((response) => {
        const driverList = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        setDrivers(driverList);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Erro na requisição", error);
        setError("Erro ao carregar os dados. Tente novamente.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="ranking-container">
      <h1>🏎️ Classificação Fórmula 1 - Temporada 2025</h1>

      {loading && <p>Carregando Dados...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <table className="ranking-table">
          <thead>
            <tr>
              <th>Posição</th>
              <th>Piloto</th>
              <th>Equipe</th>
              <th>Pontos</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.Driver.driverId}>
                <td>{driver.position}º</td>
                <td>{driver.Driver.givenName} {driver.Driver.familyName}</td>
                <td>{driver.Constructors[0].name}</td>
                <td>{driver.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default RankingDriver;
