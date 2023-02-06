import React, { useState } from "react";
import Navbar from "../components/Navbar";
import icon1 from "../assets/data-analysis.png";
function Home(props) {
  const [UAI, setUAI] = useState("");
  const [timePeriod, setTimePeriod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //Code to aggregate data based on UAI and timePeriod
  };
  return (
    <div className="home">
      <div className="sidebar">
        <div className="titre">
          <h1>Agrégation de données de visites</h1>
        </div>
        <form className="inline-form" onSubmit={handleSubmit}>
          <input
            className="my-input"
            type="text"
            placeholder="Enter UAI"
            value={UAI}
            onChange={(e) => setUAI(e.target.value)}
          />
          <select
            className="my-input"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            <option value="">Select Time Period</option>
            <option value="year">Year</option>
            <option value="month">Month</option>
          </select>
        </form>
        <div className="list">
          <div className="list-item">
            <div className="icon"></div>
            <div className="text1"></div>
            <div className="text2"></div>
          </div>
        </div>
      </div>
      <div className="main">
        <header>
          <div className="logo">
            <h1>TestEffios</h1>
          </div>
          <Navbar />
        </header>
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
      </div>
    </div>
  );
}

export default Home;
