import React from 'react';

import Styles from './SearchBar.module.scss';

function SearchBar({ search, setSearch, placeholder }) {
  return (
    <section className={Styles.search_wrapper}>
      <input
        type="search"
        value={search}
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
        className={Styles.search}
      />
    </section>
  );
}

export default React.memo(SearchBar);
