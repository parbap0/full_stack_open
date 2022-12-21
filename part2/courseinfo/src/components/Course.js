import React from 'react'
const Header = ({ course }) => <h1>{course.name}</h1>;

const Total = ({ course }) => {
  const total = course.parts.reduce((total, part) => total + part.exercises, 0);

  return <p><b>Total of {total} exercises</b></p>;
};

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course