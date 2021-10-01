import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddressForm from "./AddressForm";
import server from "../../__mocks__/server/server";
import CountrySelect from "./CountrySelect";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Addressform", () => {
  //
  it("renders the form fields correctly", async () => {
    render(
      <AddressForm
        checkoutToken={{
          id: "chkt_nwarr02343",
          cart_id: "cart_12345",
        }}
        setShippingData={jest.fn()}
      />
    );

    screen.getByRole("textbox", { name: /firstname/i });
    screen.getByRole("textbox", { name: /lastname/i });
    screen.getByRole("textbox", { name: /city/i });
    screen.getByRole("textbox", { name: /email/i });
    screen.getByRole("textbox", { name: /address1/i });
    screen.getByRole("spinbutton", { name: /zip/i });
    await screen.findByRole("combobox", { name: /country/i });
    await screen.findByRole("combobox", { name: /subdivisions/i });
    await screen.findByRole("combobox", { name: /shipping-options/i });
  });

  //

  it("country select works correclty ", async () => {
    render(
      <CountrySelect
        checkoutToken={{
          id: "chkt_nwarr02343",
          cart_id: "cart_12345",
        }}
        setDisabled={jest.fn()}
        setValue={jest.fn()}
        register={jest.fn()}
      />
    );
    const countrySelect = await screen.findByRole("combobox", {
      name: /country/i,
    });
    let subdivisionSelect = await screen.findByRole("combobox", {
      name: /subdivisions/i,
    });
    let shippingoptionSelect = await screen.findByRole("combobox", {
      name: /shipping-options/i,
    });

    expect(countrySelect).toHaveValue("BD");
    expect(subdivisionSelect).toHaveValue("05");
    screen.getByText(/International/i);
    userEvent.selectOptions(countrySelect, "IN");
    subdivisionSelect = await screen.findByRole("combobox", {
      name: /subdivisions/i,
    });
    shippingoptionSelect = await screen.findByRole("combobox", {
      name: /shipping-options/i,
    });
    expect(countrySelect).toHaveValue("IN");

    expect(subdivisionSelect).toHaveValue("DL");
    screen.getByText(/delivary-₹0.00/i);
  });

  //
  it("renders the form fields correctly", async () => {
    const shippingData = jest.fn();
    render(
      <AddressForm
        checkoutToken={{
          id: "chkt_nwarr02343",
          cart_id: "cart_12345",
        }}
        setShippingData={shippingData}
      />
    );

    const firstname = screen.getByRole("textbox", { name: /firstname/i });
    const lastname = screen.getByRole("textbox", { name: /lastname/i });
    const city = screen.getByRole("textbox", { name: /city/i });
    const email = screen.getByRole("textbox", { name: /email/i });
    const address = screen.getByRole("textbox", { name: /address1/i });
    const zip = screen.getByRole("spinbutton", { name: /zip/i });
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
    userEvent.selectOptions(subdivisions, "AN");

    await screen.findByRole("combobox", { name: /shipping-options/i });

    userEvent.click(screen.getByRole("button", { name: /Next/i }));
    await waitFor(() => {
      expect(shippingData).toBeCalled();
      expect(shippingData).toBeCalledWith({
        firstname: "John",
        lastname: "Doe",
        email: "abc@gmail.com",
        city: "Delhi",
        address1: "123 Dream street, New Delhi",
        zip: "12345",
        country: "IN",
        subdivisions: "AN",
        "shipping-options": "ship_NqKE50BV3wdgBL",
      });
    });
  });
});
