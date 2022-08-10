import React, { useRef } from "react";
import "../../../styles/MealItemForm.css";
import Input from "../../UI/Input";
import AddIcon from "@mui/icons-material/Add";

const MealItemForm = ({ onAddToCart, id }) => {
  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const inputAmount = amountInputRef.current.value;
    const inputAmountToNum = +inputAmount;

    if (
      amountInputRef.current.value.trim() === 0 ||
      inputAmountToNum < 1 ||
      inputAmountToNum > 5
    ) {
      return;
    }
    onAddToCart(inputAmountToNum);
  };

  //the reusable 'Input' component is created.
  //necessary html related attributes and values are passed to the component as a prop via 'input' object.
  return (
    <form className="form" onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount" + id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>
        <AddIcon />
      </button>
    </form>
  );
};

export default MealItemForm;
