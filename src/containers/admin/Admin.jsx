import React, { useEffect, useState } from "react";
import { DataListTable } from "../../components";
import { useSelector } from "react-redux";
import playerService from "../../_services/playerService";
import authService from "../../_services/authService";
import "./Admin.scss";
import Button from "react-bootstrap/Button";

export default function Admin() {
  const formInitialValues = {
    name: "",
    email: "",
    lastname: "",
    password: "",
  };

  // HOOKS
  const [users, setUsers] = useState([]);
  const authState = useSelector((state) => state.auth);
  const isAdmin = authState.userInfo.role == "admin";
  const [playerId, setPlayerId] = useState();
  const [deletePlayerId, setDeletePlayerId] = useState();
  const [newBalance, setNewBalance] = useState();
  const [newUserData, setNewUserData] = useState({});
  const [addUserFormValues, setAddUserFormValues] = useState(formInitialValues);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      getPlayersInfo(authState.userToken);
    }
  }, []);

  // FUNCTIONS

  //   Get players info function
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
  //   Update balance function
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
  // Add player function
  const addPlayer = async (token, credentials) => {
    try {
      await authService.registerPlayer(token, credentials);
    } catch (error) {
      console.log(error);
    }
  };
  // Delete player function
  const deletePlayer = async (token, playerId) => {
    try {
      await playerService.deletePlayer(token, playerId);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLERS

  //   Handle balance changes on input
  const handleBalanceChange = (e) => {
    const { value } = e.target;
    setNewBalance(value);
  };
  // Handle player id changes on input for adding balance
  const handlePlayerIdChange = (e) => {
    const { value } = e.target;
    setPlayerId(value);
  };
  //   Handle add user form changes on input
  const handleAddUserFormChange = (e) => {
    const { name, value } = e.target;
    setAddUserFormValues({
      ...addUserFormValues,
      [name]: value,
    });
  };
  // Handle click on users list
  const handleClick = (e) => {
    const { dataId } = e.currentTarget.dataset;
    setDeletePlayerId(dataId);
    setShowDelete(true)
  };

  // Handle update balance function
  const handleUpdateBalance = async (e) => {
    e.preventDefault();
    await updateBalance(authState.userToken, newBalance, playerId);
    getPlayersInfo(authState.userToken);
  };
  //   Handle add player function
  const handleAddPlayer = async (e) => {
    e.preventDefault();
    await addPlayer(authState.userToken, addUserFormValues);
    getPlayersInfo(authState.userToken);
    setAddUserFormValues(formInitialValues)
  };
  //   Handle delete player function
  const handleDeletePlayer = async () => {
    await deletePlayer(authState.userToken, deletePlayerId);
    getPlayersInfo(authState.userToken);
    setShowDelete(false)
  };

  return (
    <div className="Admin">
      <div className="admin-title">ADMINISTRADOR</div>
      <div className="admin-content-wrapper">
        <div className="forms-wrapper">
          {/* ADD PLAYER FORM */}
          <form onSubmit={handleAddPlayer}>
            <span className="form-title">Agregar nuevo usuario</span>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Nombre:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={addUserFormValues.name}
                      onChange={handleAddUserFormChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Apellido:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="lastname"
                      value={addUserFormValues.lastname}
                      onChange={handleAddUserFormChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Email:</label>
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={addUserFormValues.email}
                      onChange={handleAddUserFormChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Contraseña:</label>
                  </td>
                  <td>
                    <input
                      type="password"
                      name="password"
                      value={addUserFormValues.password}
                      onChange={handleAddUserFormChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <Button className="btn-form" variant="custom" type="submit">
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
        <div className="users-list-wrapper">
          <DataListTable
            data={users}
            title="Lista de usuarios"
            headers={["ID Jugador", "Nombre", "Apellido", "email", "Balance"]}
            attributes={["id", "name", "lastname", "email", "balance"]}
            onChange={handleClick}
          />
          {showDelete && (
            <Button variant="danger" onClick={handleDeletePlayer}>
              Eliminar jugador, ID Jugador {deletePlayerId}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
