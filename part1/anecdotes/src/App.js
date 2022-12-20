import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const handleNext = () => {
    return setSelected(Math.floor(Math.random() * anecdotes.length));
  };
  const vote = [...votes];
  const handleVotes = () => {
    vote[selected]++;
    console.log(vote);

    return setVotes(vote);
  };
  const favIndex = vote.indexOf(Math.max(...vote));
  console.log(favIndex);

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <DisplayVotes numVotes={vote[selected]} />
      <Button handleClick={handleVotes} text="Vote" />
      <Button handleClick={handleNext} text="Next Anecdote" />
      <DisplayFavAnecdote index={favIndex} anecdotes={anecdotes} />
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const DisplayVotes = (props) => {
  return (
    <div>
      <p>has {props.numVotes} votes</p>
    </div>
  );
};

const DisplayFavAnecdote = (props) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[props.index]}</p>
    </div>
  );
};

export default App;
