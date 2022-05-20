import React, { useReducer } from 'react';
import { GoPlus, GoDash } from 'react-icons/go';

import Styles from './student.module.scss';
import Addresses from './Address';
import Tags from './Tags';
import findAverage from './findAverage';

// React Component returning formatted Student Data
function Student({ studentData }) {
  const {
    company, email, firstName, grades, id, lastName, pic, skill, tags,
  } = studentData;
  const averageGrade = findAverage(grades);

  const [isOpen, setIsOpen] = useReducer((prev) => !prev, false);

  const icon = isOpen ? <GoDash size={54} color="rgb(127,127,127)" /> : <GoPlus size={54} color="rgb(127,127,127)" />;

  const testScores = isOpen ? grades.map((grade, i) => (
    <p>
      Test
      {' '}
      {i + 1}
      {' '}
      {grade}
      %
    </p>
  )) : '';

  return (
    <summary className={Styles.card}>
      <img
        src={`${pic}`}
        alt={`${firstName} ${lastName} avatar`}
        className={Styles.avatar}
      />
      <main className={Styles.details}>
        <header className={Styles.header}>
          <h3 className={Styles.name}>
            {firstName}
            {' '}
            {lastName}
          </h3>
          <button
            type="button"
            onClick={setIsOpen}
            className={Styles.button}
          >
            {icon}
          </button>
        </header>
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
        {testScores}
        <Tags id={id} tags={tags} />
      </main>
    </summary>
  );
}

export default Student;
