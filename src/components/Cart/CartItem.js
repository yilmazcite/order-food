import React from "react";
import "../../styles/Cart.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartItem = ({ name, price, amount, onAdd, onRemove, orderState }) => {
  const itemPrice = `$${price.toFixed(2)}`;

  const itemsContainerStyle = orderState
    ? "items-to-be-ordered"
    : "cart-items-container";

  return (
    <li className={itemsContainerStyle}>
      <div>
        <h2>{name}</h2>
        <div>
          <span>{amount}</span>
          <span> x {itemPrice}</span>
        </div>
      </div>
      {!orderState && (
        <div>
          <button onClick={onAdd}>
            <AddIcon />
          </button>
          <button onClick={onRemove}>
            <RemoveIcon />
          </button>
        </div>
      )}
    </li>
  );
};

export default CartItem;
