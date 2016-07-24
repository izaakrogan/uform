import React, { Component } from 'react';

module.exports = class EventView extends Component {
  render() {
    return (
      <div className={'eventItem'}>
        <h3 className={'name'}>{this.props.name}</h3>
        <p className={'type'}>{this.props.type}</p>
        <p>hosted by: {this.props.host}</p>
        <p>start: {this.props.start_time}</p>
        <p>end: {this.props.end_time}</p>
        <p>guests: {this.props.guest_list}</p>
        <p>location: {this.props.location}</p>
        <p>additional info: {this.props.additional_info}</p>
      </div>
    );
  }
};
