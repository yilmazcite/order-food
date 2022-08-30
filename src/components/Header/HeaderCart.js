import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartCtxProvider";
import "../../styles/Header.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cart from "../Cart/Cart";

const HeaderCart = () => {
  const [cartOpen, setCartOpen] = useState(null);
  const [btnBump, setBtnBump] = useState(false);

  const cartCtx = useContext(CartContext);
  const { items } = useContext(CartContext);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setBtnBump(true);

    const timer = setTimeout(() => {
      setBtnBump(false);
    }, 300);

    //the timer works with a time limit of 500 ms.
    //if items are added to the card rapidly, on each click, the timer should be updated.
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const numOfCartItems = cartCtx.items.reduce((curAmount, item) => {
    return curAmount + item.amount;
  }, 0);

  const clickHandler = () => {
    setCartOpen(true);
  };

  return (
    <div>
      {cartOpen && <Cart onCartOpen={setCartOpen} />}
      <button
        className={`header-cart ${btnBump ? "bump" : ""}`}
        onClick={clickHandler}
      >
        <span>
          <ShoppingCartIcon />
        </span>
        <span className="cart-text"> Your Cart</span>
        <span className="item-amount">{numOfCartItems}</span>
      </button>
    </div>
  );
};

export default HeaderCart;
