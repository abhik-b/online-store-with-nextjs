import { rest } from "msw";
import { mock_checkout_token } from "../mockData";

export const handlers = [
  rest.get(
    "https://api.chec.io/v1/services/locale/chkt_nwarr02343/countries",
    (req, res, ctx) => {
      return res(
        ctx.json({
          countries: {
            BD: "Bangladesh",
            IN: "India",
          },
        })
      );
    }
  ),
  rest.get(
    "https://api.chec.io/v1/services/locale/chkt_nwarr02343/countries/BD/subdivisions",
    (req, res, ctx) => {
      return res(
        ctx.json({
          subdivisions: {
            "05": "Bagerhat",
            "01": "Bandarban",
            "06": "Cox's Bazar",
          },
        })
      );
    }
  ),
  rest.get(
    "https://api.chec.io/v1/services/locale/chkt_nwarr02343/countries/IN/subdivisions",
    (req, res, ctx) => {
      return res(
        ctx.json({
          subdivisions: {
            DL: "Delhi",
            AN: "Andaman & NIcobar Islands",
          },
        })
      );
    }
  ),
  rest.get(
    "https://api.chec.io/v1/checkouts/chkt_nwarr02343/helper/shipping_options",
    (req, res, ctx) => {
      const query = req.url.searchParams;
      const country = query.get("country");
      if (country === "IN") {
        return res(
          ctx.json([
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
          ])
        );
      }
      return res(
        ctx.json([
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
        ])
      );
    }
  ),
  rest.post(
    `https://api.chec.io/v1/checkouts/chkt_nwarr02343`,
    (req, res, ctx) => {
      const number = req.body.payment.card.number;
      if (number !== "4242424242424242") {
        return res(
          ctx.status(403),
          ctx.json({
            error: {
              message: "Wrong number",
            },
          })
        );
      }
      return res(
        ctx.json({
          customer_reference: "BHKB_1234",
          customer: {
            firstname: "John",
            lastname: "Doe",
          },
          order: {
            total: {
              formatted_with_symbol: "₹3950",
            },
          },
        })
      );
    }
  ),

  rest.get(
    "https://api.chec.io/v1/checkouts/cart_0o3ND70JjY6g8w",
    (req, res, ctx) => {
      return res(ctx.json({ ...mock_checkout_token }));
    }
  ),
];
