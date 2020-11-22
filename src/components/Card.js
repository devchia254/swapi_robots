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
    // FILMS //
    const filmsArray = [];
    const fetchFilms = this.props.films.map((filmUrl, i) =>
      fetch(filmUrl)
        .then((res) => res.json())
        .then((data) => {
          filmsArray.push(`${data.episode_id} - ${data.title}`);
          filmsArray.sort();
        })
    );
    Promise.all(fetchFilms)
      .then((promisesArray) => {
        this.setState({ films: filmsArray });
      })
      .catch((err) => console.log("error: ", err));
  }

  fetchSpecies = () => {
    if (this.props.species[0] !== undefined) {
      const getHttp = this.props.species[0].substring(0, 4);

      const afterHttp = this.props.species[0].substring(4);

      const urlsWithHttps = getHttp + "s" + afterHttp;

      // SPECIES //
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

        <p> id: {id}</p>
        <div className="films-list">
          Featured in:
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
