import React, { useState } from "react";
import personService from './services/persons'
import axios from 'axios'

const Form = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    // const personsArray = persons.map((e) => e.name);
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const existingName = persons.filter(
      (person) => person.name === newName
    );

    if (existingName.length === 0) {
      personService.create(personObject).then((response) => {
        setPersons(persons.concat(response.data));
        
      });
    } else {
      if (
        window.confirm(
          `${personObject.name} is already in the phonebook, replace the old contact number with a new one?`
        )
      ) {
        personService
          .update(existingName[0].id, personObject)
          .then((response) => {
            const updatedPersons = persons.map((person) =>
              person.id !== response.data.id ? person : response.data
            );
            setPersons(updatedPersons);
            
          });
      }
    }

    // personsArray.includes(`${personObject.name}`)
    //   ? alert(`${newName} is already added to phonebook`)
    //   : personService.create(personObject).then(response =>{
    //     setPersons(persons.concat(response.data));
    //   })
      
      
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
        <br />
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
