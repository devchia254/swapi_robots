import React, { Component } from "react";
import "../containers/App.css";

class FilmsList extends Component {
  // Abort Network request when component unmounted
  abortController = new AbortController();
  signal = this.abortController.signal;

  constructor(props) {
    super(props);
    this.state = {
      films: ["Fetching films..."],
    };
  }

  componentDidMount() {
    this.fetchFilms();
  }

  componentWillUnmount() {
    this.abortController.abort();
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
        arrOfFilmUrls.map((filmUrl) =>
          fetch(filmUrl, { signal: this.signal }).then((res) => res.json())
        )
      );

      const filmsArray = [];

      response.map((film, i) => {
        return filmsArray.push(film.title);
      });

      this.setState({ films: filmsArray });
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetching films was aborted");
      }
      this.setState({ films: "Cannot fetch data" });
    }
  };

  render() {
    return (
      <div className="films-list">
        <b>Featured Movies:</b>
        <ul>
          {this.state.films.map((film, i) => (
            <li key={i}>{film}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default FilmsList;
