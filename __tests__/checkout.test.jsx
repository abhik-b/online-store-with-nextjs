import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Checkout from "../pages/checkout";
import { mockCart } from "../__mocks__/mockData";
import server from "../__mocks__/server/server";

beforeAll(() =>
  server.listen({
    onUnhandledRequest(req) {
      if (req.url.href !== "https://api.chec.io/v1/carts")
        console.log(
          "Found an unhandled %s request to %s",
          req.method,
          req.url.href
        );
    },
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Checkout Flow", () => {
  it("Integration test", async () => {
    render(<Checkout cart={mockCart} refreshCart={jest.fn()} />);

    const firstname = await screen.findByRole("textbox", {
      name: /firstname/i,
    });
    const lastname = await screen.findByRole("textbox", { name: /lastname/i });
    const city = await screen.findByRole("textbox", { name: /city/i });
    const email = await screen.findByRole("textbox", { name: /email/i });
    const address = await screen.findByRole("textbox", { name: /address1/i });
    const zip = await screen.findByRole("spinbutton", { name: /zip/i });
    const country = await screen.findByRole("combobox", { name: /country/i });

    userEvent.type(firstname, "John");
    userEvent.type(lastname, "Doe");
    userEvent.type(city, "Delhi");
    userEvent.type(email, "abc@gmail.com");
    userEvent.type(address, "123 Dream street, New Delhi");
    userEvent.type(zip, "12345");
    userEvent.selectOptions(country, "IN");

    const subdivisions = await screen.findByRole("combobox", {
      name: /subdivisions/i,
    });

    await waitForElementToBeRemoved(() =>
      screen.getByText(/fetching shipping options/i)
    );

    userEvent.selectOptions(subdivisions, "AN");

    await screen.findByRole("combobox", { name: /shipping-options/i });

    const nextBtn = screen.getByRole("button", { name: /Next/i });

    userEvent.click(nextBtn);
    await screen.findByText(/John Doe/i);
    screen.getByText(/Address : 123 Dream street, New Delhi/i);
    screen.getByText(/Email : abc@gmail.com/i);
    screen.getByText(/City : Delhi/i);
    screen.getByText(/Postal Zip : 12345/i);
    screen.getByText(/Country Code : IN/i);
    screen.getByText(/Subdivision Code : AN/i);

    expect(screen.getAllByRole("spinbutton").length).toBe(5);

    expect(
      screen.getByText("Total : ₹3950 + ₹0.00(Shipping Charges)")
    ).toBeInTheDocument();

    expect(screen.getAllByRole("listitem").length).toBe(1);

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

    await screen.findByText(/Thanks for ordering/i);
    await screen.findByText(/John Doe/i);
    await screen.findByText(/your order reference : BHKB_1234/i);
    await screen.findByText(/Total payment : ₹3950/i);
  });
});
