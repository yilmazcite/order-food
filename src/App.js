import React from "react";
import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";
import CartCtxProvider from "./context/CartCtxProvider";

function App() {
  return (
    <CartCtxProvider>
      <Header />
      <main>
        <Meals />
      </main>
    </CartCtxProvider>
  );
}

export default App;
