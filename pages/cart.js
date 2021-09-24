import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function CartDetail({ cart, updateQuantity, emptyCart }) {
  const [loading, setLoading] = useState();
  const handleUpdateQuantity = async (quantity, productID) => {
    setLoading(productID);
    await updateQuantity(quantity, productID);
    setLoading();
  };

  if (!cart) return <span>Loadin ...</span>;
  return (
    <div>
      <Head>
        <title>Online Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {cart.subtotal.raw > 0 ? (
          <div>
            <h3>Cart total price : {cart.subtotal.formatted_with_symbol}</h3>

            <h4 id="cart-items-heading">Cart items :</h4>
            <ul aria-labelledby="cart-items-heading">
              {cart.line_items.map((item) => {
                return (
                  <li key={item.id}>
                    <p>{item.name}</p>

                    <small>
                      {item.price.formatted_with_symbol} X {item.quantity} ={" "}
                      {item.line_total.formatted_with_symbol}
                    </small>

                    <div>
                      {loading === item.id ? (
                        "updating"
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              handleUpdateQuantity(item.quantity + 1, item.id);
                            }}
                          >
                            +
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => {
                              handleUpdateQuantity(item.quantity - 1, item.id);
                            }}
                          >
                            {" "}
                            -{" "}
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div>
              <button onClick={emptyCart}>Empty Cart</button>
              <button>
                <Link href="/checkout">
                  <a>Checkout</a>
                </Link>
              </button>
            </div>
          </div>
        ) : (
          <p>Please Buy Something from our store</p>
        )}
      </main>
    </div>
  );
}
