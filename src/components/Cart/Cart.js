import React, { Fragment, useContext } from "react";
import "../../styles/Cart.css";
import { CartContext } from "../../context/CartCtxProvider";
import CartItem from "./CartItem";

const Cart = ({ onCartOpen }) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  //display or hide the 'order' button conditionally:
  const hasItem = cartCtx.items.length > 0;

  const addItemToCart = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeItemFromCart = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onAdd={() => addItemToCart(item)}
            onRemove={() => removeItemFromCart(item.id)}
          />
        );
      })}
    </ul>
  );

  const closeCartHandler = () => {
    onCartOpen(null);
  };

  return (
    <Fragment>
      <div onClick={closeCartHandler} className="backdrop" />
      <div className="cart-content">
        <span className="cart-items">{cartItems}</span>
        <div className="amount">
          <span>Total Amount:</span>
          <span>{totalAmount}</span>
        </div>
        <div className="buttons">
          <button onClick={closeCartHandler}>Close</button>
          {hasItem && <button>Order</button>}
        </div>
      </div>
    </Fragment>
  );
};

export default Cart;
