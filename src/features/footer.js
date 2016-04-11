import React, { Component } from 'react';

export default class Counter extends Component {

  render() {
    return (
      <div>
        <button onClick={() => this.props.changeRoute({name:'login'})} />
        <button onClick={() => this.props.changeRoute({name:'registration'})} />
        <button onClick={() => this.props.changeRoute({name:'create_event'})} />
        <button onClick={() => this.props.changeRoute({name:'view_event'})} />
      </div>
   );
  }
}
