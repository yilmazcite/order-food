import React, { useRef, useState } from "react";
import "../../styles/Checkout.css";

const Checkout = ({ onCancel, onConfirm }) => {
  const [formValidityCheck, setFormValidityCheck] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const isEmpty = (value) => value.trim() === "";
  const isValid = (value) => value.trim().length === 5;

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postalCodeInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const cityIsValid = !isEmpty(enteredCity);
    const postalCodeIsValid = isValid(enteredPostalCode);

    setFormValidityCheck({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postalCode: postalCodeIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  return (
    <div className="checkout-container">
      <form onSubmit={confirmHandler}>
        <h2>Checkout</h2>
        <div>
          <input placeholder="Your name" id="name" ref={nameInputRef} />
          {!formValidityCheck.name && <p>Please enter a valid name.</p>}
        </div>
        <div>
          <input placeholder="Street name" id="street" ref={streetInputRef} />
          {!formValidityCheck.street && <p>Please enter a valid street.</p>}
        </div>
        <div>
          <input placeholder="City name" id="city" ref={cityInputRef} />
          {!formValidityCheck.city && <p>Please enter a valid city.</p>}
        </div>
        <div>
          <input
            placeholder="Postal code"
            id="postal-code"
            ref={postalCodeInputRef}
          />
          {!formValidityCheck.postalCode && (
            <p>Please enter a valid postal code.</p>
          )}
        </div>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button>Confirm</button>
      </form>
    </div>
  );
};

export default Checkout;
