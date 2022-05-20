import React, { useState } from 'react';
import { useGetAllStudentsQuery } from './app/apiSlice';

import Student from './feature/student/Student';
import SearchBar from './components/SearchBar/SearchBar';

function App() {
  // Deconstruct variables from RTK Query generated Hook
  const {
    data, isLoading, isSuccess, isError, error,
  } = useGetAllStudentsQuery();

  // state variable to handle search value and changing it
  const [searchName, setSearchName] = useState('');
  const [searchTag, setSearchTag] = useState('');

  // selecting all records from our previous data that match our search
  const { studentSearch } = useGetAllStudentsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      studentSearch: data?.filter((record) => {
        // const lowerFirstName =

        const recordsMatchingName = (record.firstName.toLocaleLowerCase()
          .startsWith(searchName.toLocaleLowerCase())
          || record.lastName.toLocaleLowerCase()
            .startsWith(searchName.toLocaleLowerCase()));

        const recordsMatchingTags = searchTag
          ? record.tags.some((tag) => tag.toLocaleLowerCase().startsWith(searchTag.toLocaleLowerCase()))
          : true;

        return recordsMatchingName && recordsMatchingTags;
      }),
    }),
  });

  // create content variable to transform based on API responses
  let content;

  // provide content with correct data depending which hook variable is true
  if (isLoading) {
    content = <h1>Loading...</h1>;
  } else if (studentSearch) {
    content = studentSearch.map((student) => <Student key={student.id} studentData={student} />);
  } else if (isSuccess) {
    content = data.map((student) => <Student key={student.id} studentData={student} />);
  } else if (isError) {
    content = <h1>{JSON.stringify(error, null, 2)}</h1>;
  }

  return (
    <div className="App">
      <SearchBar
        search={searchName}
        setSearch={setSearchName}
        placeholder="Search by name"
      />
      <SearchBar
        search={searchTag}
        setSearch={setSearchTag}
        placeholder="Search by tag"
      />
      {content}
    </div>
  );
}

export default App;
