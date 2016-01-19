var React = require('react');
var Radium = require('radium');
var NavItem = require('./navitem.jsx');

var ul = {
  display: 'inline-block',
  listStyleType: 'none',
  verticalAlign: 'middle',
  paddingLeft: '0'
};

class PageNav extends React.Component {
  constructor() {
    this.styles = {
      header: {
        display: 'inline-block',
        verticalAlign: 'middle'
      }
    };
  }

  render() {
    return (
      <nav role="navigation">
        <header style={[this.styles.header, this.props.defaultStyles]}>
          <h1>{this.props.banner}</h1>
        </header>

        <ul style={ul}>
          <NavItem styles={this.props.defaultStyles} url="/">Home</NavItem>
          <NavItem styles={this.props.defaultStyles} url="/about">About</NavItem>
          <NavItem styles={this.props.defaultStyles} url="/contact">Contact</NavItem>
        </ul>
      </nav>
    );
  }
}

module.exports = Radium(PageNav);
