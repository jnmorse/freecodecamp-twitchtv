import React from 'react'
import PropTypes from 'prop-types'

import Header from './header'
import Footer from './footer'
import Channels from './channels'

const Main = ({ channels }) => (
  <section className="container-fluid well">
    <Header />
    <Channels list={channels} />
    <Footer />
  </section>
)

Main.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })).isRequired
}

export default Main
