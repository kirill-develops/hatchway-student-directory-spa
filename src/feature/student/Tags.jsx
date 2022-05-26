import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { apiSlice } from '../../app/apiSlice';
import Styles from './student.module.scss';

function Tags({ id, tags }) {
  const dispatch = useDispatch();
  const [tag, setTag] = useState('');

  const validTag = tag.length > 1;

  function handleReturn(event) {
    if (event.key === 'Enter' && validTag) {
      dispatch(
        apiSlice.util.updateQueryData('getAllStudents', undefined, (draftStudents) => {
          const student = draftStudents.find((studentRecord) => studentRecord.id === id);

          student.tags.push(tag);
        }),
      );
      setTag('');
    }
  }

  const formatedTags = tags?.map(
    (tag) => <h4 key={tag} className={Styles.tag}>{tag}</h4>,
  );

  return (
    <div className={Styles.column_flex}>
      <div className={Styles.tag_wrapper}>
        {formatedTags}
      </div>
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        onKeyUp={(e) => handleReturn(e)}
        placeholder="Add a tag"
        className={Styles.input}
      />
    </div>
  );
}

export default React.memo(Tags);
