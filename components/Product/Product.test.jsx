import { mockProduct } from "../../__mocks__/mockProduct";
import { render, screen } from "@testing-library/react";
import React from "react";
import Product from "./Product";
import userEvent from "@testing-library/user-event";

describe("Product Component", () => {
  //

  it("renders product correctly", () => {
    const addToCart = jest.fn();
    render(<Product product={mockProduct} addToCart={addToCart} />);
    screen.getByText(/Monitor/i);
    screen.getByText(/₹850/i);
    const addtocartBtn = screen.getByRole("button", { name: /Add to cart/i });
    userEvent.click(addtocartBtn);

    expect(addToCart).toBeCalled();
  });
});
