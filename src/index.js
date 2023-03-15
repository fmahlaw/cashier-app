import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";

const initialState = {
  products: [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
  ],
  cart: [],
  total: 0,
};
// Define reducer function to update state
function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const product = state.products.find((p) => p.id === action.payload);
      return {
        ...state,
        cart: [...state.cart, product],
        total: state.total + product.price,
      };
    case "REMOVE_FROM_CART":
      const cart = [...state.cart];
      const index = cart.findIndex((p) => p.id === action.payload);
      const removedProduct = cart.splice(index, 1);
      return {
        ...state,
        cart,
        total: state.total - removedProduct[0].price,
      };
    case "CHECKOUT":
      return {
        ...state,
        cart: [],
        total: 0,
      };

    case "ADD_ITEM":
      const [id, name, price] = action.payload;
      return { ...state, products: [...state.products, { id, name, price }] };

    case "EDIT_ITEM":
      const editedItem = action.payload;
      const updatedProducts = state.products.map((product) => {
        if (product.id === editedItem.id) {
          return editedItem;
        }
        return product;
      });
      return { ...state, products: updatedProducts };

    case "REMOVE_ITEM":
      return {
        ...state,
        products: state.products.filter(
          (item) => !(item.id === action.payload)
        ),
      };

    default:
      return state;
  }
}
const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {" "}
      <App />{" "}
    </Provider>
  </React.StrictMode>
);
