import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (countryName) => {
  let changeableUrl = url;
  if (countryName) {
    changeableUrl = `${url}/countries/${countryName}`;
  }
  if (countryName == "global") {
    changeableUrl = url;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDaily = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((element) => ({
      confirmed: element.confirmed.total,
      deaths: element.deaths.total,
      date: element.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  const {
    data: { countries },
  } = await axios.get(`${url}/countries`);
  return countries.map((country) => country.name);
};
