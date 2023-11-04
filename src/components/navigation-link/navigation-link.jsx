import styles from './navigation-link.module.css';
import React from 'react';
import PropTypes from 'prop-types';

const NavigationLink = ({ children }) => {
  return (
    <a className={`${styles.link} pt-4 pr-5 pb-4 pl-5`}>
      {children}
    </a>
  )
}

NavigationLink.propTypes = {
  children: PropTypes.node.isRequired
};

export default NavigationLink;
