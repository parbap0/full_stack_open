import React, { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import personService from './components/services/persons'
import axios from 'axios'
const App = () => {

  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState([])

  
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setPersonsToShow(response.data)

      })
  }, [])

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setFilteredPersons(
      persons.filter(
        (person) =>
          person.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      )
    );
  };

  const deletePerson = id =>{
    if(window.confirm("Delete this contact?")){
    personService.deletePerson(id)
    .then(response => {
      console.log(`Deleted post with ID ${id}`);
      setPersonsToShow(
        personsToShow.filter(person => person.id !== id)
      )
    })
    .catch(error => {
      console.error(error);
    });}
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} value={filter} />
      <h2>add a new</h2>
      <Form persons={personsToShow} setPersons={setPersonsToShow} />
      <h2>Numbers</h2>
      <table>
        <tbody>
          {filter === "" ? (
            <Persons filteredPerson={personsToShow} deletePerson={deletePerson}/>
          ) : (
            <Persons filteredPerson={filteredPersons} deletePerson={deletePerson}/>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
