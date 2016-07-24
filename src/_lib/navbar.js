'use strict';

import React from 'react';

module.exports = (props) => {
  return (
    <nav>
      <h3>{props.header}</h3>
      <div>
        <a className={'navLink'} onClick={() => props.navigateTo({name:props.link})}>{props.linkName}</a>
        <a className={'navLink'} onClick={() => props.navigateTo({name:'login'})}>logout</a>
      </div>
    </nav>
  );
};
