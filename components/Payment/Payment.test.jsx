import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Payment from "./Payment";
import { mock_checkout_token } from "../../__mocks__/mockData";
import server from "../../__mocks__/server/server";

beforeAll(() =>
  server.listen({
    onUnhandledRequest(req) {
      if (req.url.href !== "https://api.chec.io/v1/carts") {
        console.warn(`Found a ${req.method}  request to ${req.url.href}`);
      }
    },
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Payment", () => {
  //

  it("renders the shipping data & credit card form", () => {
    render(
      <Payment
        checkoutToken={mock_checkout_token}
        shippingData={{
          firstname: "John",
          lastname: "Doe",
          email: "abc@gmail.com",
          city: "Delhi",
          address1: "123 Dream street, New Delhi",
          zip: "12345",
          country: "IN",
          subdivisions: "AN",
          "shipping-options": "ship_NqKE50BV3wdgBL",
        }}
        refreshCart={jest.fn()}
      />
    );

    screen.getByText(/John Doe/i);
    screen.getByText(/Address : 123 Dream street, New Delhi/i);
    screen.getByText(/Email : abc@gmail.com/i);
    screen.getByText(/City : Delhi/i);
    screen.getByText(/Postal Zip : 12345/i);
    screen.getByText(/Country Code : IN/i);
    screen.getByText(/Subdivision Code : AN/i);

    expect(screen.getAllByRole("spinbutton").length).toBe(5);

    screen.getByText("Total : ₹3950 + ₹0.00(Shipping Charges)");

    expect(screen.getAllByRole("listitem").length).toBe(1);
  });

  //

  it("render thanks message when we submit our form correctly", async () => {
    render(
      <Payment
        checkoutToken={mock_checkout_token}
        shippingData={{
          firstname: "John",
          lastname: "Doe",
          email: "abc@gmail.com",
          city: "Delhi",
          address1: "123 Dream street, New Delhi",
          zip: "12345",
          country: "IN",
          subdivisions: "AN",
          "shipping-options": "ship_NqKE50BV3wdgBL",
        }}
        refreshCart={jest.fn()}
      />
    );

    userEvent.type(
      screen.getByRole("spinbutton", { name: "Number" }),
      "4242424242424242"
    );

    userEvent.type(
      screen.getByRole("spinbutton", { name: "Expiry_Month" }),
      "12"
    );
    userEvent.type(
      screen.getByRole("spinbutton", { name: "Expiry_Year" }),
      "24"
    );
    userEvent.type(screen.getByRole("spinbutton", { name: "CVC" }), "123");
    userEvent.type(
      screen.getByRole("spinbutton", { name: "Postal_ZIP_Code" }),
      "12345"
    );

    userEvent.click(screen.getByRole("button", { name: "Pay Now" }));

    // await screen.findByText(/Wait while we process your data/i);
    await screen.findByText(/Thanks for ordering/i);
    await screen.findByText(/John Doe/i);
    await screen.findByText(/your order reference : BHKB_1234/i);
    await screen.findByText(/Total payment : ₹3950/i);
  });

  //

  it("render error message when we submit our form incorrectly", async () => {
    render(
      <Payment
        checkoutToken={mock_checkout_token}
        shippingData={{
          firstname: "John",
          lastname: "Doe",
          email: "abc@gmail.com",
          city: "Delhi",
          address1: "123 Dream street, New Delhi",
          zip: "12345",
          country: "IN",
          subdivisions: "AN",
          "shipping-options": "ship_NqKE50BV3wdgBL",
        }}
        refreshCart={jest.fn()}
      />
    );

    userEvent.type(
      screen.getByRole("spinbutton", { name: "Number" }),
      "1234567890123456"
    );

    userEvent.type(
      screen.getByRole("spinbutton", { name: "Expiry_Month" }),
      "12"
    );
    userEvent.type(
      screen.getByRole("spinbutton", { name: "Expiry_Year" }),
      "24"
    );
    userEvent.type(screen.getByRole("spinbutton", { name: "CVC" }), "123");
    userEvent.type(
      screen.getByRole("spinbutton", { name: "Postal_ZIP_Code" }),
      "12345"
    );

    userEvent.click(screen.getByRole("button", { name: "Pay Now" }));

    // await screen.findByText(/Wait while we process your data/i);
    await screen.findByText(/Error/i);
  });
});
