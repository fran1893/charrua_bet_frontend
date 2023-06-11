import axios from "axios";
import { global } from "../_global/global";

const playerService = {};

playerService.getPlayersInfo = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (await axios.get(global.BASE_URL + `/player/players_info`, config)).data;
};

export default playerService;
