import React from "react";
import Home from "../pages/index";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockProducts } from "../__mocks__/mockProduct";
import { mockCategories } from "../__mocks__/mockData";

describe("Home page", () => {
  //

  it("render  all products heading", () => {
    render(<Home products={mockProducts} categories={[]} />);
    screen.getByRole("heading", { name: /All products/i });
  });

  //

  it("render a accessible search box", () => {
    render(<Home products={mockProducts} categories={[]} />);
    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toHaveAccessibleName("Search");
  });

  //

  it("renders all products", () => {
    render(<Home products={mockProducts} categories={[]} />);
    const allproducts = screen.getByRole("list", { name: /products/i });
    const { getAllByRole } = within(allproducts);
    const listitems = getAllByRole("listitem");
    expect(listitems.length).toBe(3);
  });

  //

  it("renders all categories", () => {
    render(<Home products={mockProducts} categories={mockCategories} />);
    const allcategories = screen.getByRole("list", { name: /categories/i });
    const { getAllByRole } = within(allcategories);
    const listitems = getAllByRole("listitem", { name: /category/i });
    expect(listitems.length).toBe(2);
  });

  //

  it("show only search results when search term is not empty", () => {
    render(<Home products={mockProducts} categories={mockCategories} />);
    const searchBox = screen.getByPlaceholderText(/Search products/i);
    userEvent.type(searchBox, "mo");

    const searchResults = screen.getByRole("list", { name: /search results/i });
    expect(searchResults).toBeVisible();

    const { getAllByRole } = within(searchResults);
    const listitems = getAllByRole("listitem");
    expect(listitems.length).toBe(2);

    const allproducts = screen.queryByRole("list", { name: /products/i });
    expect(allproducts).toBeNull();
  });
});
