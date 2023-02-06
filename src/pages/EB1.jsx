import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import icon1 from "../assets/data-analysis.png";

function EB1(props) {
  const [topThreeWeeks, setTopThreeWeeks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const UAI = "0010024W";
  const returnValueIfItIsInt = (value) => {
    if (value == "N/A") {
      return 0;
    }
    const parsedInt = parseInt(value);
    return parsedInt;
  };

  const fetchData = async () => {
    let allData;
    await axios
      .get(
        `https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-dnma-par-uai-appareils&q=&refine.uai=0010024W`
        // https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-dnma-par-uai-appareils&q=&rows=-1&refine.uai=0010024W
      )
      .then((response) => {
        allData = response.data.records;
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    return allData;
  };

  const getTopThreeVisits = async () => {
    const data = await fetchData();

    let visitsByWeek = {};

    data.forEach((record) => {
      if (!visitsByWeek[record.fields.debutsemaine]) {
        visitsByWeek[record.fields.debutsemaine] = 0;
      }
      for (const [key, value] of Object.entries(record.fields)) {
        if (key.startsWith("visites_")) {
          visitsByWeek[record.fields.debutsemaine] +=
            returnValueIfItIsInt(value);
        }
      }
    });
    const visitsArray = Object.entries(visitsByWeek).map(
      ([debutSemaine, visits]) => ({
        debutSemaine,
        visits,
      })
    );
    visitsArray.sort((a, b) => b.visits - a.visits);
    const topThreeVisits = visitsArray.slice(0, 3);

    setTopThreeWeeks(topThreeVisits);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    setError(null);
    getTopThreeVisits();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="main">
      <header>
        <div className="logo">
          <h1>TestEffios</h1>
        </div>
        <Navbar />
      </header>

      <div className="card">
        <span className="title-container">
          <div className="left">
            <img src={icon1} alt="icon" />
            <div>
              <h1>Analyse des visite</h1>
              <h2>
                Les 3 semaines ayant le plus grand nombre de visites pour l’UAI
                suivante 0010024W
              </h2>
            </div>
          </div>
          <div className="right"></div>
        </span>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Semaine</th>
                <th>Nb Visites</th>
              </tr>
            </thead>
            <tbody>
              {topThreeWeeks.map((data, index) => (
                <tr key={index}>
                  <td>{data.debutSemaine}</td>
                  <td>{data.visits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EB1;
