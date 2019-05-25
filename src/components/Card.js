import React, { Component } from 'react';
import '../containers/App.css';

class Card extends Component {
  
  constructor() {
    super()
    this.state = {
      species: ['Fetching species...'],
      // films: ['Loading films...']
    }
  }

  componentDidMount() {
    // SPECIES //
      fetch(this.props.species[0])
        .then(resp => resp.json())
        .then(json => this.setState({species: json.name}))
        .catch(() => this.setState({species: 'Species Unknown'}));

    // FILMS //

    // const filmsArray = [];

    // const fetchFilms = this.props.films.map((filmUrl, i) => fetch(filmUrl)
    //     .then(res => res.json())
    //     .then(data => {
    //       filmsArray.push(`0${data.episode_id} - ${data.title}`);
    //       filmsArray.sort();
    //     }));

    // Promise.all(fetchFilms)
    //     .then(promisesArray => { this.setState({films:filmsArray}) })
    //     .catch((err) => console.log('error: ', err))

  }




  render() {
    const { name, weight, id, birth, gender } = this.props;

    return (
      <div className='Card tc grow bg-washed-yellow br3 pa3 ma3 dib bw2 shadow-5'>
        <img alt='robots' src={`https://robohash.org/${id}?size=200x200`} />
        <p><b>Name:</b> { name } </p>
        <p><b>Weight:</b> { weight }</p>
        <p><b>Birth:</b> { birth }</p>
        <p><b>Gender:</b> { gender }</p>
        <p><b>Species:</b> { this.state.species }</p>
        
        {/* <p> id: { id }</p> */}
        {/* <div className='films-list'>Featured in:
            <ul>
              { this.state.films.map((film, i) => (
                <li key={i}>
                  { film }
                </li>
              ))}
            </ul>
        </div> */}
      </div>
    )
  }

}

export default Card;