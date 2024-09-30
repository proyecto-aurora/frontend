import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/authContext.jsx";

function RutaProtegida() {
  const { autenticado } = useAuth();
  const location = useLocation();

  // Si no está autenticado, redirigir a '/'
  if (!autenticado) {
    return <Navigate to="/" />;
  }

  // Si está en la ruta '/', redirigir a '/dev'
  if (location.pathname === "/") {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
}

export default RutaProtegida;
