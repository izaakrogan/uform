import React, { Component } from 'react';

export default class Navbar extends Component {

  render() {
    return (
      <div style={styles.navbar}>
        <a style={styles.p} onClick={() => this.props.changeRoute({name: this.props.link})}>{this.props.linkName}</a>
        <h2 style={styles.h2}>{this.props.name}</h2>
        <a style={styles.p} onClick={() => this.props.logout()}>logout</a>
      </div>
   );
  }
}

const styles = {
  navbar: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    padding:'0 20px',
    backgroundColor:'#333'
  },
  h2: {
    margin:'20px auto',
    color:'white'
  },
  p: {
    color:'white',
    cursor: 'pointer'
  }
};
