import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import { fetchCountries } from "../../api";
import styles from "./CountryPicker.module.css";

const CountryPicker = ({ onCountry }) => {
  const [country, setCountry] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setCountry(await fetchCountries());
    };
    fetchAPI();
  }, [setCountry]);
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => {
          onCountry(e.target.value);
        }}
      >
        <option value="global">Global</option>
        {country.map((name, index) => (
          <option key={index} value={name}>
            {name}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
