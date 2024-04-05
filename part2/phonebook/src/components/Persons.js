import React from "react";
import personService from './services/persons'


const Persons = ({ filteredPerson, deletePerson }) => {



  return filteredPerson.map((e, i) => (
    <tr key={i}>
      <td>{e.name}</td>
      <td>{e.number}</td>
      <td><button onClick={() => deletePerson(e.id)}>Delete</button></td>
    </tr>
  ));
};

export default Persons;
