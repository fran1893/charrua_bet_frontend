import axios from "axios";
import { global } from "../_global/global";

const gameService = {};

// GET ALL TEAMS
gameService.getAll = async () => {
  return (await axios.get(global.BASE_URL + "/games/get_all")).data;
};

export default gameService;