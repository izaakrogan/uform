import React, { Component } from 'react';

const EventItem = (props) => {
  return (
    <div style={container}>
      <h3>event name: {props.name}</h3>
      <h3>event type: {props.type}</h3>
      <h3>host: {props.host}</h3>
      <h3>state time: {props.start_time}</h3>
      <h3>end time: {props.end_time}</h3>
      <h3>guests: {props.guest_list}</h3>
      <h3>location: {props.location}</h3>
      <h3>additional info: {props.additional_info}</h3>
    </div>
 );
};

const container = {
  border:'1px solid black',
  width:'390',
  height:'467',
  display:'flex',
  flexDirection:'column',
  justifyContent:'space-around',
  paddingLeft:20,
  margin:'10'
};

export default EventItem;
