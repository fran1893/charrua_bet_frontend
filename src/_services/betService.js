import axios from "axios";
import { global } from "../_global/global";

const betService = {};

betService.historyPlayer = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return (
    await axios.get(global.BASE_URL + `/bets/history-user`, config)
  ).data;
};

export default betService;
