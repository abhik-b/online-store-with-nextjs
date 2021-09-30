import AddressForm from "@/components/Form/AddressForm";
import Payment from "@/components/Payment/Payment";
import commerce from "../lib/commerce";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Checkout({ cart, refreshCart }) {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState();
  const [shippingData, setShippingData] = useState();

  useEffect(async () => {
    if (cart) {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {
        console.log(error);
      }
    }
  }, [cart]);

  const steps = [
    <AddressForm
      setShippingData={(data) => {
        setShippingData(data);
        nextStep();
      }}
      checkoutToken={checkoutToken}
    />,
    <Payment
      shippingData={shippingData}
      refreshCart={refreshCart}
      checkoutToken={checkoutToken}
    />,
  ];

  const nextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      {checkoutToken ? (
        <>
          <h3>Step {activeStep + 1} :</h3>

          {steps[activeStep]}
        </>
      ) : (
        "loading ..."
      )}
    </div>
  );
}
