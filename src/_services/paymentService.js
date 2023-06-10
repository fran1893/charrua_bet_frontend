import axios from "axios";
import { global } from "../_global/global";

const paymentService = {};


paymentService.getGamePayments = async (token, gameId) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    return (
      await axios.get(global.BASE_URL + `/payments/game-payments/${gameId}`, config)
    ).data;
  };
  
  export default paymentService;

