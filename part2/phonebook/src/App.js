import React, { useEffect, useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import personService from './components/services/persons'
import axios from 'axios'
import Notification from "./components/Notification";
const App = () => {

  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState([])
  const [message, setMessage] = useState(null)
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setPersonsToShow(response.data)

      })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  }, [message]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setFilteredPersons(
      persons.filter(
        (person) =>
          person.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      )
    );
  };

  const addPerson = (e) => {
    e.preventDefault();

    const existingName = persons.filter(
      (person) => person.name === newPerson.name
    );

    if (existingName.length === 0) {
      personService.create(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
        setPersonsToShow(persons.concat(response.data));
        setIsError(false)
        setMessage(`Added ${newPerson.name}`);

      });
    } else {
      if (
        window.confirm(
          `${newPerson.name} is already in the phonebook, replace the old contact number with a new one?`
        )
      ) {
        personService
          .update(existingName[0].id, newPerson)
          .then((response) => {
            const updatedPersons = persons.map((person) =>
              person.id !== response.data.id ? person : response.data
            );
            setPersons(updatedPersons);
            setPersonsToShow(updatedPersons);
            setIsError(false)
            setMessage(`Updated ${newPerson.name}`);
            
          }).catch((error) =>{
            setIsError(true)
            setMessage(`Information of ${newPerson.name} has already been removed from the server`)
          });
      }
    }  
    setNewPerson({ name: "", number: "" });
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

  const handleCreateChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  const messageStyle = {
    color: isError ? 'red' :'green',
    fontWeight: 'bold',
    border: isError ? '1px solid red' : '1px solid green',
    padding: '10px',
  }

  return (
    <div>
      {message? <Notification message={message} style={messageStyle}/> : null}
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} value={filter} />
      <h2>add a new</h2>
      <Form newPerson={newPerson} addPerson={addPerson} handleCreateChange={handleCreateChange}/>
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
