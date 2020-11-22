import React, { Component } from "react";
import "../containers/App.css";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      species: ["Fetching species..."],
      films: ["Fetching films..."],
    };
  }

  componentDidMount() {
    this.fetchSpecies();
    this.fetchFilms();
  }

  fetchFilms = async () => {
    // Make all links HTTPS
    const arrOfFilmUrls = this.props.films.map((url) => {
      const getHttp = url.substring(0, 4);
      const afterHttp = url.substring(4);
      const urlsWithHttps = getHttp + "s" + afterHttp;

      return urlsWithHttps;
    });

    // Fetch films from API
    try {
      const response = await Promise.all(
        arrOfFilmUrls.map((filmUrl) => fetch(filmUrl).then((res) => res.json()))
      );

      const filmsArray = [];

      await response.map((film, i) => {
        return filmsArray.push(film.title);
      });

      this.setState({ films: filmsArray });
    } catch (error) {
      this.setState({ films: "Cannot fetch data" });
      // console.log("Error fetching films data: ", error);
    }
  };

  fetchSpecies = () => {
    if (this.props.species[0] !== undefined) {
      // Make all links HTTPS
      const getHttp = this.props.species[0].substring(0, 4);
      const afterHttp = this.props.species[0].substring(4);
      const urlsWithHttps = getHttp + "s" + afterHttp;

      // Fetch species from API
      fetch(urlsWithHttps)
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({ species: data.name });
        })
        .catch(() => this.setState({ species: "Cannot fetch data" }));
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
