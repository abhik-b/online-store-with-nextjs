import commerce from "../lib/commerce";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import Navbar from "@/components/Navbar/Navbar";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState();

  useEffect(async () => {
    const response = await commerce.cart.retrieve();
    setCart(response);
  }, []);

  //

  const addToCart = async (productID) => {
    const response = await commerce.cart.add(productID, 1);
    setCart(response.cart);
    console.log(response.cart);
    return;
  };

  //  update  item's quantity in cart
  const updateQuantity = async (quantity, productID) => {
    let response = await commerce.cart.update(productID, {
      quantity: quantity,
    });
    setCart(response.cart);
    return;
  };

  //  remove  item  from cart
  const removeItem = async (productID) => {
    let response = await commerce.cart.remove(productID);
    setCart(response.cart);
    return;
  };

  //    empty the cart
  const emptyCart = async () => {
    let response = await commerce.cart.empty();
    setCart(response.cart);
  };

  //    refresh the  cart
  const refreshCart = async () => {
    let response = await commerce.cart.refresh();
    setCart(response);
  };

  //
  return (
    <>
      <Navbar cart={cart} />
      <Component
        {...pageProps}
        cart={cart}
        addToCart={addToCart}
        emptyCart={emptyCart}
        refreshCart={refreshCart}
        removeItem={removeItem}
        updateQuantity={updateQuantity}
      />
    </>
  );
}

export default MyApp;
