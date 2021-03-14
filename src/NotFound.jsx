import React from 'react';
import { string } from 'prop-types';

export default function NotFound({ text }) {
  return <h1>{text}</h1>;
}

NotFound.propTypes = {
  text: string.isRequired,
};
