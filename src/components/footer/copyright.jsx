import React from 'react';

export default React.createClass({
  getInitialState: function () {
    return {
      year: new Date().getFullYear(),
      license: 'MIT',
      licenseURL: 'https://opensource.org/licenses/MIT'
    };
  },
  render: function () {
    var year = this.props.year || this.state.year;
    var licenseURL = this.props.licenseURL || this.state.licenseURL;
    var license = this.props.license || this.state.license;

    return (
      <div className="footer-copyright">
        <div className="container">
          &copy; {this.props.yearFrom}-{year} TwitchTV App, All rights reserved.
          <a className="grey-text text-lighten-4 right" role="license" href={licenseURL}>{license}</a>
        </div>
      </div>
    );
  }
});
