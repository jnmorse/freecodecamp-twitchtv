import React from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';
import Channels from './channels.jsx';

export default React.createClass({
  render: function () {
    return (
      <section className="container-fluid well">
        <Header />
        <Channels list={this.props.channels} />
        <Footer />
      </section>
    );
  }
});
