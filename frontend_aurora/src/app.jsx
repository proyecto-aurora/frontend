import React from "react";
import { AuthProvider } from "./auth/authContext.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RutaProtegida from "./Routes/rutaProtegida.jsx";
import LoginPage from "./components/login/login.jsx";
import { useAuth } from "./auth/authContext.jsx";
import Home from "./components/home/home.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home"element={<RutaProtegidaWrapper />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}


const RutaProtegidaWrapper = () => {
  const { autenticado } = useAuth();


  if (!autenticado) {
    return <Navigate to="/" />;
  }

  return <Home />;
};

export default App;
