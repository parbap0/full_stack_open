import React from "react";

const Persons = ({ filteredPerson }) => {
  return filteredPerson.map((e, i) => (
    <tr key={i}>
      <td>{e.name}</td>
      <td>{e.number}</td>
    </tr>
  ));
};

export default Persons;
