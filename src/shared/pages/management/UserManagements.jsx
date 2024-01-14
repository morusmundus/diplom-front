import React, {useMemo, useState} from 'react';
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {useGrabData} from "../../hooks/useGrabData";
import UserService from "../../../API/UserService";
import {toast} from "react-toastify";
import {DataGrid} from "@mui/x-data-grid";
import {LinearProgress, MenuItem, Select} from "@mui/material";

export default function UserManagement() {

  const [users, setUsers] = useState([])
  const [needToUpdate, setNeedToUpdate] = useState(false)
  const [load, isLoading] = useGrabData(async () => {
    const data = await UserService.findAll()
    setUsers(data)
  })

  useMemo(() => {
    load()
  }, [needToUpdate])

  const changeBlock = async (row) => {
    await handleUpdateUser(row.id, row.role, !row.blocked)
  }

  const changeRole = async (row, newRole) => {
    await handleUpdateUser(row.id, newRole, row.blocked)
  }

  const handleUpdateUser = async (id, role, block) => {
    await UserService.changeParams(id, role,block)
    toast.success("Данные обновлены.",{
      autoClose: 1000
    })
    setNeedToUpdate(!needToUpdate)
  }

  const columns = [
    {
      field: 'id',
      headerName: '#',
      filterable: false,
    },
    {
      field: "email",
      headerName: "Почта",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Роль",
      flex: 1,
      renderCell: (params) => (
        <Select
          sx={{height: "35px"}}
          value={params.row.role}
          label="Роль"
          onChange={(e) => changeRole(params.row, e.target.value)}
        >
          <MenuItem value={"USER"}>Пользователь</MenuItem>
          <MenuItem value={"LIBRARIAN"}>Библиотекарь</MenuItem>
        </Select>
      )
    },
    {
      field: "blocked",
      headerName: "Доступ",
      flex: 1,
      renderCell: (params) => (
        !params.row.blocked
          ? <Button onClick={() => changeBlock(params.row)} color={"success"} variant={"contained"}>Заблокировать</Button>
          : <Button onClick={() => changeBlock(params.row)} color={"error"} variant={"contained"}>Разблокировать</Button>
      )
    },
  ];

  return (
    <Box m="20px">
      <h2 style={{textAlign: "center", fontWeight: "bold", fontSize: "24px"}}>Управление пользователями</h2>

      <Box
        m="40px 0 0 0"
        height="75vh"
      >
          <DataGrid
            slots={{
              loadingOverlay: LinearProgress,
            }}
            loading={isLoading}
            rows={users}
            columns={columns}
          />
      </Box>
    </Box>
  )
};

