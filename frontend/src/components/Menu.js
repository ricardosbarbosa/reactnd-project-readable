import React, { Component } from 'react';
import { changeCategoryFilter } from '../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Menu extends Component {

  render()  {
    const { text, active, to, onClick } = this.props;
    
    if (active) {
      return <span className="menu active">{text}</span>
    }
    else {
      return (
        <Link to={to} className="menu" onClick={onClick} >{text}</Link>
      )
    }
  }
}

export default Menu