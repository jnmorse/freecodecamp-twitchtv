import React from 'react';
import PropTypes from 'prop-types';

import styles from './layout.css';

const Layout = ({ children }) => (
  <>
    <header id={styles.siteHeader}>
      <h1 className={styles.heading}>Twitch Streamers</h1>
      <p className={styles.subHeading}>
        Keep track of when your favorite Twitch stars are online
      </p>
    </header>

    <main>{children}</main>

    <footer>&copy; 2019; Joseph Morse; MIT</footer>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export { Layout };
