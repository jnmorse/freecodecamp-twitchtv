import React from 'react';
import marked from 'marked';

import HelloWorld from './hello-world.jsx';

export default React.createClass({
  render: function () {
    return (
      <div>
        <HelloWorld name="Tim" isPerson={false}  />
        <HelloWorld name="Joseph" isPerson={false}  />
        {marked(this.props.children.toString())}
      </div>
    );
  }
});
