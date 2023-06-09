import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataListTable } from "../../components";
import betService from "../../_services/betService";
import "./BetHistoryPlayer.scss";

export default function BetHistoryPlayer() {
  // HOOKS
  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState.isLoggedIn;
  const isPlayer = authState.userInfo.role == "player";
  const isAdmin = authState.userInfo.role == "admin";
  const [betHistory, setBetHistory] = useState([]);

  useEffect(() => {
    if (isLoggedIn && isPlayer) {
      getBetHistoryPlayer(authState.userToken);
    }
  }, []);

  // FUNCTIONS
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

  // RETURN
  return (
    <div className="BetHistoryPlayer container">
      <DataListTable
        data={betHistory}
        title="HISTORIAL"
        headers={["Apuesta", "Cuota", "Equipo Home", "Equipo Away","Elección", "Terminado", "Resultado"]}
        attributes={["amount","cuota", "home_team","away_team","chosed_team", "finished", "result"]}
      />
    </div>
  );
}
