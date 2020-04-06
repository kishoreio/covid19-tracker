import React, { Component } from "react";
import { Cards, Charts, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import covidImage from "./Resources/image.png";

class App extends Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }
  handleCountryChangeData = async (countryName) => {
    console.log(countryName);
    const fetchAPI = await fetchData(countryName);
    this.setState({ data: fetchAPI, country: countryName });
  };
  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={covidImage} alt="corona" />
        <Cards data={data} />
        <CountryPicker onCountry={this.handleCountryChangeData} />
        <Charts data={data} countryName={country} />
      </div>
    );
  }
}

export default App;
