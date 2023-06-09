import React, { useEffect, useState } from "react";
import teamService from "../../_services/teamService";
import gameService from "../../_services/gamesService";
import banner_image from "../../assets/banner_image.png";
import diamond_logo from "../../assets/sports-nav-images/diamond-logo.png";
import football_logo from "../../assets/sports-nav-images/football.png";
import basketball_logo from "../../assets/sports-nav-images/basketball.png";
import tenis_logo from "../../assets/sports-nav-images/tenis.png";
import fifa_logo from "../../assets/sports-nav-images/FIFA.png";
import american_football_logo from "../../assets/sports-nav-images/american-football.png";
import baseball_logo from "../../assets/sports-nav-images/baseball.png";
import esports_logo from "../../assets/sports-nav-images/esports.png";
import "./Home.scss";

export default function Home() {
  // HOOKS
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    getTeams();
    getGames();
    // console.log(games);
  }, []);

  // FUNCTIONS
  const getTeams = async () => {
    try {
      const response = await teamService.getAll();
      setTeams(response);
    } catch (error) {
      console.log(error);
    }
  };
  const getGames = async () => {
    try {
      const response = await gameService.getAll();
      const newGames = response.map((game) => {
        game.home_logo = game.home_team.logo_url;
        game.away_logo = game.away_team.logo_url;
        game.home_team_id = game.home_team.id;
        game.home_team = game.home_team.name;
        game.away_team_id = game.away_team.id;
        game.away_team = game.away_team.name;
        return game;
      });
      setGames(newGames);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Home container">
      <div className="sports-nav">
        <p className="sports-nav-title"><img src={diamond_logo} alt="diamond logo" /> POPULAR</p>
        <p><img src={football_logo} alt="diamond logo" /> Fútbol</p>
        <p><img src={baseball_logo} alt="diamond logo" /> Baloncesto</p>
        <p><img src={tenis_logo} alt="diamond logo" /> Tenis</p>
        <p className="sports-nav-title"><img src={diamond_logo} alt="diamond logo" /> DEPORTES</p>
        <p><img src={football_logo} alt="diamond logo" /> Fútbol</p>
        <p><img src={fifa_logo} alt="diamond logo" /> FIFA</p>
        <p><img src={american_football_logo} alt="diamond logo" /> Fútbol americano</p>
        <p><img src={baseball_logo} alt="diamond logo" /> Beisbol</p>
        <p><img src={esports_logo} alt="diamond logo" /> Esports</p>
      </div>
      <div className="banner-feed">
        <div className="banner">
          <img src={banner_image} alt="banner image" className="img-fluid" />
        </div>
        <div className="games container">
          {games.map((game) => (
            <div key={game.id} className="game-wrapper">
              <div className="game">
                <div className="home-team">
                  <div className="home-logo">
                    <img src={game.home_logo} />
                  </div>
                  {game.home_team}
                </div>
                vs
                <div className="away-team">
                  {game.away_team}{" "}
                  <div className="away-logo">
                    <img src={game.away_logo} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bet-sheet">
        <p>HOJA DE APUESTAS</p>
      </div>
    </div>
  );
}
