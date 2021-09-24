import React from "react";
import {
  render,
  screen,
  within,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CartDetail from "../pages/cart";
import { mockCart } from "../__mocks__/mockData";

describe("Cart Detail Page", () => {
  //

  it("render cart details correctly", () => {
    render(
      <CartDetail
        cart={mockCart}
        updateQuantity={jest.fn()}
        emptyCart={jest.fn()}
      />
    );
    screen.getByText(/Cart Total Price : ₹3950/i);
    const line_items = screen.getByRole("list", { name: /cart items/i });
    const { getAllByRole } = within(line_items);
    const listitems = getAllByRole("listitem");
    expect(listitems.length).toBe(2);

    screen.getByRole("button", { name: /Empty Cart/i });
    screen.getByRole("link", { name: /Checkout/i });
  });

  //

  it("renders a message if cart is empty", () => {
    render(
      <CartDetail
        cart={{
          subtotal: { formatted_with_symbol: "₹0", raw: 0 },
          line_items: [],
        }}
        updateQuantity={jest.fn()}
        emptyCart={jest.fn()}
      />
    );

    screen.getByText(/Please Buy something/i);
  });

  //

  it("render line items correctly", () => {
    render(
      <CartDetail
        cart={mockCart}
        updateQuantity={jest.fn()}
        emptyCart={jest.fn()}
      />
    );

    screen.getByText(/₹850 X 2 = ₹1700/i);
    screen.getByText(/₹750 X 3 = ₹2250/i);
  });

  //

  it("increments line item's quantity correctly", async () => {
    const updateQuantity = jest.fn();
    render(
      <CartDetail
        cart={mockCart}
        updateQuantity={updateQuantity}
        emptyCart={jest.fn()}
      />
    );

    const firstItem = screen.getAllByRole("listitem")[0];
    const { getByRole } = within(firstItem);
    const incrementBtn = getByRole("button", { name: "+" });

    userEvent.click(incrementBtn);

    expect(updateQuantity).toBeCalled();
    expect(updateQuantity).toBeCalledWith(3, "item_7RyWOwmK5nEa2V");

    await waitForElementToBeRemoved(() => screen.getByText(/updating/i));
  });

  //

  it("decrements line item's quantity correctly", async () => {
    const updateQuantity = jest.fn();
    render(
      <CartDetail
        cart={mockCart}
        updateQuantity={updateQuantity}
        emptyCart={jest.fn()}
      />
    );

    const firstItem = screen.getAllByRole("listitem")[0];
    const { getByRole } = within(firstItem);
    const incrementBtn = getByRole("button", { name: "-" });

    userEvent.click(incrementBtn);

    expect(updateQuantity).toBeCalled();
    expect(updateQuantity).toBeCalledWith(1, "item_7RyWOwmK5nEa2V");
    await waitForElementToBeRemoved(() => screen.getByText(/updating/i));
  });

  //
  it("empties our cart when clicked on empty cart btn", () => {
    const emptyCart = jest.fn();
    render(
      <CartDetail
        cart={mockCart}
        updateQuantity={jest.fn()}
        emptyCart={emptyCart}
      />
    );

    userEvent.click(screen.getByRole("button", { name: /empty Cart/i }));

    expect(emptyCart).toBeCalled();
  });
});
