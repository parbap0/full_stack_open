import { useState } from "react";
let temp = 0;
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const incGood = () => {
    setGood(good + 1);
    console.log(good + 1);
    temp++;
    console.log(temp);
  };
  const [neutral, setNeutral] = useState(0);
  const incNeutral = () => {
    setNeutral(neutral + 1);
    console.log(neutral + 1);
    temp++;
    console.log(temp);
  };
  const [bad, setBad] = useState(0);
  const incBad = () => {
    setBad(bad + 1);
    console.log(bad + 1);
    temp++;
    console.log(temp);
  };

  return (
    <div>
      <Header />
      <Button handleClick={incGood} text="good" />
      <Button handleClick={incNeutral} text="neutral" />
      <Button handleClick={incBad} text="bad" />
      <Statistics />
      <table border={1}>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={good + neutral + bad} />
          <StatisticsLine text="average" value={(good + neutral + bad) / 3} />
          <StatisticsLine
            text="positive"
            value={(good / (good + neutral + bad)) * 100 + "%"}
          />
        </tbody>
      </table>
    </div>
  );
};

const Header = () => {
  return (
    <div>
      <h1>Give Feedback</h1>
    </div>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = () => {
  return (
    <div>
      <h1>Statistics</h1>
    </div>
  );
};

const StatisticsLine = (props) => {
  if (temp > 0) {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    );
  } else return(
    <tr>
      <td>No feedback given</td>
    </tr>
  )
};

export default App;
