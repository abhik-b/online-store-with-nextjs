import commerce from "../../lib/commerce";
import React, { useEffect, useState } from "react";
import FormSelect from "./FormSelect";

export default function CountrySelect({
  checkoutToken,
  setDisabled,
  setValue,
  register,
}) {
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState("");

  //

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();

  const [subdivisions, setSubdivisions] = useState([]);
  const [selectedSubdivision, setSelectedSubdivision] = useState();

  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState();

  useEffect(async () => {
    if (checkoutToken) {
      await commerce.services
        .localeListShippingCountries(checkoutToken.id)
        .then((res) => {
          let countriesArray = Object.keys(res.countries).map((key) => {
            return { code: key, name: res.countries[key] };
          });
          setCountries(countriesArray);
          setSelectedCountry(countriesArray[0].code);
          setValue("country", countriesArray[0].code);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  useEffect(async () => {
    setDisabled(true);
    setLoading("subdivisions");
    if (selectedCountry) {
      await commerce.services
        .localeListShippingSubdivisions(checkoutToken.id, selectedCountry)
        .then((res) => {
          let subdivisionsArray = Object.keys(res.subdivisions).map((key) => {
            return { code: key, name: res.subdivisions[key] };
          });
          setSubdivisions(subdivisionsArray);
          setSelectedSubdivision(subdivisionsArray[0].code);
          setValue("subdivisions", subdivisionsArray[0].code);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedCountry]);

  useEffect(async () => {
    setDisabled(true);
    setLoading("true");
    if (selectedSubdivision) {
      await commerce.checkout
        .getShippingOptions(checkoutToken.id, {
          country: selectedCountry,
          region: selectedSubdivision,
        })
        .then((res) => {
          let shippingOptionsArray = res.map((elem) => {
            return {
              code: elem.id,
              name: `${elem.description}-${elem.price.formatted_with_symbol}`,
            };
          });
          setShippingOptions(shippingOptionsArray);
          setSelectedShippingOption(shippingOptionsArray[0].code);
          setValue("shipping-options", shippingOptionsArray[0].code);
        })
        .catch((err) => console.error(err));

      setInitialLoading(false);
      setLoading("");
      setDisabled(false);
    }
  }, [selectedSubdivision]);

  if (initialLoading)
    return (
      <span>Fetching countries , subdivisions & shipping options ...</span>
    );

  return (
    <>
      <FormSelect
        callback={setSelectedCountry}
        title="country"
        array={countries}
        register={register}
      />
      {loading === "subdivisions" ? (
        <p>fetching subdivisions ...</p>
      ) : (
        <FormSelect
          callback={setSelectedSubdivision}
          title="subdivisions"
          array={subdivisions}
          register={register}
        />
      )}
      {loading.length > 0 ? (
        <p>fetching shipping options ... </p>
      ) : (
        <FormSelect
          callback={setSelectedShippingOption}
          title="shipping-options"
          array={shippingOptions}
          register={register}
        />
      )}
    </>
  );
}
