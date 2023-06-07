import React, { useEffect, useState } from "react";
import teamService from "../../_services/teamService";
import gameService from "../../_services/gamesService";
import banner_image from "../../assets/banner_image.png";
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
    <div className="Home">
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
  );
}
