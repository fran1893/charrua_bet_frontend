import React, { useEffect, useState } from "react";
import { DataListTable } from "../../components";
import { useSelector } from "react-redux";
import playerService from "../../_services/playerService";
import "./Admin.scss";

export default function Admin() {
  // HOOKS
  const [users, setUsers] = useState([]);
  const authState = useSelector((state) => state.auth);
  const isAdmin = authState.userInfo.role == "admin";

  useEffect(() => {
    if (isAdmin) {
      getPlayersInfo(authState.userToken);
    }
  }, []);

  // FUNCTIONS
  const getPlayersInfo = async (token) => {
    try {
      const response = await playerService.getPlayersInfo(token);

      const playersInfo = response.map((player) => {
        player.balance = player.Player.balance;
        return player;
      });

      setUsers(playersInfo);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Admin">
      <div className="admin-title">ADMINISTRADOR</div>
      <div className="admin-content-wrapper">
        <div className="forms-wrapper">
          {/* ADD PLAYER FORM */}
          <form>
            <table>
              <th colSpan={2}>Agregar nuevo usuario</th>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="nombre">Nombre:</label>
                  </td>
                  <td>
                    <input type="text" id="nombre" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="apellido">Apellido:</label>
                  </td>
                  <td>
                    <input type="text" id="apellido" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="contrasena">Contraseña:</label>
                  </td>
                  <td>
                    <input type="password" id="contrasena" />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          {/* ADD BALANCE FORM */}
          <form>
            <table>
              <th colSpan={2}>Agregar balance</th>
              <tbody>
                <tr>
                  <td>
                    <label htmlFor="nombre">Nombre:</label>
                  </td>
                  <td>
                    <input type="text" id="nombre" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="apellido">Apellido:</label>
                  </td>
                  <td>
                    <input type="text" id="apellido" />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <DataListTable
          data={users}
          title="Lista de usuarios"
          headers={["Nombre", "Apellido", "email", "Balance"]}
          attributes={["name", "lastname", "email", "balance"]}
        />
      </div>
    </div>
  );
}
