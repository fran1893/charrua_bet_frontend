import axios from "axios";
import { global } from "../_global/global";

const teamService = {};

// GET ALL TEAMS
teamService.getAll = async () => {
  return (await axios.get(global.BASE_URL + "/teams/get_all")).data;
};

export default teamService;
