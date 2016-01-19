var Radium = require('radium');
var React = require('react');

class NavItem extends React.Component {
  getStyles () {
    return {
      padding: '1em',
      textDecoration: 'none',
      ':hover': {
        color: 'pink'
      }
    };
  }
  render() {
    return (
      <li style={{
        display: 'inline-block'
      }}><a style={[this.getStyles(), this.props.styles]} href={this.props.url}>{this.props.children}</a></li>
    );
  }
}

module.exports = Radium(NavItem);
