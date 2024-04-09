import React, { useState } from "react";
import personService from './services/persons'
import axios from 'axios'

const Form = ({ newPerson, addPerson, handleCreateChange }) => {


  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input name="name" value={newPerson.name} onChange={handleCreateChange} />
        <br />
        number: <input name="number" value={newPerson.number} onChange={handleCreateChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default Form;
