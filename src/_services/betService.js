import axios from "axios";
import { global } from "../_global/global";

const betService = {};

// GET BET HISTORY (PLAYER)
betService.historyPlayer = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (await axios.get(global.BASE_URL + `/bets/history-user`, config)).data;
};

// MAKE A BET
betService.makeBet = async (token, newBetData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    amount: newBetData.amount,
    game_id: newBetData.game_id,
    team_id: newBetData.team_id,
    payment_id: newBetData.payment_id,
  };

  return (await axios.post(global.BASE_URL + `/bets/bet`, body, config)).data;
};

// GET BET BY ID
betService.getBetById = async (token, betId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (await axios.get(global.BASE_URL + `/bets/bet/${betId}`, config)).data;
};

// FINALIZE BET BY ID
betService.finalizeBet = async (token, betId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (
    await axios.put(
      global.BASE_URL + `/bets/bet/finalize/${betId}`,
      null,
      config
    )
  ).data;
};

export default betService;
