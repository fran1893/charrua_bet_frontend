import axios from "axios";
import { global } from "../_global/global";

const playerService = {};

playerService.getPlayersInfo = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (await axios.get(global.BASE_URL + `/player/players_info`, config))
    .data;
};

playerService.updateBalance = async (token, newBalance, playerId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    balance: newBalance,
  };

  return (
    await axios.put(
      global.BASE_URL + `/player/balance/${playerId}`,
      body,
      config
    )
  ).data;
};

playerService.deletePlayer = async (token, playerId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (await axios.delete(global.BASE_URL + `/player/delete/${playerId}`, config)).data;
};

export default playerService;
