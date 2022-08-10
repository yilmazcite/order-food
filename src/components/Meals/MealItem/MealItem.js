import React, { useContext } from "react";
import "../../../styles/MealItem.css";
import MealItemForm from "./MealItemForm";
import { CartContext } from "../../../context/CartCtxProvider";

const MealItem = ({ name, description, price, id }) => {
  const mealPrice = `$${price.toFixed(2)}`;

  const cartCtx = useContext(CartContext);

  const addItemToCartHandler = (amount) => {
    cartCtx.addItem({
      id: id,
      name: name,
      price: price,
      amount: amount,
    });
  };

  return (
    <li className="meal-list">
      <div>
        <h3>{name}</h3>
        <div className="description">{description}</div>
        <div className="price">{mealPrice}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addItemToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
