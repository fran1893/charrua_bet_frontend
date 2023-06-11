import axios from "axios";
import { global } from "../_global/global";

const authService = {};

// LOGIN
authService.login = async (credentials) => {
  const body = {
    email: credentials.email,
    password: credentials.password,
  };
  return (await axios.post(global.BASE_URL + "/auth/login", body)).data;
};

authService.registerPlayer = async (token, credentials) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    name: credentials.name,
    email: credentials.email,
    lastname: credentials.lastname,
    password: credentials.password,
  };

  return (
    await axios.post(global.BASE_URL + "/auth/register", body, config)
  ).data;
};

export default authService;
