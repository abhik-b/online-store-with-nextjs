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

export const mock_checkout_token = {
  id: "chkt_nwarr02343",
  cart_id: "cart_0o3ND70JjY6g8w",
  shipping_methods: [
    {
      id: "ship_NqKE50BV3wdgBL",
      description: "Delivary",
      price: {
        raw: 0,
        formatted: "0.00",
        formatted_with_symbol: "₹0.00",
        formatted_with_code: "0.00 INR",
      },
      countries: ["IN"],
    },
    {
      id: "ship_1234563wdgBL",
      description: "International",
      price: {
        raw: 10,
        formatted: "10.00",
        formatted_with_symbol: "₹10.00",
        formatted_with_code: "10.00 INR",
      },
      countries: ["BD"],
    },
  ],
  live: {
    total: {
      formatted_with_symbol: "₹3950",
    },
    line_items: [
      {
        id: "item_7RyWOwmK5nEa2V",
        product_name: "Monitor",
        permalink: "e1234",
        price: { raw: 850, formatted_with_symbol: "₹850" },
        line_total: { formatted_with_symbol: "₹1700" },
        quantity: 2,
      },
    ],
  },
};
