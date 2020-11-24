# Star Wars Robot Card Collection

`Live:` https://devchia254.github.io/swapi_robots/

![App Snapshot](./README_resources/pj.png)

A web app that displays the characters of Star Wars in the form of robots and cards. Each card displays data of each character in Star Wars.

## Info

- Star Wars character data retrieved from [SWAPI.](https://swapi.dev/api/people/)
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

Before storing the character's data in the state as `api_data`, an array is created for listing all 9 URLs for fetching all the character's data.

`Promises.all` is used to fetch the array of URLs and converted into JSON before being stored into the `state`.

##### App.js:

```javascript
fetchPeopleUrls = () => {
  const urlsArray = [];

  // Create page URLs and push to array
  for (let i = 1; i < 10; i++) {
    urlsArray.push("https://swapi.dev/api/people/?page=" + i.toString());
  }

  // Fetch array of URLs
  Promise.all(urlsArray.map((url) => fetch(url).then((res) => res.json())))
    .then((data) => {
      const combinePeople = [];

      data.map((people, i) => {
        return combinePeople.push(...people.results);
      });

      this.setState({ api_data: combinePeople });
    })
    .catch((error) => console.log("Erorr fetching from SWAPI: ", error));
};
```

### Dynamic Search

---

![Dynamic Search Feature](./README_resources/gif-search2.gif)

`onSearchChange` enables the dynamic search feature by capturing the `event.target.value` from the onChange event of the input field, and storing the value in the state as `searchfield`.

The `filteredData` variable uses the filter() method to match between the `searchfield` value and the character names stored in `api_data` from the state.

Therefore, the cards are filtered from the input field based on the character's name.

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

Both the 'species' and 'films' attribute from the API give its value as a URL, which requires an additional fetch request.

Respectively, one requires to be fetched from a single URL and the other fetches from an array of URLs.

Once fetched, they are stored in the state of their respective components. When every fetch URL is completed subsequently, likewise does the 'species' or 'films' data will be displayed in the same manner.

##### Card.js (species):

```javascript
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
```

##### FilmsList.js (species):

```javascript
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
