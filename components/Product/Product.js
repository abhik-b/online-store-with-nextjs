import React from "react";

export default function Product({ product, addToCart }) {
  return (
    <div>
      <h5>{product.name}</h5>
      <p>{product.price.formatted_with_symbol}</p>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}
