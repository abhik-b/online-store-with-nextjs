import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CountrySelect from "./CountrySelect";
import FormInput from "./FormInput";

const addressparams = [
  { name: "firstname", type: "text" },
  { name: "lastname", type: "text" },
  { name: "address1", type: "text" },
  { name: "email", type: "email" },
  { name: "city", type: "text" },
  { name: "zip", type: "number" },
];

export default function AddressForm({ checkoutToken, setShippingData }) {
  const { handleSubmit, register, setValue } = useForm();
  const [disabled, setDisabled] = useState(true);

  const submitData = (data) => {
    setShippingData(data);
  };
  return (
    <form onSubmit={handleSubmit(submitData)}>
      {addressparams.map((param) => {
        return <FormInput key={param.name} param={param} register={register} />;
      })}

      <CountrySelect
        setDisabled={setDisabled}
        setValue={setValue}
        checkoutToken={checkoutToken}
        register={register}
      />

      <button disabled={disabled} type="submit">
        Next
      </button>
    </form>
  );
}
