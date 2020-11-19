import React from "react";
import Card from "./Card";

const CardList = ({ api_data }) => {
  // console.log('api data', api_data);
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
      />
    );
  });

  return <div>{listPeople}</div>;
};

export default CardList;
