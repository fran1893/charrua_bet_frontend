import axios from "axios";
import { global } from "../_global/global";

const betService = {};

betService.historyPlayer = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (await axios.get(global.BASE_URL + `/bets/history-user`, config)).data;
};

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

export default betService;
