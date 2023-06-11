import React, { useEffect, useState } from "react";
import { DataListTable } from "../../components";
import { useSelector } from "react-redux";
import playerService from "../../_services/playerService";
import authService from "../../_services/authService";
import "./Admin.scss";
import Button from "react-bootstrap/Button";

export default function Admin() {
  // HOOKS
  const [users, setUsers] = useState([]);
  const authState = useSelector((state) => state.auth);
  const isAdmin = authState.userInfo.role == "admin";
  const [playerId, setPlayerId] = useState();
  const [newBalance, setNewBalance] = useState();

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
        player.id = player.Player.id;
        player.balance = player.Player.balance;
        return player;
      });

      setUsers(playersInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBalance = async (token, newBalance, playerId) => {
    try {
      const updateBalance = await playerService.updateBalance(
        token,
        newBalance,
        playerId
      );
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLERS
  const handleBalanceChange = (e) => {
    const { value } = e.target;
    setNewBalance(value);
  };

  const handlePlayerIdChange = (e) => {
    const { value } = e.target;
    setPlayerId(value);
  };

  const handleUpdateBalance = async (e) => {
    e.preventDefault();
    await updateBalance(authState.userToken, newBalance, playerId);
    getPlayersInfo(authState.userToken);
  };

  return (
    <div className="Admin">
      <div className="admin-title">ADMINISTRADOR</div>
      <div className="admin-content-wrapper">
        <div className="forms-wrapper">
          {/* ADD PLAYER FORM */}
          <form>
            <span className="form-title">Agregar nuevo usuario</span>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Nombre:</label>
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Apellido:</label>
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Contraseña:</label>
                  </td>
                  <td>
                    <input type="password" />
                  </td>
                </tr>
              </tbody>
            </table>
            <Button className="btn-form" variant="custom">
              Crear usuario
            </Button>
          </form>
          {/* ADD BALANCE FORM */}
          <form onSubmit={handleUpdateBalance}>
            <span className="form-title">Agregar balance</span>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>ID Jugador:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="id_player"
                      onChange={handlePlayerIdChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Balance:</label>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="new_balance"
                      onChange={handleBalanceChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <Button className="btn-form" variant="custom" type="submit">
              Confirmar balance
            </Button>
          </form>
        </div>
        <DataListTable
          data={users}
          title="Lista de usuarios"
          headers={["ID Jugador", "Nombre", "Apellido", "email", "Balance"]}
          attributes={["id", "name", "lastname", "email", "balance"]}
        />
      </div>
    </div>
  );
}
