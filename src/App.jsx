import React from 'react';
import { useGetAllStudentsQuery } from './app/apiSlice';

import './styles/App.scss';
import Student from './feature/student/Student';

function App() {
  // Deconstruct variables from RTK Query generated Hook
  const {
    data, isLoading, isSuccess, isError, error,
  } = useGetAllStudentsQuery();

  // create content variable to transform based on API responses
  let content;

  // provide content with correct data depending which hook variable is true
  if (isLoading) {
    content = <h1>Loading...</h1>;
  } else if (isSuccess) {
    content = data.map((student) => <Student key={student.id} studentData={student} />);
  } else if (isError) { content = <h1>{JSON.stringify(error, null, 2)}</h1>; }

  return (
    <div className="App">{content}</div>
  );
}

export default App;
