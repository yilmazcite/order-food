import React, { useState, Fragment, useContext } from "react";
import "../../styles/Cart.css";
import { CartContext } from "../../context/CartCtxProvider";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = ({ onCartOpen }) => {
  const cartCtx = useContext(CartContext);
  const [checkedOut, setCheckedOut] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  //display or hide the 'order' button conditionally:
  const hasItem = cartCtx.items.length > 0;

  const addItemToCart = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeItemFromCart = (id) => {
    cartCtx.removeItem(id);
  };

  const orderConfirmHandler = async (userOrderData) => {
    setIsSubmitting(true);
    await fetch(
      "https://order-food-71bbc-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userOrderData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
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
            orderState={checkedOut}
          />
        );
      })}
    </ul>
  );

  const closeCartHandler = () => {
    onCartOpen(null);
  };

  const orderHandler = () => {
    setCheckedOut(true);
  };

  const cartModalContent = (
    <div className="cart-content">
      <span className="cart-items">{cartItems}</span>
      <div className="amount">
        <span>Total Amount:</span>
        <span>{totalAmount}</span>
      </div>
      <div className="buttons">
        {!checkedOut && <button onClick={closeCartHandler}>Close</button>}
        {hasItem && !checkedOut && (
          <button onClick={orderHandler}>Order</button>
        )}
      </div>
      <div>
        {checkedOut && (
          <Checkout
            onCancel={closeCartHandler}
            onConfirm={orderConfirmHandler}
          />
        )}
      </div>
    </div>
  );

  const isSubmittingModalContent = (
    <p className="cart-content receive-order">Receiving your order...</p>
  );

  const didSubmitModalContent = (
    <div className="cart-content">
      <p className="order-success">Order successfully received!</p>
      <span>
        <button className="order-sent-close-btn" onClick={closeCartHandler}>
          Close
        </button>
      </span>
    </div>
  );

  return (
    <Fragment>
      <div onClick={closeCartHandler} className="backdrop" />
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Fragment>
  );
};

export default Cart;
