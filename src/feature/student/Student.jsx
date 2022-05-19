import React from 'react';

import Styles from './student.module.scss';
import { Addresses } from './Address';
import findAverage from './findAverage';

// React Component returning formatted Student Data
function Student({ studentData }) {
  const {
    _city, company, email, firstName, grades, _id, lastName, pic, skill,
  } = studentData;
  const averageGrade = findAverage(grades);

  return (
    <summary className={Styles.card}>
      <img
        src={`${pic}`}
        alt={`${firstName} ${lastName} avatar`}
        className={Styles.avatar}
      />
      <content className={Styles.details}>
        <h3 className={Styles.name}>
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
      </content>
    </summary>
  );
}

export default Student;
