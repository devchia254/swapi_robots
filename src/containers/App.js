import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      api_data: [], //empty array to retrieve large objects from an API
      searchfield: "",
    };
  }

  componentDidMount() {
    this.fetchPeopleUrls();
  }

  fetchPeopleUrls = () => {
    fetch(`https://swapi-deno.azurewebsites.net/api/people`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ api_data: data });
      })
      .catch((error) => console.log("Erorr fetching from SWAPI: ", error));
  };

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { api_data, searchfield } = this.state;

    const sortedData = api_data.sort((a, b) => a.name.localeCompare(b.name)); // Sorts fetched data

    const filteredData = sortedData.filter((person) => {
      return person.name.toLowerCase().includes(searchfield.toLowerCase()); // Converts all names to lowercase for searchfield
    });

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
