import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import icon1 from "../assets/data-analysis.png";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

function EB3(props) {
  const [uai, setUai] = useState("");
  const [year, setYear] = useState("");
  const [data, setData] = useState([]);
  const [dataOrdinateur, setDataOrdinateur] = useState([]);
  const [dataSmartphone, setDataSmartphone] = useState([]);
  const [dataTablette, setDataTablette] = useState([]);
  const [graphData, setGraphData] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const monthName = [
    "Jan",
    "Fév",
    "Mar",
    "Avr",
    "Mai",
    "Jun",
    "Jul",
    "Aoû",
    "Sep",
    "Oct",
    "Nov",
    "Déc",
  ];
  const returnValueIfItIsInt = (value) => {
    if (value == "N/A") {
      return 0;
    }
    const parsedInt = parseInt(value);
    return parsedInt;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `https://data.education.gouv.fr/api/records/1.0/search/?dataset=fr-en-dnma-par-uai-appareils&q=%23search(uai%2C+"${uai}")+and+debutsemaine+>%3D+${year}&rows=10`
    );

    const months = {};
    response.data.records.forEach((item) => {
      const month = item.fields.debutsemaine.split("-")[1];
      if (!months[month]) {
        months[month] = {
          smartphone: returnValueIfItIsInt(item.fields.visites_smartphone),
          tablette: returnValueIfItIsInt(item.fields.visites_tablette),
          ordinateur: returnValueIfItIsInt(item.fields.visites_ordinateur),
        };
      } else {
        months[month].smartphone += returnValueIfItIsInt(
          item.fields.visites_smartphone
        );
        months[month].tablette += returnValueIfItIsInt(
          item.fields.visites_tablette
        );
        months[month].ordinateur += returnValueIfItIsInt(
          item.fields.visites_ordinateur
        );
      }
    });
    console.log("months => ", months);

    const chartData = [];
    chartData.sort(function (a, b) {
      return Number(a.month) - Number(b.month);
    });
    console.log("chartData", chartData);
    Object.keys(months).forEach((month) => {
      chartData.push({
        month: monthName[parseInt(month) - 1],
        smartphone: months[month].smartphone,
        tablette: months[month].tablette,
        ordinateur: months[month].ordinateur,
      });
    });
    chartData.sort((a, b) => {
      let monthA = monthName.indexOf(a.month);
      let monthB = monthName.indexOf(b.month);
      return monthA - monthB;
    });
    setGraphData({
      labels: chartData.map((item) => item.month),
      datasets: [
        {
          label: "Smartphone",
          data: chartData.map((item) => item.smartphone),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          fill: false,
        },
        {
          label: "tablette",
          data: chartData.map((item) => item.tablette),
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          fill: false,
        },
        {
          label: "ordinateur",
          data: chartData.map((item) => item.ordinateur),
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
          fill: false,
        },
      ],
    });
  };

  //   const chartData = {
  //     labels: ["Jan", "Feb", "Mar"],
  //     datasets: [
  //       {
  //         label: "tablette",
  //         data: [10, 20, 30],
  //         backgroundColor: "rgba(54, 162, 235, 0.2)",
  //         borderColor: "rgba(54, 162, 235, 1)",
  //         borderWidth: 1,
  //       },
  //       {
  //         label: "Smartphone",
  //         data: [15, 25, 35],
  //         backgroundColor: "rgba(255, 99, 132, 0.2)",
  //         borderColor: "rgba(255, 99, 132, 1)",
  //         borderWidth: 1,
  //       },
  //       {
  //         label: "ordinateur",
  //         data: [5, 10, 15],
  //         backgroundColor: "rgba(75, 192, 192, 0.2)",
  //         borderColor: "rgba(75, 192, 192, 1)",
  //         borderWidth: 1,
  //       },
  //     ],
  //   };
  return (
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
                <h1>Analyse des visite</h1>
                <h2>
                  l’évolution par mois du nombre de visites selon les appareils
                </h2>
              </div>
            </div>
            <div className="right"></div>
          </span>
          <form className="inline-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="UAI"
              value={uai}
              onChange={(e) => setUai(e.target.value)}
              className="my-input"
            />
            <input
              type="text"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="my-input"
            />
            <button className="submit" type="submit">
              Submit
            </button>
          </form>
          {graphData.datasets ? (
            <div className="table-container graph">
              <Line
                data={graphData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          ) : (
            <div className="graph-placeholder">
              Merci de saisir l’UAI et l’année pour visualiser le graphique
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EB3;
