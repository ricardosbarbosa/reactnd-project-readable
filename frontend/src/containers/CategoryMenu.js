import React, { Component } from 'react';
import { changeCategoryFilter, loadPosts } from '../actions'
import { connect } from 'react-redux'
import Menu from '../components/Menu'

class CategoryMenu extends Component {

  render()  {
    const {filter, category_filter, changeCategoryFilter, loadPosts} = this.props;
    
    if (filter === category_filter) {
      return <span className="menu active">{filter}</span>
    }
    else {
      return (
        <Menu to={`/${filter}`} text={filter} ative={filter === category_filter} 
          onClick={(e) => {
            changeCategoryFilter({category_filter: filter})
            loadPosts(filter)
          }}
        />
      )
    }
  
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    category_filter: state.category_filter,
  }
}

const mapDispatchToProps = { changeCategoryFilter, loadPosts }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryMenu)