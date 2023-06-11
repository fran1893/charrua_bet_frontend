import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import teamService from "../../_services/teamService";
import gameService from "../../_services/gamesService";
import paymentService from "../../_services/paymentService";
import betService from "../../_services/betService";
import banner_image from "../../assets/banner_image.png";
import diamond_logo from "../../assets/sports-nav-images/diamond-logo.png";
import football_logo from "../../assets/sports-nav-images/football.png";
import basketball_logo from "../../assets/sports-nav-images/basketball.png";
import tenis_logo from "../../assets/sports-nav-images/tenis.png";
import fifa_logo from "../../assets/sports-nav-images/FIFA.png";
import american_football_logo from "../../assets/sports-nav-images/american-football.png";
import baseball_logo from "../../assets/sports-nav-images/baseball.png";
import esports_logo from "../../assets/sports-nav-images/esports.png";
import Button from "react-bootstrap/Button";
import "./Home.scss";

export default function Home() {
  // HOOKS
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [payments, setPayments] = useState([]);
  const [showPayments, setShowPayments] = useState(false);
  const [gameId, setGameId] = useState();
  const [amount1Value, setAmount1Value] = useState();
  const [amount2Value, setAmount2Value] = useState();
  const [isBet1, setIsBet1] = useState(true);
  const [isBet2, setIsBet2] = useState(true);
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState.isLoggedIn;
  const isAdmin = authState.userInfo.role == "admin";
  const isPlayer = authState.userInfo.role == "player";
  const navigate = useNavigate();

  useEffect(() => {
    getTeams();
    getGames();
  }, []);

  // FUNCTIONS

  // get all teams
  const getTeams = async () => {
    try {
      const response = await teamService.getAll();
      setTeams(response);
    } catch (error) {
      console.log(error);
    }
  };

  // get all games
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

  // get all payments (cuotas)
  const getPayments = async (token, gameId) => {
    try {
      const response = await paymentService.getGamePayments(token, gameId);
      const newPayments = response.map((payment) => {
        payment.team_name = payment.Team.name;
        payment.team_id = payment.Team.id;
        payment.team_shield = payment.Team.logo_url;
        return payment;
      });
      setPayments(newPayments);
    } catch (error) {
      console.log(error);
    }
  };

  // make a bet
  const makeBet = async (token, body) => {
    try {
      await betService.makeBet(token, body);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLRES
  const handleShowPayments = (e) => {
    const { dataId } = e.currentTarget.dataset;
    if (isPlayer) {
      setGameId(dataId);
      getPayments(authState.userToken, dataId);
      setShowPayments(true);
    }
  };

  const handleAmountChange = (e) => {
    const { value } = e.target;

    if (e.target.id == 0) {
      setAmount1Value(value);
    } else if (e.target.id == 1) {
      setAmount2Value(value);
    }
  };

  const handleBetSubmit = async (e) => {
    e.preventDefault();
    const { paymentId, teamId } = e.currentTarget.dataset;

    if (e.currentTarget.id == 0 && amount1Value > 0) {
      const body = {
        amount: amount1Value,
        game_id: gameId,
        team_id: teamId,
        payment_id: paymentId,
      };

      await makeBet(authState.userToken, body);
      navigate("/bet-history");
    } else if (e.currentTarget.id == 1 && amount2Value > 0) {
      const body = {
        amount: amount2Value,
        game_id: gameId,
        team_id: teamId,
        payment_id: paymentId,
      };

      await makeBet(authState.userToken, body);
      navigate("/bet-history");
    }
  };

  return (
    <div className="Home container">
      {/* SPORTS NAVIGATION */}
      <div className="sports-nav">
        <p className="sports-nav-title">
          <img src={diamond_logo} alt="diamond logo" /> POPULAR
        </p>
        <p>
          <img src={football_logo} alt="diamond logo" /> Fútbol
        </p>
        <p>
          <img src={baseball_logo} alt="diamond logo" /> Baloncesto
        </p>
        <p>
          <img src={tenis_logo} alt="diamond logo" /> Tenis
        </p>
        <p className="sports-nav-title">
          <img src={diamond_logo} alt="diamond logo" /> DEPORTES
        </p>
        <p>
          <img src={football_logo} alt="diamond logo" /> Fútbol
        </p>
        <p>
          <img src={fifa_logo} alt="diamond logo" /> FIFA
        </p>
        <p>
          <img src={american_football_logo} alt="diamond logo" /> Fútbol
          americano
        </p>
        <p>
          <img src={baseball_logo} alt="diamond logo" /> Beisbol
        </p>
        <p>
          <img src={esports_logo} alt="diamond logo" /> Esports
        </p>
      </div>
      {/* BANNER AND GAMES FEED */}
      <div className="banner-feed">
        <div className="banner">
          <img src={banner_image} alt="banner image" className="img-fluid" />
        </div>
        <div className="games container">
          {games.map((game) => (
            <div key={game.id} className="game-wrapper">
              <div
                className="game"
                data-data-id={game.id}
                onClick={handleShowPayments}
              >
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
      {/* BET SHEET */}
      {isPlayer && (
        <div className="bet-sheet">
          <p>HOJA DE APUESTAS</p>
          {showPayments && (
            <div className="payments">
              {payments.map((payment, index) => (
                <form
                  key={payment.id}
                  id={index}
                  data-payment-id={payment.id}
                  data-team-id={payment.team_id}
                  onSubmit={handleBetSubmit}
                >
                  <div className="payment">
                    <div className="payment-team">
                      <img src={payment.team_shield} /> {payment.team_name}
                    </div>
                    <div className="cuota">{payment.amount}</div>
                    <div className="bet">
                      <div className="form-group">
                        <label>Cantidad a apostar</label>
                        <input
                          id={index}
                          type="number"
                          name={`amount-${payment.id}`}
                          onChange={handleAmountChange}
                        />
                      </div>
                    </div>
                  </div>
                  <Button variant="warning">Apostar</Button>
                </form>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
