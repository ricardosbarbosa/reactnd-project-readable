import React, { Component } from 'react';

class VoteControl extends Component {

  render()  {
    const { voteScore, onDownClick, onUpClick } = this.props;
    
    return (
        <div className="vote-control">
          <button className="upVote" onClick={onUpClick} >+</button>
          <span className="votes">{voteScore} votes</span>
          <button className="downVote" onClick={onDownClick}>-</button>
        </div>
      )
  }
}

export default VoteControl