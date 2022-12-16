const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;
  const Header = (props) => {
    return (
      <div>
        <p>{props.courseName}</p>
      </div>
    );
  };
  const Content = () => {
    const Part = (props) => {
      return (
        <div>
          <p>
            {props.part} {props.exercise}
          </p>
        </div>
      );
    };

    return (
      <div>
        <Part part={part1} exercise={exercises1} />
        <Part part={part2} exercise={exercises2} />
        <Part part={part3} exercise={exercises3} />
      </div>
    );
  };
  const Total = (props) => {
    return (
      <div>
        <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
      </div>
    );
  };
  return (
    <div>
      <Header courseName={course} />
      <Content />
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />
    </div>
  );
};

export default App;
