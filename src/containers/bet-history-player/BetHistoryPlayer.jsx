import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataListTable } from "../../components";
import { store } from "../../app/store";
import betService from "../../_services/betService";
import Button from "react-bootstrap/Button";
import { setUserInfo } from "../../features/authentication/authSlice";
import "./BetHistoryPlayer.scss";

export default function BetHistoryPlayer() {
  // HOOKS
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState.isLoggedIn;
  const isPlayer = authState.userInfo.role == "player";
  const isAdmin = authState.userInfo.role == "admin";
  const [betHistory, setBetHistory] = useState([]);
  const [bet, setBet] = useState([]);
  const [showFinalize, setShowFinalize] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && isPlayer) {
      getBetHistoryPlayer(authState.userToken);
    }
  }, []);

  // FUNCTIONS

  // Get bet history function
  const getBetHistoryPlayer = async (token) => {
    try {
      const response = await betService.historyPlayer(token);
      const newBetHistory = response.map((bet) => {
        bet.cuota = bet.Payment.amount;
        bet.home_team = bet.Game.home_team.name;
        bet.away_team = bet.Game.away_team.name;
        bet.chosed_team = bet.Team.name;
        bet.result = bet.Game.result;
        bet.finished = bet.Game.finished;
        bet.workspace = bet.Workspace.name;
        bet.game_id = bet.Game.id;
        bet.home_team_id = bet.Game.home_team.id;
        bet.away_team_id = bet.Game.away_team.id;

        return bet;
      });

      setBetHistory(newBetHistory);
    } catch (error) {
      console.log(error);
    }
  };

  // Finalize bet function
  const finalizeBet = async (token, betId) => {
    try {
      const finalizedBet = await betService.finalizeBet(token, betId);
      store.dispatch(setUserInfo({ balance: finalizedBet.new_balance }));
    } catch (error) {
      console.log(error);
    }
  };

  // Get bet by id function
  const getBetById = async (token, betId) => {
    try {
      const foundBet = await betService.getBetById(token, betId);

      const newBet = {
        id: foundBet.id,
        amount: foundBet.amount,
        home_team: foundBet.Game.home_team.name,
        away_team: foundBet.Game.away_team.name,
        chosed_team: foundBet.Team.name,
        cuota: foundBet.Payment.amount,
      };

      setBet(newBet);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLERS
  const handleShowFinalizeBet = async (e) => {
    const { dataId } = e.currentTarget.dataset;
    await getBetById(authState.userToken, dataId);
    setShowFinalize(true);
  };

  const handleFinalizeBet = async () => {
    const betId = bet.id;
    await finalizeBet(authState.userToken, betId);
    await getBetHistoryPlayer(authState.userToken);
    setShowFinalize(false);
  };

  const handleReturnHome = () => {
    navigate("/");
  };

  // RETURN
  return (
    <div className="BetHistoryWrapper">
      <div className="BetHistoryPlayer container">
        <div className="return-button-wrapper">
          <Button className="return-home-button" onClick={handleReturnHome}>Volver a los partidos</Button>
        </div>
        <DataListTable
          data={betHistory}
          title="HISTORIAL"
          headers={[
            "Apuesta",
            "Cuota",
            "Equipo Home",
            "Equipo Away",
            "Elección",
            "Terminado",
            "Resultado",
          ]}
          attributes={[
            "amount",
            "cuota",
            "home_team",
            "away_team",
            "chosed_team",
            "finished",
            "result",
          ]}
          onChange={handleShowFinalizeBet}
        />
        {showFinalize && (
          <div className="finalize-bet-wrapper">
            <div>
              <p>
                Finalizar el partido entre{" "}
                <span className="stand-out">{bet.home_team}</span> y{" "}
                <span className="stand-out">{bet.away_team}</span> has apostado{" "}
                <span className="stand-out">${bet.amount}</span> a{" "}
                <span className="stand-out">{bet.chosed_team}</span> con una
                cuota de <span className="stand-out">{bet.cuota}</span>
              </p>
              <Button
                className="end-bet-button btn-danger"
                onClick={handleFinalizeBet}
              >
                Finalizar apuesta
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
