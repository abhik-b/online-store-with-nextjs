export const mockCategories = [
  {
    id: "c1",
    name: "Keyboard",
    slug: "keyboard",
    desc: "It is used to type input to a computer",
    products: 1,
  },
  {
    id: "c2",
    name: "Mouse",
    slug: "Mouse",
    desc: "It is used to type input to a computer",
    products: 1,
  },
];

export const mockCart = {
  id: "cart_0o3ND70JjY6g8w",
  subtotal: { formatted_with_symbol: "₹3950", raw: 3950 },
  line_items: [
    {
      id: "item_7RyWOwmK5nEa2V",
      name: "Monitor",
      permalink: "e1234",
      price: { raw: 850, formatted_with_symbol: "₹850" },
      line_total: { formatted_with_symbol: "₹1700" },
      quantity: 2,
    },
    {
      id: "cart_2",
      name: "Gaming Mouse",
      permalink: "e1234",
      price: { raw: 750, formatted_with_symbol: "₹750" },
      line_total: { formatted_with_symbol: "₹2250" },
      quantity: 3,
    },
  ],
  total_unique_items: 2,
  total_items: 5,
};
