import React, { Component } from "react";

class Card extends Component {
  // Abort Network request when component unmounted
  abortController = new AbortController();
  signal = this.abortController.signal;

  constructor(props) {
    super(props);
    this.state = {
      species: "Fetching species...",
      films: ["Fetching films..."],
    };
  }

  componentDidMount() {
    this.fetchSpecies();
    this.fetchFilms();
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  fetchSpecies = () => {
    if (this.props.species[0] !== undefined) {
      // Fetch species from API
      fetch(
        `https://swapi-deno.azurewebsites.net/api/species/${this.props.species[0]}`,
        { signal: this.signal }
      )
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({ species: data.name });
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("Fetching species was aborted");
          }
          this.setState({ species: "Cannot fetch Species data" });
        });
    } else {
      this.setState({ species: "Unknown" });
    }
  };

  fetchFilms = async () => {
    // Fetch films from API
    try {
      const response = await Promise.all(
        this.props.films.map((filmId) =>
          fetch(`https://swapi-deno.azurewebsites.net/api/films/${filmId}`, {
            signal: this.signal,
          }).then((res) => res.json())
        )
      );

      const filmData = response.map((film, i) => {
        return film.title;
      });

      this.setState({ films: filmData });
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetching films was aborted");
      }
      this.setState({ films: "Cannot fetch Films data" });
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
        <div className="films-list">
          <b>Featured Movies:</b>
          <ul>
            {this.state.films.map((film, i) => (
              <li key={i}>{film}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Card;
