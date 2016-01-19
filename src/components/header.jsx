import React from 'react';

export default React.createClass({
  render: function () {
    return (
      <header>
        <nav className="green darken-4">
          <div className="nav-wrapper">
            <header className="brand-logo"><h4><a href="#">{this.props.children}</a></h4></header>
          </div>
        </nav>
      </header>
    );
  }
});
