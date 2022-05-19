import React from 'react';

// React Component returning formatted address
export function Addresses({ addressData }) {
  // create Boolean variables based on if addressData is a list or a single item
  const typeArray = Array.isArray(addressData);
  const typeString = typeof String(addressData) === 'string';

  // create a content variable with a base value for an error if we can't find a
  // particuler type for our addressData
  let content = <p>error</p>;

  if (typeArray) {
    // * stretch goal: organize addresses based on 'type'
  } else if (typeString) {
    content = (
      <p>
        Email:
        {' '}
        <a href={`mailto: ${addressData}`} rel="noreferrer" target="_blank">{addressData}</a>
      </p>
    );
  }

  return content;
}

export default Addresses;
