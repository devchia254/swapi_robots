import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./App.css";
// import { promised } from 'q';

class App extends Component {
  constructor() {
    super();
    this.state = {
      api_data: [], //empty array to retrieve a list from an API
      searchfield: "",
    };
  }

  componentDidMount() {
    const urlsArray = [];

    for (let i = 1; i < 10; i++) {
      urlsArray.push("https://swapi.dev/api/people/?page=" + i.toString());
    }

    const charsData = [];

    const charsFetch = urlsArray.map((url) =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => data.results.map((user) => charsData.push(user)))
    );

    Promise.all(charsFetch)
      .then((results) => this.setState({ api_data: charsData }))
      .catch((err) => console.log("ERROR, please check", err));
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
    // console.log(event.target.value, "searchbox");
  };

  render() {
    const { api_data, searchfield } = this.state;

    const sortedData = api_data.sort((a, b) => a.name.localeCompare(b.name)); // Sorts fetched data

    const filteredData = sortedData.filter((person) => {
      return person.name.toLowerCase().includes(searchfield.toLowerCase()); // Converts all names to lowercase for searchfield
    });

    // console.log(filteredData, "filter")

    return !api_data.length ? (
      <div className="loading">
        <div className="loading-icon"></div>
        <h1>Loading</h1>
      </div>
    ) : (
      <div className="tc">
        <h1 className="f1 Title">STAR WARS</h1>
        <h2 className="Sub-title">Robot Card Collection</h2>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <CardList api_data={filteredData} />
        </Scroll>
      </div>
    );
  }
}

export default App;
