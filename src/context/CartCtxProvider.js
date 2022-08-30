import React, { createContext, useReducer } from "react";

export const CartContext = createContext({});

const CART_STATE = {
  ADD_ITEM: "add-item",
  REMOVE_ITEM: "remove-item",
  CLEAR_CART: "clear-cart",
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === CART_STATE.ADD_ITEM) {
    //always update the new total cost of the cart:
    const updatedTotalCost =
      state.totalAmount + action.item.price * action.item.amount;

    //use the findIndex() method to figure out if an item is already in the cart:
    const itemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    //if an item hasn't been added to the cart yet, findIndex() will return -1 for that item.
    //and therefore, the updatedCartItem will be null if the item is not already in the cart.
    let updatedCartItem = state.items[itemIndex];

    let updatedItems;

    //if the item is already present in the cart:
    if (updatedCartItem) {
      const updatedItem = {
        ...updatedCartItem,
        amount: updatedCartItem.amount + action.item.amount,
      };
      //pass all the items into the updatedItems:
      updatedItems = [...state.items];
      //then change the specific item in the array to its updated version:
      updatedItems[itemIndex] = updatedItem;
    }
    //if the item is not previously added to the cart:
    else {
      //simply update the items array with each new item:
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalCost,
    };
  }

  if (action.type === CART_STATE.REMOVE_ITEM) {
    const itemIndex = state.items.findIndex((item) => item.id === action.id);

    const existingItem = state.items[itemIndex];

    let updatedTotalCost = state.totalAmount - existingItem.price;

    let updatedItems;

    //prevent a bug that causes total amount to be displayed as '$-0.00' (with a minus) when all items are removed from the cart:
    if (updatedTotalCost < 0) updatedTotalCost = 0;

    if (existingItem.amount === 1) {
      //if the amount of the clicked item is 1, filter out the whole array from the clicked item.
      //so that the clicked item will be removed from the cart because its new amount is 0.
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      //if the amount of the clicked item is greater than 1, update the cart:
      //firstly update the clicked item and its amount, decreasing it by 1.
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      //then pass all items into updatedItems:
      updatedItems = [...state.items];
      //and finally update the clicked item in the array by reaching its changed version:
      updatedItems[itemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalCost,
    };
  }

  if (action.type === CART_STATE.CLEAR_CART) {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartCtxProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addCartItem = (item) => {
    dispatchCartState({ type: CART_STATE.ADD_ITEM, item: item });
  };
  const removeCartItem = (id) => {
    dispatchCartState({ type: CART_STATE.REMOVE_ITEM, id: id });
  };
  const clearCartItems = () => {
    dispatchCartState({ type: CART_STATE.CLEAR_CART });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addCartItem,
    removeItem: removeCartItem,
    clearCart: clearCartItems,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartCtxProvider;
