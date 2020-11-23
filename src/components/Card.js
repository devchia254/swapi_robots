import React, { Component } from "react";
import FilmsList from "./FilmsList";

class Card extends Component {
  // Abort Network request when component unmounted
  abortController = new AbortController();
  signal = this.abortController.signal;

  constructor(props) {
    super(props);
    this.state = {
      species: ["Fetching species..."],
    };
  }

  componentDidMount() {
    this.fetchSpecies();
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  fetchSpecies = () => {
    if (this.props.species[0] !== undefined) {
      // Make all links HTTPS
      const getHttp = this.props.species[0].substring(0, 4);
      const afterHttp = this.props.species[0].substring(4);
      const urlsWithHttps = getHttp + "s" + afterHttp;

      // Fetch species from API
      fetch(urlsWithHttps, { signal: this.signal })
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({ species: data.name });
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("Fetching species was aborted");
          }
          this.setState({ species: "Cannot fetch data" });
        });
    } else {
      this.setState({ species: "Unknown" });
    }
  };

  render() {
    const { name, weight, id, birth, gender } = this.props;
    return (
      <div className="Card tc grow bg-washed-yellow br3 pa3 ma3 dib bw2 shadow-5">
        <img alt="robots" src={`https://robohash.org/${id}?size=200x200`} />
        <p>
          <b>Name:</b> {name}{" "}
        </p>
        <p>
          <b>Weight:</b> {weight}
        </p>
        <p>
          <b>Birth:</b> {birth}
        </p>
        <p>
          <b>Gender:</b> {gender}
        </p>
        <p>
          <b>Species:</b> {this.state.species}
        </p>
        {/* Doing fetching deep within the DOM tree becomes unstable */}
        <FilmsList films={this.props.films} />
      </div>
    );
  }
}

export default Card;
