import React from 'react';
import FooterCopyright from './footer/copyright.jsx';

export default React.createClass({
  socialLink: function (item) {
    var icon = item.hasOwnProperty('icon') ? item.icon : item.name.toLowerCase();

    return (
      <li key={item.id}>
        <a
          className="grey-text text-lighten-4"
          href={item.url}>
          <i className={['fa', 'fa-' + icon, 'fa-fw'].join(' ')}></i>
          &nbsp;{item.name}
        </a>
      </li>
    );
  },
  render: function () {
    var links = this.props.social.map(this.socialLink);

    return (
      <footer className="page-footer green darken-1">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              {this.props.text}
            </div>

            <div className="col m4 offset-m2 s12">
              <ul>
                {links}
              </ul>
            </div>
          </div>
        </div>

        <FooterCopyright yearFrom="2016" />
      </footer>
    );
  }
});
