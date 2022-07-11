import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { getLoggedUser } from "../../../services/AuthService";


const RequireAuth = () => {
  return (
    getLoggedUser() !== undefined ? <Outlet /> : <Navigate to="/login" replace />
  )
}

export default RequireAuth

// Проверка дали има логнат потребител - ако не, то се пренасочва към логин страница