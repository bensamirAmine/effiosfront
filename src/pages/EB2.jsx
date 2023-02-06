import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import icon1 from "../assets/data-analysis.png";
function EB2(props) {
  const [UAIfromInput, setUAIFromInput] = useState("");
  const [date, setDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    let allData;
    await axios
      .get(
        `https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-dnma-par-uai-appareils&q=%23search(uai%2C+"${UAIfromInput}")${date}&rows=10`
      )
      .then((response) => {
        allData = response.data.records;
        setData(allData);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
    return allData;
  };
  const filterData = async () => {
    const l = await fetchData();
    console.log("allData", l);
    setLoading(false);
  };
  const manageSelectedOption = (value) => {
    setSelectedOption(value);
    const currentYear = new Date().getFullYear().toString();
    const currentMonth = (new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0");
    if (value == "annee") {
      setDate("+and+debutsemaine+>%3D+" + currentYear);
      console.log(currentYear);
    }
    if (value == "mois") {
      let yearPlusMonth = currentYear + "-" + currentMonth;
      setDate("+and+debutsemaine+>%3D+" + yearPlusMonth);
      console.log(yearPlusMonth);
    }
    if (value == "tous") {
      setDate("");
    }
    console.log(value);
  };
  useEffect(() => {
    filterData();
  }, [UAIfromInput, date]);

  return (
    <div>
      <div>
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
                  <h1>Agrégation des données UAI</h1>
                  <h2>
                    Sélectionnez l'UAI et le critère d'agrégation (Année ou
                    Mois)
                  </h2>
                </div>
              </div>
              <div className="right"></div>
            </span>
            <div className="inline-form">
              <input
                placeholder="UAI"
                value={UAIfromInput}
                onChange={(e) => setUAIFromInput(e.target.value)}
                className="my-input"
              />
              <select
                value={selectedOption}
                onChange={(e) => manageSelectedOption(e.target.value)}
                className="my-input"
              >
                <option value="tous">-</option>
                <option value="annee">Année</option>
                <option value="mois">Mois</option>
              </select>
            </div>

            <div className="table-container scrollable">
              {data.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>debutsemaine</th>
                      <th>uai</th>
                      <th>duree_android</th>
                      <th>duree_autreappareil</th>
                      <th>duree_autrenavigateur</th>
                      <th>duree_autreos</th>
                      <th>duree_chrome</th>
                      <th>duree_chromemobile</th>
                      <th>duree_chromeos</th>
                      <th>duree_edge</th>
                      <th>duree_firefox</th>
                      <th>duree_huaweibrowser</th>
                      <th>duree_ios</th>
                      <th>duree_linux</th>
                      <th>duree_macos</th>
                      <th>duree_miuibrowser</th>
                      <th>duree_opera</th>
                      <th>duree_ordinateur</th>
                      <th>duree_safari</th>
                      <th>duree_samsungbrowser</th>
                      <th>duree_smartphone</th>
                      <th>duree_tablette</th>
                      <th>duree_windows</th>
                      <th>utilisateurs_android</th>
                      <th>utilisateurs_autreappareil</th>
                      <th>utilisateurs_autrenavigateur</th>
                      <th>utilisateurs_autreos</th>
                      <th>utilisateurs_chrome</th>
                      <th>utilisateurs_chromemobile</th>
                      <th>utilisateurs_chromeos</th>
                      <th>utilisateurs_edge</th>
                      <th>utilisateurs_firefox</th>
                      <th>utilisateurs_huaweibrowser</th>
                      <th>utilisateurs_ios</th>
                      <th>utilisateurs_linux</th>
                      <th>utilisateurs_macos</th>
                      <th>utilisateurs_miuibrowser</th>
                      <th>utilisateurs_opera</th>
                      <th>utilisateurs_ordinateur</th>
                      <th>utilisateurs_safari</th>
                      <th>utilisateurs_samsungbrowser</th>
                      <th>utilisateurs_smartphone</th>
                      <th>utilisateurs_tablette</th>
                      <th>utilisateurs_windows</th>
                      <th>visites_android</th>
                      <th>visites_autreappareil</th>
                      <th>visites_autrenavigateur</th>
                      <th>visites_autreos</th>
                      <th>visites_chrome</th>
                      <th>visites_chromemobile</th>
                      <th>visites_chromeos</th>
                      <th>visites_edge</th>
                      <th>visites_firefox</th>
                      <th>visites_huaweibrowser</th>
                      <th>visites_ios</th>
                      <th>visites_linux</th>
                      <th>visites_macos</th>
                      <th>visites_miuibrowser</th>
                      <th>visites_opera</th>
                      <th>visites_ordinateur</th>
                      <th>visites_safari</th>
                      <th>visites_samsungbrowser</th>
                      <th>visites_smartphone</th>
                      <th>visites_tablette</th>
                      <th>visites_windows</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((data, index) => (
                      <tr key={index}>
                        <td>{data.fields.debutsemaine}</td>
                        <td>{data.fields.uai}</td>
                        <td>{data.fields.duree_android}</td>
                        <td>{data.fields.duree_autreappareil}</td>
                        <td>{data.fields.duree_autrenavigateur}</td>
                        <td>{data.fields.duree_autreos}</td>
                        <td>{data.fields.duree_chrome}</td>
                        <td>{data.fields.duree_chromemobile}</td>
                        <td>{data.fields.duree_chromeos}</td>
                        <td>{data.fields.duree_edge}</td>
                        <td>{data.fields.duree_firefox}</td>
                        <td>{data.fields.duree_huaweibrowser}</td>
                        <td>{data.fields.duree_ios}</td>
                        <td>{data.fields.duree_linux}</td>
                        <td>{data.fields.duree_macos}</td>
                        <td>{data.fields.duree_miuibrowser}</td>
                        <td>{data.fields.duree_opera}</td>
                        <td>{data.fields.duree_ordinateur}</td>
                        <td>{data.fields.duree_safari}</td>
                        <td>{data.fields.duree_samsungbrowser}</td>
                        <td>{data.fields.duree_smartphone}</td>
                        <td>{data.fields.duree_tablette}</td>
                        <td>{data.fields.duree_windows}</td>
                        <td>{data.fields.utilisateurs_android}</td>
                        <td>{data.fields.utilisateurs_autreappareil}</td>
                        <td>{data.fields.utilisateurs_autrenavigateur}</td>
                        <td>{data.fields.utilisateurs_autreos}</td>
                        <td>{data.fields.utilisateurs_chrome}</td>
                        <td>{data.fields.utilisateurs_chromemobile}</td>
                        <td>{data.fields.utilisateurs_chromeos}</td>
                        <td>{data.fields.utilisateurs_edge}</td>
                        <td>{data.fields.utilisateurs_firefox}</td>
                        <td>{data.fields.utilisateurs_huaweibrowser}</td>
                        <td>{data.fields.utilisateurs_ios}</td>
                        <td>{data.fields.utilisateurs_linux}</td>
                        <td>{data.fields.utilisateurs_macos}</td>
                        <td>{data.fields.utilisateurs_miuibrowser}</td>
                        <td>{data.fields.utilisateurs_opera}</td>
                        <td>{data.fields.utilisateurs_ordinateur}</td>
                        <td>{data.fields.utilisateurs_safari}</td>
                        <td>{data.fields.utilisateurs_samsungbrowser}</td>
                        <td>{data.fields.utilisateurs_smartphone}</td>
                        <td>{data.fields.utilisateurs_tablette}</td>
                        <td>{data.fields.utilisateurs_windows}</td>
                        <td>{data.fields.visites_android}</td>
                        <td>{data.fields.visites_autreappareil}</td>
                        <td>{data.fields.visites_autrenavigateur}</td>
                        <td>{data.fields.visites_autreos}</td>
                        <td>{data.fields.visites_chrome}</td>
                        <td>{data.fields.visites_chromemobile}</td>
                        <td>{data.fields.visites_chromeos}</td>
                        <td>{data.fields.visites_edge}</td>
                        <td>{data.fields.visites_firefox}</td>
                        <td>{data.fields.visites_huaweibrowser}</td>
                        <td>{data.fields.visites_ios}</td>
                        <td>{data.fields.visites_linux}</td>
                        <td>{data.fields.visites_macos}</td>
                        <td>{data.fields.visites_miuibrowser}</td>
                        <td>{data.fields.visites_opera}</td>
                        <td>{data.fields.visites_ordinateur}</td>
                        <td>{data.fields.visites_safari}</td>
                        <td>{data.fields.visites_samsungbrowser}</td>
                        <td>{data.fields.visites_smartphone}</td>
                        <td>{data.fields.visites_tablette}</td>
                        <td>{data.fields.visites_windows}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <h2>Pas de données</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EB2;
