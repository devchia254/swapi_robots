# Star Wars Robot Card Collection

`Live:` https://devchia254.github.io/swapi_robots/

![App Snapshot](./README_resources/pj.png)

A web app that displays the characters of Star Wars in cards but in the form of robots.

## Info

- Star Wars character data retrieved from [SWAPI.](https://swapi-deno.azurewebsites.net/)
- Each robot generated is unique to its character and fetched from the API: `https://robohash.org/${id}?size=200x200`

## Purpose

The objective is to learn:-

- The fundamentals of how to fetch data from an API
- How to use AJAX and Promises
- Familiarise with React

## Features & Code Snippets

Below are some of the key features and code extracts of this web app.

### Fetch API

---

![AJAX Fetching](./README_resources/gif-ajax2.gif)

Fetching all the character's data from the API and storing it in the state as `api_data`.

##### App.js:

```javascript
fetchPeopleUrls = () => {
  fetch(`https://swapi-deno.azurewebsites.net/api/people`)
    .then((res) => res.json())
    .then((data) => {
      this.setState({ api_data: data });
    })
    .catch((error) => console.log("Erorr fetching from SWAPI: ", error));
};
```

### Dynamic Search

---

![Dynamic Search Feature](./README_resources/gif-search2.gif)

`onSearchChange` enables the dynamic search feature by capturing the `event.target.value` from the onChange event of the input field, and storing the value in the state as `searchfield`.

The `filteredData` variable uses the filter() method to match between the `searchfield` value and the character names stored in `api_data` from the state.

Therefore, the cards are filtered based on the character's name from the search input field.

##### App.js:

```javascript
onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
}

render () {
	const { api_data, searchfield } = this.state;

	const sortedData = api_data.sort((a, b) => a.name.localeCompare(b.name)); // Sorts fetched data

	const filteredData = sortedData.filter(person =>{
		return person.name.toLowerCase().includes(searchfield.toLowerCase()); // Converts all names to lowercase for searchfield
	})
}
```

### AJAX:

---

Both the 'species' and 'films' attribute from the API give a number (id) that holds value when attached to its respective URL, which requires an additional fetch request.

Respectively, one requires to be fetched from a single URL (also stored in an array) and the other fetches from an array of URLs.

Once fetched, they are stored in the state of their respective components. When every fetch URL is completed subsequently, likewise does the 'species' or 'films' data will be displayed in the same manner.

##### Card.js (species):

```javascript
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
```

##### Card.js (films):

```javascript
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
```

##### Note: `signal` is for aborting network requests when the component is unmounted

### Generate Character Info:

---

The CardList component displays `api_data` from the state by passing it down as props.

Once the `api_data` is accessed then each character's data is mapped in its individual card.

##### CardList.js:

```javascript
const CardList = ({ api_data }) => {
  const listPeople = api_data.map((user, i) => {
    return (
      <Card
        id={(i += 1)}
        key={user.url}
        name={user.name}
        weight={user.mass}
        birth={user.birth_year}
        gender={user.gender}
        species={user.species}
        films={user.films}
      />
    );
  });

  return <div>{listPeople}</div>;
};
```

## NPM Dev Packages:

`gh-pages` was used to deploy the react app on Github Pages.

`tachyons` is a package for styling the site with greater ease.

```json
"dependencies": {
    "gh-pages": "^3.1.0",
    "react": "^16.14.0",
    "react-dom": "^16.14.0",
    "react-scripts": "^4.0.0",
    "tachyons": "^4.12.0"
  }
```
