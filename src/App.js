import './App.css';
import AppRouter from "./shared/routes/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./shared/context/globalContext";
import React, {useState} from "react";
import Cookies from "js-cookie";
import {CartProvider} from "./shared/context/CartContext";

function App() {
  const [role, setRole] = useState(Cookies.get("role"))

  return (
    <AuthContext.Provider value={{
      role,
      setRole
    }}>
      <CartProvider>
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </CartProvider>
    </AuthContext.Provider>
  );
}

export default App;
