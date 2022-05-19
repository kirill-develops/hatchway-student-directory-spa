import React from 'react';
import { Addresses } from './Address';
import findAverage from './findAverage';

// React Component returning formatted Student Data
function Student({ studentData }) {
  const {
    _city, company, email, firstName, grades, _id, lastName, pic, skill,
  } = studentData;
  const averageGrade = findAverage(grades);

  return (
    <summary>
      <img src={`${pic}`} alt={`${firstName} ${lastName} avatar`} />
      <h3>
        {firstName}
        {' '}
        {lastName}
      </h3>
      <address>
        <Addresses addressData={email} />
      </address>
      <p>
        Company:
        {' '}
        {company}
      </p>
      <p>
        Skill:
        {' '}
        {skill}
      </p>
      <p>
        Average:
        {' '}
        {averageGrade}
        %
      </p>
    </summary>
  );
}

export default Student;
