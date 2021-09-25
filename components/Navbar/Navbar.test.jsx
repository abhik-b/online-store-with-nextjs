import { mockCart } from "../../__mocks__/mockData";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import React from "react";
import Navbar from "./Navbar";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "/",
      push: jest.fn(),
    };
  },
}));

jest.spyOn(require("next/router"), "useRouter");

describe("Navbar Component", () => {
  //

  useRouter.mockImplementation(() => ({
    useRouter() {
      return {
        route: "/",
        pathname: "",
        query: "",
        asPath: "/",
        push: jest.fn(),
      };
    },
  }));

  //

  it("renders nav items correctly", () => {
    render(<Navbar />);
    screen.getByRole("link", { name: /Home/i });
    screen.getByRole("link", { name: /Cart/i });
  });

  //
  it("renders cart items count", () => {
    render(<Navbar cart={mockCart} />);

    screen.getByText(/Cart 2/i);
  });
});
